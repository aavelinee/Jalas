import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const SET_ROOMS = 'SET_ROOMS'
export const dispatchSetRooms = (...args) =>
  dispatch(createAction(SET_ROOMS)(...args))
