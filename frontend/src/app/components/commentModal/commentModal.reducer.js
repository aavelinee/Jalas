// state
const initialState = {
  value: '',
  isOpen: false
}

// reducers
const reducers = {
  OPEN_MODAL: (state, data) => ({ ...state, ...data, isOpen: true }),

  RESET_MODAL: () => initialState,

  SET_VALUE: (state, value) => ({ ...state, value })
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
