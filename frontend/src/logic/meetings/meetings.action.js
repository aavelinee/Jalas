import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const INSERT_MEETING = 'INSERT_MEETING'
export const dispatchInsertMeeting = (...args) =>
  dispatch(createAction(INSERT_MEETING)(...args))

export const REMOVE_MEETING = 'REMOVE_MEETING'
export const dispatchRemoveMeeting = (...args) =>
  dispatch(createAction(REMOVE_MEETING)(...args))

export const SET_MEETINGS = 'SET_MEETINGS'
export const dispatchSetMeetings = (...args) =>
  dispatch(createAction(SET_MEETINGS)(...args))
