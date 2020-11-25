const express = require('express')
const {
  checkUserAuthHandler,
  checkNotifByEmails,
  updateUserHandler,
  getUsersHandler,
  addUserHandler
} = require('./routeHandlers')
const { connect } = require('./db')

connect('jalas')

const app = express()

app.use(express.json())

app.get('/api/getUsers', getUsersHandler)

app.get('/api/checkNotifByEmails', checkNotifByEmails)

app.post('/api/checkUserAuth', checkUserAuthHandler)

app.post('/api/addUser', addUserHandler)

app.post('/api/updateUser', updateUserHandler)

app.listen(3006, () => console.log(`User listening on port ${3006}!`))
