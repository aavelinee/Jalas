const R = require('ramda')
const express = require('express')
const axios = require('axios')
const moment = require('moment')
const {
  getUserPolls,
  getAllPolls,
  getPollById,
  savePoll,
  updatePoll,
  addVote,
  closePoll
} = require('./db')

const app = express()

app.use(express.json())

const selectWinnerOption = ({ options }) =>
  options.reduce(
    (acc, option) =>
      option.positives.length > acc.positives.length ||
      (option.positives.length === acc.positives.length &&
        option.neutrals.length > acc.neutrals.length)
        ? option
        : acc,
    options[0]
  )

const arrangeMeetingsAutomatically = () => {
  getAllPolls().then(polls =>
    polls
      .filter(
        poll =>
          (!poll.closed || !poll.deleted) &&
          new Date() >= new Date(poll.deadline)
      )
      .forEach(poll =>
        (!poll.closed ? closePoll(poll._id) : Promise.resolve())
          .then(() => {
            axios
              .get(`http://localhost:3006/api/checkNotifByEmails`, {
                params: {
                  participants: poll.participants,
                  notificationFlag: `onClosePoll`
                }
              })
              .then(({ data: receivers }) => {
                if (receivers.length) {
                  axios
                    .post(`http://localhost:3003/api/sendEmail`, {
                      recipients: receivers,
                      subject: `close poll in Jalas`,
                      message: `Poll : ${poll.name}\n\n closed`
                    })
                    .then(() =>
                      console.log('close poll emails successfully sent !')
                    )
                    .catch(console.log)
                }
              })
            return
          })
          .then(() => {
            const { start, end } = selectWinnerOption(poll)
            const startDate = moment(start).format('YYYY-MM-DDTHH:mm:ss')
            const endDate = moment(end).format('YYYY-MM-DDTHH:mm:ss')
            axios
              .get(
                `http://localhost:3004/api/getAvailableRooms/${startDate}/${endDate}`
              )
              .then(res => {
                const { availableRooms } = res.data
                if (!availableRooms.length) return

                updatePoll({ _id: poll._id, reservingRoom: availableRooms[0] })
                  .then(() =>
                    axios.post('http://localhost:3004/api/reserveRoom', {
                      end: endDate,
                      start: startDate,
                      userId: poll.userId,
                      roomNumber: availableRooms[0]
                    })
                  )
                  .then(() => updatePoll({ _id: poll._id, deleted: true }))
                  .then(() =>
                    axios.post('http://localhost:3001/api/createMeeting', {
                      userId: poll.userId,
                      title: poll.name,
                      room: availableRooms[0],
                      startDate: start,
                      endDate: end,
                      participants: poll.participants
                    })
                  )
              })
          })
      )
  )
}

setInterval(arrangeMeetingsAutomatically, 60000)

app.get('/api/getAllPolls', (req, res) => {
  getAllPolls().then(polls => res.send(polls))
})

app.get('/api/getPollById/:pollId', (req, res) => {
  getPollById(req.params.pollId).then(poll => res.send(poll))
})

app.get('/api/getUserPolls/:userId/:email', (req, res) => {
  getUserPolls(req.params.userId, req.params.email).then(polls =>
    res.send(polls)
  )
})

app.get('/api/getUsersInPoll/:pollId', (req, res) => {
  getPollById(req.params.pollId).then(({ participants }) =>
    res.send(participants)
  )
})

app.post('/api/createPoll', (req, res) => {
  savePoll(req.body).then(poll => {
    axios
      .get(`http://localhost:3006/api/checkNotifByEmails`, {
        params: {
          participants: poll.participants,
          notificationFlag: `onInvitation`
        }
      })
      .then(({ data: receivers }) => {
        if (receivers.length)
          axios
            .post(`http://localhost:3003/api/sendEmail`, {
              recipients: receivers,
              subject: `New Poll: ${poll.name}`,
              message: `You are invited to a new Poll.\n
              Tilte: ${poll.name}\n
              Creator: ${poll.userId}\n
              Participants: ${poll.participants.join(', ')}\n
              Link: http://localhost:8080/vote/${poll.id}`
            })
            .then(() => console.log('emails successfully sent !'))
            .catch(console.log)
      })
    res.status(200).send(poll)
  })
})

app.post('/api/editPoll', (req, res) => {
  const newPoll = req.body
  getPollById(newPoll._id)
    .then(oldPoll => {
      const newParticipants = R.without(
        oldPoll.participants,
        newPoll.participants
      )
      const removedParticipants = R.without(
        newPoll.participants,
        oldPoll.participants
      )
      const intersection = R.intersection(
        oldPoll.participants,
        newPoll.participants
      )

      const removedOptionIds = R.without(
        R.pluck('id', newPoll.options),
        R.pluck('id', oldPoll.options)
      )
      const removedOptions = R.filter(
        ({ id }) => R.includes(id, removedOptionIds),
        oldPoll.options
      )
      const usersToBeNotified = R.compose(
        R.uniq,
        R.reduce(
          (acc, { positives, negatives, neutrals }) => [
            ...acc,
            ...positives,
            ...negatives,
            ...neutrals
          ],
          []
        )
      )(removedOptions)

      if (intersection.length)
        axios
          .get(`http://localhost:3006/api/checkNotifByEmails`, {
            params: {
              participants: intersection,
              notificationFlag: `onEditPoll`
            }
          })
          .then(({ data: receivers }) => {
            if (receivers.length) {
              axios
                .post(`http://localhost:3003/api/sendEmail`, {
                  recipients: receivers,
                  subject: `JALAS: Poll edited !`,
                  message: `new details :\n
                  Tilte: ${newPoll.name}\n
                  Participants: ${newPoll.participants.join(', ')}\n\n
                  To see poll available times, please visit this link :
                  Link: http://localhost:8080/vote/${newPoll._id}`
                })
                .then(() => console.log('edit poll emails successfully sent !'))
                .catch(console.log)
            }
          })

      if (newParticipants.length)
        axios
          .get(`http://localhost:3006/api/checkNotifByEmails`, {
            params: {
              participants: newParticipants,
              notificationFlag: `onInvitation`
            }
          })
          .then(({ data: receivers }) => {
            if (receivers.length) {
              axios
                .post(`http://localhost:3003/api/sendEmail`, {
                  recipients: receivers,
                  subject: `JALAS: You're invited !`,
                  message: `You are invited to a Poll.\n
                  Tilte: ${newPoll.name}\n
                  Participants: ${newPoll.participants.join(', ')}\n
                  Link: http://localhost:8080/vote/${newPoll._id}`
                })
                .then(() =>
                  console.log('new participants emails successfully sent !')
                )
                .catch(console.log)
            }
          })

      if (removedParticipants.length)
        axios
          .get(`http://localhost:3006/api/checkNotifByEmails`, {
            params: {
              participants: removedParticipants,
              notificationFlag: `onRemovedFromPoll`
            }
          })
          .then(({ data: receivers }) => {
            if (receivers.length) {
              axios
                .post(`http://localhost:3003/api/sendEmail`, {
                  recipients: receivers,
                  subject: `JALAS: You're removed !`,
                  message: `You're removed from poll " ${oldPoll.name} ".\n`
                })
                .then(() =>
                  console.log('removed participants emails successfully sent !')
                )
                .catch(console.log)
            }
          })

      if (usersToBeNotified.length)
        axios
          .get(`http://localhost:3006/api/checkNotifByEmails`, {
            params: {
              participants: usersToBeNotified,
              notificationFlag: `onEditPoll`
            }
          })
          .then(({ data: receivers }) => {
            if (receivers.length) {
              axios
                .post(`http://localhost:3003/api/sendEmail`, {
                  recipients: receivers,
                  subject: `JALAS: Vote again !`,
                  message: `Time you voted is deleted, vote again please.\n
                  Poll: ${newPoll.name}\n
                  Link: http://localhost:8080/vote/${newPoll._id}`
                })
                .then(() =>
                  console.log('vote again emails successfully sent !')
                )
                .catch(console.log)
            }
          })
    })
    .then(() => updatePoll(newPoll).then(poll => res.status(200).send(poll)))
})

app.post('/api/updatePoll', (req, res) => {
  updatePoll(req.body).then(poll => res.status(200).send(poll))
})

app.post('/api/vote', (req, res) => {
  getPollById(req.body.pollId)
    .then(poll => R.includes(req.body.email, poll.participants))
    .then(access =>
      access
        ? addVote(req.body).then(poll => {
            axios
              .get(`http://localhost:3006/api/checkNotifByEmails`, {
                params: {
                  participants: poll.participants,
                  notificationFlag: `onVote`
                }
              })
              .then(({ data: receivers }) => {
                if (receivers.length) {
                  axios
                    .post(`http://localhost:3003/api/sendEmail`, {
                      recipients: receivers,
                      subject: `New Vote in Jalas`,
                      message: `New vote added to Poll : ${poll.name}\n\n
                      To see more details, please visit this link :\n
                      Link: http://localhost:8080/vote/${poll._id}\n`
                    })
                    .then(() => console.log('emails successfully sent !'))
                    .catch(console.log)
                }
              })
            res.status(200).send(poll)
          })
        : res.sendStatus(403)
    )
})

app.post('/api/closePoll', (req, res) =>
  closePoll(req.body.id).then(poll => {
    axios
      .get(`http://localhost:3006/api/checkNotifByEmails`, {
        params: {
          participants: poll.participants,
          notificationFlag: `onClosePoll`
        }
      })
      .then(({ data: receivers }) => {
        if (receivers.length) {
          axios
            .post(`http://localhost:3003/api/sendEmail`, {
              recipients: receivers,
              subject: `close poll in Jalas`,
              message: `Poll : ${poll.name}\n\n closed`
            })
            .then(() => console.log('emails successfully sent !'))
            .catch(console.log)
        }
      })
    res.status(200).send(poll)
  })
)

app.listen(3002, () => console.log(`Poll listening on port ${3002}!`))
