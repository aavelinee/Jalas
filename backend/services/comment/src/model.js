// module
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const CommentSchema = new Schema({
  userId: String,
  parentId: String,
  pollId: String,
  content: String,
  date: Date,
  deleted: Boolean
})

exports.Comment = model('comment', CommentSchema)
