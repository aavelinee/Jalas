// modules
import { connect } from 'react-redux'
// components
import CommentModal from './commentModal'
// actions
import { dispatchSetValue, dispatchResetModal } from './commentModal.action'
import { dispatchSetSnackbarMessage } from '../snackbar/snackbar.actions'
// redux
import { getState } from '../../../setup/redux'

const mapStateToProps = state => state.view.commentModal

const mapDispatchToProps = () => ({
  onChangeValue: dispatchSetValue,
  onClose: dispatchResetModal,
  onSubmit: () => {
    const { onSubmit, value } = getState().view.commentModal
    if (!value) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'لطفا نظر خود را وارد کنید'
      })
      return
    }
    onSubmit(value)
    dispatchResetModal()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
