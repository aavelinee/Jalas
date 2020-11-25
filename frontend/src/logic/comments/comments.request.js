import { get, post } from '../../setup/request'
// actions
import {
  dispatchAddComment,
  dispatchEditComment,
  dispatchRemoveComment,
  dispatchInsertPollComments
} from './comments.action'
// views
import { getUserId } from '../user/user.reducer'

export const getPollComments = pollId =>
  get(`/comment/api/getPollComments/${pollId}`)
    .then(res => dispatchInsertPollComments({ comments: res.data, pollId }))
    .catch(console.log)

export const submitComment = comment =>
  post(`/comment/api/addComment`, {
    ...comment,
    userId: getUserId()
  })
    .then(res => dispatchAddComment(res.data))
    .catch(console.log)

export const deleteComment = commentId =>
  post(`/comment/api/deleteComment`, { commentId })
    .then(() => dispatchRemoveComment(commentId))
    .catch(console.log)

export const editComment = data =>
  post(`/comment/api/editComment`, data)
    .then(res => dispatchEditComment(res.data))
    .catch(console.log)
