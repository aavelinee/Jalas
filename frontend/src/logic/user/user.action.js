import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const SET_USER = 'SET_USER'
export const dispatchSetUser = (...args) =>
  dispatch(createAction(SET_USER)(...args))
