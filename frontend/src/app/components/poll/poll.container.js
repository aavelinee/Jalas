// modules
import * as R from 'ramda'
import { connect } from 'react-redux'
import UIDGenerator from 'uid-generator'
// components
import Poll from './poll'
// actions
import {
  dispatchSetSelectedOption,
  dispatchSetSelectedRoom
} from '../pollList/pollList.action'
import { dispatchSetPoll, dispatchResetPoll } from '../newPoll/newPoll.action'
import { dispatchSetPage } from '../../app.action'
// views
import { getUserId, getUserEmail } from '../../../logic/user/user.reducer'
// requests
import {
  updatePoll,
  votePoll,
  closePoll
} from '../../../logic/polls/polls.request'
import { reserveRoom, cancelReserve } from '../../../logic/rooms/rooms.request'
import { submitComment } from '../../../logic/comments/comments.request'
// redux
import { getState } from '../../../setup/redux'
import { dispatchSetSnackbarMessage } from '../snackbar/snackbar.actions'
// helpers
import { canVote } from '../../../helper/functions/authorization'
import { makePollComments } from './poll.helper'

const uidgen = new UIDGenerator()

const mapStateToProps = (
  state,
  { id, userId, closed, reservingRoom, noAction, participants }
) => {
  const { pollId } = state.view.pollList.selectedRoom
  const userCanVote = canVote(getUserEmail(), participants)
  const actionsNotAllowed = noAction || userId !== getUserId()
  return {
    disabledOptions:
      !!reservingRoom || (closed ? actionsNotAllowed : !userCanVote),
    optionType: closed ? 'create' : 'vote',
    action: actionsNotAllowed
      ? ''
      : !closed
      ? 'close'
      : pollId === id
      ? 'create'
      : reservingRoom
      ? 'cancel'
      : '',
    comments: makePollComments(id),
    canVote: userCanVote,
    canEdit: userId === getUserId() && !closed
  }
}

const mapDispatchToProps = (_, { id, reservingRoom, ...poll }) => ({
  onCreate: () => {
    const { startDate, endDate } = getState().view.pollList.selectedOption
    const reservingRoom = getState().view.pollList.selectedRoom.number

    updatePoll({
      _id: id,
      reservingRoom
    })
      .then(() => {
        dispatchSetSelectedRoom({})
        dispatchSetSelectedOption(null)
      })
      .then(() =>
        reserveRoom({
          endDate,
          startDate,
          pollId: id,
          room: reservingRoom
        })
      )
  },
  onCancel: () => cancelReserve(id, reservingRoom),
  onClose: () => closePoll(id),
  votePoll: optionIndex => value => votePoll(id, optionIndex, value),
  onSubmitComment: content => {
    if (!content) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'لطفا نظر خود را وارد کنید'
      })
      return
    }
    submitComment({ pollId: id, content })
  },
  onEdit: () => {
    dispatchResetPoll()
    dispatchSetPoll({
      id,
      title: poll.name,
      deadline: poll.deadline,
      participants: R.map(
        value => ({
          value,
          id: uidgen.generateSync()
        }),
        poll.participants
      ),
      options: R.map(
        option => ({
          ...option,
          start: option.startDate,
          end: option.endDate,
          date: new Date(option.startDate)
        }),
        poll.options
      )
    })
    dispatchSetPage('edit')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Poll)
