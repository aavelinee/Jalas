const initialState = {
  selectedOption: null,
  selectedRoom: {
    number: null,
    pollId: null
  },
  loadingRooms: false
}

const reducers = {
  SET_SELECTED_OPTION: (state, selectedOption) => ({
    ...state,
    selectedOption
  }),

  SET_SELECTED_ROOM: (state, selectedRoom) => ({ ...state, selectedRoom }),

  SET_LOADING_ROOMS: (state, loadingRooms) => ({ ...state, loadingRooms })
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
