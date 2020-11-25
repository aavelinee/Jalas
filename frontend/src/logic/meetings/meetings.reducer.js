import * as R from 'ramda'

const initialState = []

const reducers = {
  SET_MEETINGS: (_, meetings) => meetings,

  INSERT_MEETING: (state, meeting) => [...state, meeting],

  REMOVE_MEETING: (state, id) => R.reject(R.propEq('_id', id), state)
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
