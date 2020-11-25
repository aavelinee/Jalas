const {
  addEvent,
  getAllEvents,
  reservedRoomNumber,
  unsuccessRoomReserveNumber
} = require('./db')

exports.addEventHandler = (req, res) => {
  addEvent(req.body).then(() => res.sendStatus(200))
}

exports.getAllEventsHandler = (req, res) => {
  getAllEvents().then(events => res.send(events))
}

exports.reservedRoomNumberHandler = (req, res) => {
  reservedRoomNumber().then(number => res.send(number))
}

exports.unsuccessRoomReserveNumberHandler = (req, res) => {
  unsuccessRoomReserveNumber().then(number => res.send(number))
}

exports.UnsuccessRoomReserveNumberHandler = (req, res) => {
  UnsuccessRoomReserveNumber().then(number => res.send(number))
}

exports.getTroughputHandler = (req, res) => {
  getTroughput().then(number => res.send(number))
}
