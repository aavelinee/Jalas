// modules
import * as R from 'ramda'
import { connect } from 'react-redux'
// components
import NewPoll from './newPoll'
// actions
import {
  dispatchSetTitle,
  dispatchAddOption,
  dispatchRemoveOption,
  dispatchUpdateOption,
  dispatchAddParticipant,
  dispatchRemoveParticipant,
  dispatchUpdateParticipant,
  dispatchSetDeadline
} from './newPoll.action'
import { dispatchSetSnackbarMessage } from '../snackbar/snackbar.actions'
// requests
import { createPoll, editPoll } from '../../../logic/polls/polls.request'
// redux
import { getState } from '../../../setup/redux'

const mapStateToProps = state => {
  const poll = state.view.newPoll
  return {
    ...poll,
    editMode: !!poll.id
  }
}

const mapDispatchToProps = () => ({
  createPoll: () => {
    const poll = getState().view.newPoll
    if (
      !poll.title ||
      !poll.options.length ||
      !R.reduce(R.concat, '', R.pluck('value', poll.participants))
    ) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'لطفا تمام موارد را وارد کنید'
      })
      return
    }
    createPoll(poll)
  },
  editPoll: () => {
    const poll = getState().view.newPoll
    if (
      !poll.title ||
      !poll.options.length ||
      !R.reduce(R.concat, '', R.pluck('value', poll.participants))
    ) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'لطفا تمام موارد را وارد کنید'
      })
      return
    }
    editPoll(poll)
  },
  setTitle: dispatchSetTitle,
  setDeadline: dispatchSetDeadline,
  addOption: dispatchAddOption,
  removeOption: dispatchRemoveOption,
  updateOption: id => key => value =>
    dispatchUpdateOption(id, {
      [key]: value
    }),
  addParticipant: dispatchAddParticipant,
  removeParticipant: dispatchRemoveParticipant,
  updateParticipant: id => value => dispatchUpdateParticipant(id, value)
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll)
