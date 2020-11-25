import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const UPDATE_POLL = 'UPDATE_POLL'
export const dispatchUpdatePoll = (...args) =>
  dispatch(createAction(UPDATE_POLL)(...args))

export const SET_POLLS = 'SET_POLLS'
export const dispatchSetPolls = (...args) =>
  dispatch(createAction(SET_POLLS)(...args))

export const ADD_POLL = 'ADD_POLL'
export const dispatchAddPoll = (...args) =>
  dispatch(createAction(ADD_POLL)(...args))

export const REMOVE_POLL = 'REMOVE_POLL'
export const dispatchRemovePoll = (...args) =>
  dispatch(createAction(REMOVE_POLL)(...args))
