import { createAction } from 'redux-actions'
import { dispatch } from '../setup/redux'

export const SET_PAGE = 'SET_PAGE'
export const dispatchSetPage = (...args) =>
  dispatch(createAction(SET_PAGE)(...args))
