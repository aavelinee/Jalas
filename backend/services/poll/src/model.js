// module
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PollSchema = new Schema({
  name: String,
  userId: String,
  options: [{}],
  participants: [String],
  closed: Boolean,
  deleted: Boolean,
  reservingRoom: Number,
  deadline: Date
})

exports.Poll = model('poll', PollSchema)
