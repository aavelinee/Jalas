const mongoose = require('mongoose')
const { Poll } = require('./model')

const connect = dbName => {
  mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => console.log(`Connected to ( ${dbName} ) database!`))
}

connect('jalas')

exports.savePoll = poll => new Poll(poll).save()

exports.getAllPolls = () => Poll.find({ deleted: { $exists: false } })

exports.getPollById = id => Poll.findOne({ _id: id })

exports.getUserPolls = (userId, email) =>
  Poll.find({
    $or: [{ userId }, { participants: { $elemMatch: { $eq: email } } }],
    deleted: { $exists: false }
  })

exports.updatePoll = ({ _id, ...poll }) =>
  Poll.findOneAndUpdate({ _id }, { ...poll }, { new: true })

exports.addVote = ({ pollId: _id, optionIndex, value, email }) =>
  Poll.findOneAndUpdate(
    { _id },
    {
      $addToSet:
        value > 0
          ? { [`options.${optionIndex}.positives`]: email }
          : value < 0
          ? { [`options.${optionIndex}.negatives`]: email }
          : { [`options.${optionIndex}.neutrals`]: email },
      $pull:
        value > 0
          ? {
              [`options.${optionIndex}.negatives`]: email,
              [`options.${optionIndex}.neutrals`]: email
            }
          : value < 0
          ? {
              [`options.${optionIndex}.positives`]: email,
              [`options.${optionIndex}.neutrals`]: email
            }
          : {
              [`options.${optionIndex}.positives`]: email,
              [`options.${optionIndex}.negatives`]: email
            }
    },
    { new: true }
  )

exports.closePoll = _id =>
  Poll.findOneAndUpdate({ _id }, { closed: true }, { new: true })
