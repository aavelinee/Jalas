const express = require('express')
const {
  deleteCommentHandler,
  addCommentHandler,
  getPollCommentsHandler,
  editCommentHandler
} = require('./routeHandlers')
const { connect } = require('./db')

connect('jalas')

const app = express()

app.use(express.json())

app.post('/api/addComment', addCommentHandler)

app.post('/api/deleteComment', deleteCommentHandler)

app.get('/api/getPollComments/:pollId', getPollCommentsHandler)

app.post('/api/editComment', editCommentHandler)

app.listen(3007, () => console.log(`Comment listening on port ${3007}!`))
