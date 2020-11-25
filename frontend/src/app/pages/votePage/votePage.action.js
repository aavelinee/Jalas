import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const SET_POLL = 'SET_POLL'
export const dispatchSetPoll = (...args) =>
  dispatch(createAction(SET_POLL)(...args))
