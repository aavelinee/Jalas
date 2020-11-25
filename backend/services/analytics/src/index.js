const express = require('express')
const {
  addEventHandler,
  getAllEventsHandler,
  reservedRoomNumberHandler,
  unsuccessRoomReserveNumberHandler
  // getTroughputHandler
} = require('./routeHandlers')
const { connect } = require('./db')

connect('jalas')

const app = express()

app.use(express.json())

app.post('/api/insertEvent', addEventHandler)

app.get('/api/getAllEvents', getAllEventsHandler)

app.get('/api/getReservedRoomNumber', reservedRoomNumberHandler)

app.get('/api/getUnsuccessRoomReservenumber', unsuccessRoomReserveNumberHandler)

// app.get('/api/getTroughput', getTroughputHandler)

app.listen(3005, () => console.log(`Analytics listening on port ${3005}!`))
