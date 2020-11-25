const mongoose = require('mongoose')
const { Meeting } = require('./model')

const connect = dbName => {
  const db = mongoose.connection
  db.on('error', () => console.error('connection error'))
  db.once('open', () => console.log(`Connected to ( ${dbName} ) database!`))

  return mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

exports.connect = connect

exports.saveMeeting = meeting => new Meeting(meeting).save()

exports.getAllMeetings = () =>
  Meeting.find({ cancelled: { $exists: false } }).lean()

exports.getMeetingById = id => Meeting.findOne({ _id: id }).lean()

exports.getUserMeetings = (userId, email) =>
  Meeting.find({
    $or: [
      { userId, cancelled: { $exists: false } },
      {
        participants: { $elemMatch: { $eq: email } },
        cancelled: { $exists: false }
      }
    ]
  }).lean()

exports.cancelMeeting = id =>
  Meeting.findOneAndUpdate({ _id: id }, { cancelled: true }, { new: true })
