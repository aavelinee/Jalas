// modules
import * as R from 'ramda'
import UIDGenerator from 'uid-generator'

const uidgen = new UIDGenerator()

// state
const initialState = {
  title: '',
  options: [],
  participants: [],
  deadline: new Date(new Date().setDate(new Date().getDate() + 1))
}

// lenses
const optionsLens = R.lensProp('options')
const participantsLens = R.lensProp('participants')

// reducers
const reducers = {
  RESET_POLL: () => ({
    ...initialState,
    deadline: new Date(new Date().setDate(new Date().getDate() + 1))
  }),

  SET_POLL: (_, poll) => poll,

  SET_TITLE: (state, title) => ({ ...state, title }),

  SET_DEADLINE: (state, deadline) => ({ ...state, deadline }),

  ADD_OPTION: state =>
    R.over(
      optionsLens,
      R.append({
        id: uidgen.generateSync(),
        date: new Date(),
        start: new Date(),
        end: new Date()
      }),
      state
    ),

  REMOVE_OPTION: (state, id) =>
    R.over(optionsLens, R.reject(R.propEq('id', id)), state),

  UPDATE_OPTION: (state, { id, value }) =>
    R.over(
      optionsLens,
      R.map(option => (option.id === id ? R.merge(option, value) : option)),
      state
    ),

  ADD_PARTICIPANT: state =>
    R.over(
      participantsLens,
      R.append({
        id: uidgen.generateSync(),
        value: ''
      }),
      state
    ),

  REMOVE_PARTICIPANT: (state, id) =>
    R.over(participantsLens, R.reject(R.propEq('id', id)), state),

  UPDATE_PARTICIPANT: (state, { id, value }) =>
    R.over(
      participantsLens,
      R.map(participant =>
        participant.id === id ? { id, value } : participant
      ),
      state
    )
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
