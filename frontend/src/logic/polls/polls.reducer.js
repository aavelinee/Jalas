// modules
import * as R from 'ramda'
// redux
import { getState } from '../../setup/redux'

const initialState = []

// views
export const getPollById = id =>
  R.find(R.propEq('id', id))(getState().main.polls)

const reducers = {
  UPDATE_POLL: (state, updatedPoll) =>
    R.map(
      poll => (poll.id === updatedPoll.id ? { ...poll, ...updatedPoll } : poll),
      state
    ),

  SET_POLLS: (_, polls) => polls,

  ADD_POLL: (state, poll) => R.append(poll, state),

  REMOVE_POLL: (state, id) => R.reject(R.propEq('id', id), state)
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
