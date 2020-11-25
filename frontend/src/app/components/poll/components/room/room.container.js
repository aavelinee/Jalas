// modules
import { connect } from 'react-redux'
// components
import Room from './room'
// actions
import { dispatchSetSelectedRoom } from '../../../pollList/pollList.action'

const mapStateToProps = (state, { roomNumber }) => ({
  selected: state.view.pollList.selectedRoom.number === roomNumber
})

const mapDispatchToProps = (_, { roomNumber: number, pollId }) => ({
  onClick: () =>
    dispatchSetSelectedRoom({
      pollId,
      number
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Room)
