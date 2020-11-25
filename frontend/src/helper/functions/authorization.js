import * as R from 'ramda'

export const canVote = (email, participants) => R.includes(email, participants)

export const canSee = (userId, email, item) =>
  userId === item.userId || R.includes(email, item.participants)
