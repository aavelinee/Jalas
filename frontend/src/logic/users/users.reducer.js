// modules
import * as R from 'ramda'
// redux
// import { getState } from '../../setup/redux'

const initialState = {}

const reducers = {
  ADD_USERS: (state, users) =>
    R.reduce((acc, user) => R.assoc(user._id, user, acc), state, users)
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
