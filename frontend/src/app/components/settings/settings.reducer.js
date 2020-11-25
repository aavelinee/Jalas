import * as R from 'ramda'

// state
const initialState = {
  isOpen: false,
  notification: {}
}

// reducers
const reducers = {
  OPEN_SETTINGS: (state, data) => ({ ...state, ...data, isOpen: true }),

  RESET_SETTINGS: () => initialState,

  SET_SETTING: (state, { path, value }) => R.assocPath(path, value, state)
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
