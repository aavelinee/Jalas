// modules
import { connect } from 'react-redux'
// components
import PollList from './pollList'

const mapStateToProps = state => ({
  polls: state.main.polls
})

export default connect(mapStateToProps)(PollList)
