// modules
import { connect } from 'react-redux'
// components
import MeetingPage from './meetingPage'
// actions
import { dispatchSetMeeting } from './meetingPage.action'
// requests
import { getMeetingById } from '../../../logic/meetings/meetings.request'
// helpers
import { canSee } from '../../../helper/functions/authorization'
import { getUserId, getUserEmail } from '../../../logic/user/user.reducer'

const mapStateToProps = state => {
  const meeting = state.view.meetingPage
  return {
    ...meeting,
    canSee: meeting._id && canSee(getUserId(), getUserEmail(), meeting)
  }
}
const mapDispatchToProps = (_, { meetingId }) => ({
  onMount: () =>
    getMeetingById(meetingId)
      .then(dispatchSetMeeting)
      .catch(() => dispatchSetMeeting({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage)
