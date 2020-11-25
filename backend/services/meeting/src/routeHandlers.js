const axios = require('axios')
const {
  getUserMeetings,
  getAllMeetings,
  getMeetingById,
  cancelMeeting,
  saveMeeting
} = require('./db')

exports.getAllMeetingsHandler = (req, res) => {
  getAllMeetings().then(meetings => res.send(meetings))
}

exports.getMeetingByIdHandler = (req, res) => {
  getMeetingById(req.params.meetingId).then(meeting => res.send(meeting))
}

exports.getUserMeetingsHandler = (req, res) => {
  getUserMeetings(req.params.userId, req.params.email).then(meetings =>
    res.send(meetings)
  )
}

exports.createMeetingHandler = (req, res) => {
  saveMeeting(req.body).then(meeting => {
    axios
      .get(`http://localhost:3006/api/checkNotifByEmails`, {
        params: {
          participants: meeting.participants,
          notificationFlag: `onArrangeMeeting`
        }
      })
      .then(({ data: receivers }) => {
        if (receivers.length)
          axios
            .post(`http://localhost:3003/api/sendEmail`, {
              recipients: receivers,
              subject: `New Meeting: ${meeting.title}`,
              message: `You are invited to a new meeting.\n
                Title: ${meeting.title}\n
                Creator: ${meeting.userId}\n
                From: ${meeting.startDate}\n
                To: ${meeting.endDate}\n
                Room: ${meeting.room}\n
                Participants: ${meeting.participants.join(', ')}
                Link: http://localhost:8080/meeting/${meeting._id}`
            })
            .then(() => console.log('emails successfully sent !'))
            .catch(console.log)
      })
    res.status(200).send(meeting)
  })
}

exports.cancelMeetingHandler = (req, res) =>
  cancelMeeting(req.body.meetingId).then(meeting => {
    axios
      .get(`http://localhost:3006/api/checkNotifByEmails`, {
        params: {
          participants: meeting.participants,
          notificationFlag: `onCancelMeeting`
        }
      })
      .then(({ data: receivers }) => {
        if (receivers.length)
          axios
            .post(`http://localhost:3003/api/sendEmail`, {
              recipients: receivers,
              subject: `Meeting Cancelled: ${meeting.title}`,
              message: `Meeting Cancelled: ${meeting.title}.`
            })
            .then(() => console.log('cancel emails successfully sent !'))
            .catch(console.log)
      })
    res.sendStatus(200)
  })
