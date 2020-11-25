import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const SET_MEETING = 'SET_MEETING'
export const dispatchSetMeeting = (...args) =>
  dispatch(createAction(SET_MEETING)(...args))
