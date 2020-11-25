const mongoose = require('mongoose')
const { Event } = require('./model')

const connect = dbName => {
  const db = mongoose.connection
  db.on('error', () => console.error('connection error'))
  db.once('open', () => console.log(`Connected to ( ${dbName} ) database!`))

  return mongoose.connect(
    `mongodb+srv://mmdghanbari:mhdGhanbari76@cluster0-e5rft.mongodb.net/jalas?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
}

exports.connect = connect

exports.addEvent = event => new Event(event).save()

exports.getAllEvents = () => Event.find({}).lean()

exports.reservedRoomNumber = () => Event.find({ type: 'RESERVE_ROOM' }).count()

exports.unsuccessRoomReserveNumber = () =>
  Event.find({
    $or: [{ type: 'MODIFY_MEETING' }, { type: 'MODIFY_MEETING' }]
  }).count()

