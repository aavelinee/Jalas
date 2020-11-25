// modules
import { connect } from 'react-redux'
// components
import VotePage from './votePage'
// actions
import { dispatchSetPoll } from './votePage.action'
// requests
import { getPollById } from '../../../logic/polls/polls.request'
import { getPollComments } from '../../../logic/comments/comments.request'
// helpers
import { canSee } from '../../../helper/functions/authorization'
import { getUserId, getUserEmail } from '../../../logic/user/user.reducer'

const mapStateToProps = state => {
  const poll = state.view.votePage
  return {
    ...poll,
    canSee: poll._id && canSee(getUserId(), getUserEmail(), poll)
  }
}

const mapDispatchToProps = (_, { pollId }) => ({
  onMount: () =>
    getPollById(pollId)
      .then(poll => {
        dispatchSetPoll(poll || {})
        if (poll) getPollComments(poll.id)
      })
      .catch(() => dispatchSetPoll({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(VotePage)
