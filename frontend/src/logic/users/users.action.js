import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const ADD_USERS = 'ADD_USERS'
export const dispatchAddUsers = (...args) =>
  dispatch(createAction(ADD_USERS)(...args))
