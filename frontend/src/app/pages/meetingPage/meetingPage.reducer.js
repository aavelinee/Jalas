const initialState = {}

const reducers = {
  SET_MEETING: (_, meeting) => meeting
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
