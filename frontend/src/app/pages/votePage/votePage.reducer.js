const initialState = {}

const reducers = {
  SET_POLL: (_, poll) => poll
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
