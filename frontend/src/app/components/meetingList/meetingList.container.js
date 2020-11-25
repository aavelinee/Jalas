// modules
import { connect } from 'react-redux'
// components
import MeetingList from './meetingList'

const mapStateToProps = state => ({
  meetings: state.main.meetings
})

export default connect(mapStateToProps)(MeetingList)
