import { getState } from '../../setup/redux'

const initialState = {}

export const getUserId = () => getState().main.user.userId

export const getUserEmail = () => getState().main.user.email

export const getUserSettings = () => getState().main.user.settings || {}

const reducers = {
  SET_USER: (state, user) => ({ ...state, ...user })
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
