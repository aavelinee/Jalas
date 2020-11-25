// modules
import * as R from 'ramda'
// redux
import { getState } from '../../setup/redux'

const initialState = []

// views
export const getPollComments = pollId =>
  R.compose(
    R.filter(
      R.both(R.propEq('pollId', pollId), R.complement(R.prop('deleted')))
    )
  )(getState().main.comments)

const reducers = {
  ADD_COMMENT: (state, comment) => R.append(comment, state),

  REMOVE_COMMENT: (state, id) => R.reject(R.propEq('_id', id), state),

  EDIT_COMMENT: (state, updatedComment) =>
    R.map(
      comment =>
        comment._id === updatedComment._id
          ? { ...comment, ...updatedComment }
          : comment,
      state
    ),

  INSERT_POLL_COMMENTS: (state, { comments, pollId }) =>
    R.compose(R.concat(comments), R.reject(R.propEq('pollId', pollId)))(state)
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
