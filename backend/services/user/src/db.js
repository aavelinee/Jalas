const mongoose = require('mongoose')
const { User } = require('./model')

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

exports.getUsers = () => User.find({}).select('-password')

exports.getUserByEmail = email => User.findOne({ email })

exports.saveUser = user => new User(user).save()

exports.updateUser = ({ _id, ...data }) =>
  User.findOneAndUpdate({ _id }, { ...data }, { new: true })
