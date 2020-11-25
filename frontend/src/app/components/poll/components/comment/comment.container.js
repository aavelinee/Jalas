// modules
import { connect } from 'react-redux'
// components
import Comment from './comment'
// actions
import { dispatchOpenModal } from '../../../commentModal/commentModal.action'
// requests
import {
  deleteComment,
  editComment,
  submitComment
} from '../../../../../logic/comments/comments.request'

const mapStateToProps = (state, { userId: writerId }) => {
  const { firstname, lastname } = state.main.users[writerId] || {}
  return {
    firstname,
    lastname,
    canDelete: state.main.user.userId === writerId
  }
}

const mapDispatchToProps = (_, { _id, content, pollId }) => ({
  onReply: () =>
    dispatchOpenModal({
      onSubmit: value =>
        submitComment({
          pollId,
          content: value,
          parentId: _id
        })
    }),
  onDelete: () => deleteComment(_id),
  onEdit: () =>
    dispatchOpenModal({
      value: content,
      onSubmit: value => editComment({ id: _id, content: value })
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
