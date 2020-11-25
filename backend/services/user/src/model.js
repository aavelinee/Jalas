// module
const mongoose = require('mongoose')

const { Schema, model } = mongoose

// settings: {
//   notification: {
//     onArrangeMeeting: Boolean,
//     onCancelMeeting: Boolean,
//     onMention: Boolean,
//     onInvitation: Boolean,
//     onRemovedFromPoll: Boolean,
//     onEditPoll: Boolean,
//     onClosePoll: Boolean,
//     onVote: Boolean
//   }
// }

const UserSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  settings: {
    notification: {
      type: Object,
      default: {}
    }
  }
})

exports.User = model('user', UserSchema)
