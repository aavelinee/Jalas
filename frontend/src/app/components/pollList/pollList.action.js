import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const SET_SELECTED_OPTION = 'SET_SELECTED_OPTION'
export const dispatchSetSelectedOption = (...args) =>
  dispatch(createAction(SET_SELECTED_OPTION)(...args))

export const SET_SELECTED_ROOM = 'SET_SELECTED_ROOM'
export const dispatchSetSelectedRoom = (...args) =>
  dispatch(createAction(SET_SELECTED_ROOM)(...args))

export const SET_LOADING_ROOMS = 'SET_LOADING_ROOMS'
export const dispatchSetLoadingRooms = (...args) =>
  dispatch(createAction(SET_LOADING_ROOMS)(...args))
