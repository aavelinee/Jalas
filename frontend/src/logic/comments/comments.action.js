import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

export const ADD_COMMENT = 'ADD_COMMENT'
export const dispatchAddComment = (...args) =>
  dispatch(createAction(ADD_COMMENT)(...args))

export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const dispatchRemoveComment = (...args) =>
  dispatch(createAction(REMOVE_COMMENT)(...args))

export const EDIT_COMMENT = 'EDIT_COMMENT'
export const dispatchEditComment = (...args) =>
  dispatch(createAction(EDIT_COMMENT)(...args))

export const INSERT_POLL_COMMENTS = 'INSERT_POLL_COMMENTS'
export const dispatchInsertPollComments = (...args) =>
  dispatch(createAction(INSERT_POLL_COMMENTS)(...args))
