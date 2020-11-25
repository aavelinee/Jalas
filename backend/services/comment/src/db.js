const mongoose = require('mongoose')
const { Comment } = require('./model')
const axios = require('axios')

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

exports.saveComment = comment => new Comment(comment).save()

exports.getPollComments = pollId =>
  Comment.find({ pollId, deleted: { $exists: false } })

exports.editComment = ({ id, ...data }) =>
  Comment.findOneAndUpdate({ _id: id }, { ...data }, { new: true })
