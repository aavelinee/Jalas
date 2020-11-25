// module
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const EventSchema = new Schema({
  type: String,
  time: String,
  userId: String,
  data: Object
})

exports.Event = model('event', EventSchema)
