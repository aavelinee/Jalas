// modules
import * as R from 'ramda'
import { connect } from 'react-redux'
// components
import Option from './option'
// actions
import {
  dispatchSetSelectedOption,
  dispatchSetSelectedRoom,
  dispatchSetLoadingRooms
} from '../../../pollList/pollList.action'
import { dispatchSetRooms } from '../../../../../logic/rooms/rooms.action'
import { getAvailableRooms } from '../../../../../logic/rooms/rooms.request'

const mapStateToProps = (state, { id }) => ({
  expanded: R.path(['view', 'pollList', 'selectedOption', 'id'], state) === id,
  rooms: state.main.rooms,
  isLoading: state.view.pollList.loadingRooms
})

const mapDispatchToProps = (_, { id, startDate, endDate }) => ({
  onChange: (e, expanded) => {
    dispatchSetRooms([])
    if (expanded) {
      dispatchSetLoadingRooms(true)
      getAvailableRooms(startDate, endDate)
    }
    dispatchSetSelectedOption(expanded ? { id, startDate, endDate } : null)
    dispatchSetSelectedRoom({})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Option)
