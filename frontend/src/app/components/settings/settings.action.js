import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

export const OPEN_SETTINGS = 'OPEN_SETTINGS'
export const dispatchOpenSettings = (...args) =>
  dispatch(createAction(OPEN_SETTINGS)(...args))

export const RESET_SETTINGS = 'RESET_SETTINGS'
export const dispatchResetSettings = (...args) =>
  dispatch(createAction(RESET_SETTINGS)(...args))

export const SET_SETTING = 'SET_SETTING'
export const dispatchSetSetting = (...args) =>
  dispatch(createAction(SET_SETTING)(...args))
