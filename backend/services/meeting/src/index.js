const express = require('express')
const {
  getUserMeetingsHandler,
  getAllMeetingsHandler,
  getMeetingByIdHandler,
  createMeetingHandler,
  cancelMeetingHandler
} = require('./routeHandlers')
const { connect } = require('./db')

connect('jalas')

const app = express()

app.use(express.json())

app.get('/api/getAllMeetings', getAllMeetingsHandler)

app.get('/api/getMeetingById/:meetingId', getMeetingByIdHandler)

app.get('/api/getUserMeetings/:userId/:email', getUserMeetingsHandler)

app.post('/api/createMeeting', createMeetingHandler)

app.post('/api/cancelMeeting', cancelMeetingHandler)

app.listen(3001, () => console.log(`Meeting listening on port ${3001}!`))
