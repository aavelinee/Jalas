const { getUserByEmail, saveUser, updateUser, getUsers } = require('./db')

exports.getUsersHandler = (req, res) => {
  getUsers().then(users => res.send(users))
}

exports.checkUserAuthHandler = (req, res) => {
  const { email, pass } = req.body
  getUserByEmail(email).then(user => {
    if (!user || user.password !== pass) res.send(null)
    else res.send(user)
  })
}

exports.addUserHandler = (req, res) => {
  saveUser(req.body).then(user => res.send(user))
}

exports.updateUserHandler = (req, res) =>
  updateUser(req.body).then(user => res.send(user))

exports.checkNotifByEmails = (req, res) => {
  const { participants, notificationFlag } = req.query

  Promise.all(participants.map(getUserByEmail))
    .then(users =>
      users.filter(user => user.settings.notification[notificationFlag])
    )
    .then(users => users.map(user => user.email))
    .then(emails => res.send(emails))
}
