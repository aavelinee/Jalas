import * as R from 'ramda'
import { get, post } from '../../setup/request'
// actions
import { dispatchSetPage } from '../../app/app.action'
import {
  dispatchSetPolls,
  dispatchUpdatePoll,
  dispatchAddPoll
} from './polls.action'
import { dispatchResetPoll } from '../../app/components/newPoll/newPoll.action'
import { dispatchSetPoll as dispatchSetVotePagePoll } from '../../app/pages/votePage/votePage.action'
// views
import { getUserId, getUserEmail } from '../user/user.reducer'
import { dispatchSetSnackbarMessage } from '../../app/components/snackbar/snackbar.actions'
// requests
import { getPollComments } from '../comments/comments.request'
// helpers
import { combineDateAndTime } from '../../helper/functions/date'

const makePoll = poll => ({
  ...poll,
  id: poll._id,
  options: R.map(
    option =>
      R.compose(R.omit(['start', 'end']), option =>
        R.merge(option, {
          startDate: option.start,
          endDate: option.end
        })
      )(option),
    poll.options
  )
})

const beforeCreating = ({ title, options, participants, deadline }) => ({
  name: title,
  deadline,
  userId: getUserId(),
  options: R.map(
    ({ date, start, end, id, positives, negatives, neutrals }) => ({
      id,
      start: combineDateAndTime(new Date(date), new Date(start)),
      end: combineDateAndTime(new Date(date), new Date(end)),
      positives: positives || [],
      negatives: negatives || [],
      neutrals: neutrals || []
    }),
    options
  ),
  participants: R.filter(R.identity, R.uniq(R.pluck('value', participants)))
})

export const getPolls = () =>
  get(`/poll/api/getUserPolls/${getUserId()}/${getUserEmail()}`)
    .then(res => {
      const polls = res.data
      dispatchSetPolls(R.map(makePoll, polls))
      R.forEach(({ _id }) => getPollComments(_id), polls)
    })
    .catch(console.log)

export const getPollById = pollId =>
  get(`/poll/api/getPollById/${pollId}`)
    .then(res => makePoll(res.data))
    .catch(console.log)

export const updatePoll = poll =>
  post('/poll/api/updatePoll', poll)
    .then(() => dispatchUpdatePoll({ ...poll, id: poll._id }))
    .catch(console.log)

export const closePoll = id =>
  post('/poll/api/closePoll', { id })
    .then(res => dispatchUpdatePoll(makePoll(res.data)))
    .catch(console.log)

export const createPoll = poll =>
  post('/poll/api/createPoll', beforeCreating(poll))
    .then(res => {
      dispatchAddPoll(makePoll(res.data))
      dispatchSetSnackbarMessage({
        type: 'success',
        message: 'نظرسنجی با موفقیت ساخته شد'
      })
      dispatchResetPoll()
      dispatchSetPage('polls')
    })
    .catch(console.log)

export const editPoll = poll =>
  post('/poll/api/editPoll', { _id: poll.id, ...beforeCreating(poll) })
    .then(res => {
      dispatchUpdatePoll(makePoll(res.data))
      dispatchSetSnackbarMessage({
        type: 'success',
        message: 'نظرسنجی با موفقیت ویرایش شد'
      })
      dispatchResetPoll()
      dispatchSetPage('polls')
    })
    .catch(console.log)

export const votePoll = (id, optionIndex, value) =>
  post('/poll/api/vote', {
    pollId: id,
    optionIndex,
    value,
    email: getUserEmail()
  })
    .then(res => {
      const poll = makePoll(res.data)
      dispatchSetVotePagePoll(poll)
      dispatchUpdatePoll(poll)
    })
    .then(() =>
      dispatchSetSnackbarMessage({
        type: 'success',
        message: 'رای شما با موفقیت ثبت شد'
      })
    )
    .catch(
      err =>
        err.response.status === 403 &&
        dispatchSetSnackbarMessage({
          type: 'error',
          message: 'شما نمی‌توانید به این نظرسنجی رای دهید'
        })
    )
