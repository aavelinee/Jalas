// modules
import { connect } from 'react-redux'
// components
import Meeting from './meeting'
// requests
import { cancelMeeting } from '../../../logic/meetings/meetings.request'
import { getUserId } from '../../../logic/user/user.reducer'
import { dispatchSetSnackbarMessage } from '../snackbar/snackbar.actions'

const mapStateToProps = (state, { userId }) => ({
  canCancel: getUserId() === userId
})

const mapDispatchToProps = (_, { _id }) => ({
  onCancel: () =>
    cancelMeeting(_id).then(() =>
      dispatchSetSnackbarMessage({
        type: 'success',
        message: 'جلسه با موفقیت لغو شد'
      })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Meeting)
