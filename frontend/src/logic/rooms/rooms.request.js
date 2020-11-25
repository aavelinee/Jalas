import { get, post } from '../../setup/request'
import { sendAnalytics } from '../analytics/analytics'
// actions
import { dispatchSetRooms } from './rooms.action'
import { dispatchRemovePoll } from '../polls/polls.action'
import { dispatchSetSnackbarMessage } from '../../app/components/snackbar/snackbar.actions'
import {
  dispatchSetLoadingRooms,
  dispatchSetSelectedOption
} from '../../app/components/pollList/pollList.action'
// requests
import { updatePoll } from '../polls/polls.request'
import { createMeeting } from '../meetings/meetings.request'
// helpers
import { formatDate } from '../../helper/functions/date'
import { getPollById } from '../polls/polls.reducer'
// views
import { getUserId } from '../user/user.reducer'

export const getAvailableRooms = (startDate, endDate) =>
  get(
    `/reserve/api/getAvailableRooms/${formatDate(startDate)}/${formatDate(
      endDate
    )}`
  )
    .then(res => {
      dispatchSetLoadingRooms(false)
      dispatchSetRooms(res.data.availableRooms)
    })
    .catch(() => {
      dispatchSetSelectedOption(null)
      dispatchSetLoadingRooms(false)
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'سامانه رزرواسیون در دسترس نیست'
      })
    })

export const reserveRoom = ({ room: roomNumber, pollId, startDate, endDate }) =>
  post(`/reserve/api/reserveRoom`, {
    roomNumber,
    userId: getUserId(),
    start: formatDate(startDate),
    end: formatDate(endDate)
  })
    .then(res => {
      if (res.data === 'cancelled') return

      const { name, participants } = getPollById(pollId)
      dispatchRemovePoll(pollId)
      updatePoll({
        _id: pollId,
        deleted: true
      }).then(() =>
        createMeeting({
          userId: getUserId(),
          title: name,
          room: roomNumber,
          startDate,
          endDate,
          participants
        })
      )
      sendAnalytics('ًROOM_RESERVE', { roomNumber, startDate, endDate })
    })
    .catch(err => {
      const { status } = err.response
      dispatchSetSnackbarMessage({
        type: 'error',
        message:
          status === 404 || status === 400
            ? 'اتاق انتخاب شده در دسترس نیست'
            : 'سامانه رزرواسیون در دسترس نیست'
      })
      updatePoll({
        _id: pollId,
        reservingRoom: null
      })
    })

export const cancelReserve = (pollId, roomNumber) =>
  post('/reserve/api/cancelReserve', { roomNumber })
    .then(() => {
      updatePoll({
        _id: pollId,
        reservingRoom: null
      })
      sendAnalytics('CANCEL_RESERVE', { pollId, roomNumber })
    })
    .catch(console.log)
