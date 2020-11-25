import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const RESET_POLL = 'RESET_POLL'
export const dispatchResetPoll = (...args) =>
  dispatch(createAction(RESET_POLL)(...args))

export const SET_POLL = 'SET_POLL'
export const dispatchSetPoll = (...args) =>
  dispatch(createAction(SET_POLL)(...args))

export const SET_TITLE = 'SET_TITLE'
export const dispatchSetTitle = (...args) =>
  dispatch(createAction(SET_TITLE)(...args))

export const SET_DEADLINE = 'SET_DEADLINE'
export const dispatchSetDeadline = (...args) =>
  dispatch(createAction(SET_DEADLINE)(...args))

export const ADD_OPTION = 'ADD_OPTION'
export const dispatchAddOption = (...args) =>
  dispatch(createAction(ADD_OPTION)(...args))

export const REMOVE_OPTION = 'REMOVE_OPTION'
export const dispatchRemoveOption = (...args) =>
  dispatch(createAction(REMOVE_OPTION)(...args))

export const UPDATE_OPTION = 'UPDATE_OPTION'
export const dispatchUpdateOption = (...args) =>
  dispatch(
    createAction(UPDATE_OPTION, (id, value) => ({
      id,
      value
    }))(...args)
  )

export const ADD_PARTICIPANT = 'ADD_PARTICIPANT'
export const dispatchAddParticipant = (...args) =>
  dispatch(createAction(ADD_PARTICIPANT)(...args))

export const REMOVE_PARTICIPANT = 'REMOVE_PARTICIPANT'
export const dispatchRemoveParticipant = (...args) =>
  dispatch(createAction(REMOVE_PARTICIPANT)(...args))

export const UPDATE_PARTICIPANT = 'UPDATE_PARTICIPANT'
export const dispatchUpdateParticipant = (...args) =>
  dispatch(
    createAction(UPDATE_PARTICIPANT, (id, value) => ({
      id,
      value
    }))(...args)
  )
