const axios = require('axios')
const { saveComment, getPollComments, editComment } = require('./db')

const checkForMention = (pollId, content) =>
  axios
    .get(`http://localhost:3002/api/getUsersInPoll/${pollId}`)
    .then(res => res.data.filter(email => content.includes(`@${email}`)))
    .then(
      emails =>
        emails.length &&
        axios
          .get(`http://localhost:3006/api/checkNotifByEmails`, {
            params: { participants: emails, notificationFlag: `onMention` }
          })
          .then(
            ({ data: receivers }) =>
              receivers.length &&
              axios
                .post(`http://localhost:3003/api/sendEmail`, {
                  recipients: receivers,
                  subject: `Mention in a comment`,
                  message: `You are mentioned in a comment.\n
                          Comment: ${content}\n
                          Link: http://localhost:8080/vote/${pollId}`
                })
                .then(() => console.log('mention emails successfully sent !'))
                .catch(console.log)
          )
    )

exports.deleteCommentHandler = (req, res) =>
  editComment({ id: req.body.commentId, deleted: true }).then(comment =>
    res.send(comment)
  )

exports.addCommentHandler = (req, res) =>
  saveComment({ ...req.body, date: new Date() }).then(comment => {
    checkForMention(comment.pollId, comment.content)
    res.status(200).send(comment)
  })

exports.getPollCommentsHandler = (req, res) =>
  getPollComments(req.params.pollId).then(comments => res.send(comments))

exports.editCommentHandler = (req, res) =>
  editComment(req.body).then(comment => {
    checkForMention(comment.pollId, comment.content)
    res.send(comment)
  })
