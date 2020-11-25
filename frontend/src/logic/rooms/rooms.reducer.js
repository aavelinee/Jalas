// const initialState = [801, 802, 302, 305, 102]
const initialState = []

const reducers = {
  SET_ROOMS: (state, rooms) => rooms
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
