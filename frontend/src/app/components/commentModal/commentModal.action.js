import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const OPEN_MODAL = 'OPEN_MODAL'
export const dispatchOpenModal = (...args) =>
  dispatch(createAction(OPEN_MODAL)(...args))

export const RESET_MODAL = 'RESET_MODAL'
export const dispatchResetModal = (...args) =>
  dispatch(createAction(RESET_MODAL)(...args))

export const SET_VALUE = 'SET_VALUE'
export const dispatchSetValue = (...args) =>
  dispatch(createAction(SET_VALUE)(...args))
