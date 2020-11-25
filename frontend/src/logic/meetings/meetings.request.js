import { get, post } from '../../setup/request'
import { sendAnalytics, loadTime } from '../analytics/analytics'
// actions
import {
  dispatchSetMeetings,
  dispatchInsertMeeting,
  dispatchRemoveMeeting
} from './meetings.action'
import { dispatchSetSnackbarMessage } from '../../app/components/snackbar/snackbar.actions'
// views
import { getUserId, getUserEmail } from '../user/user.reducer'

export const getMeetings = () =>
  get(`/meeting/api/getUserMeetings/${getUserId()}/${getUserEmail()}`)
    .then(res => dispatchSetMeetings(res.data))
    .catch(console.log)

export const createMeeting = meeting =>
  post('/meeting/api/createMeeting', meeting)
    .then(res => {
      dispatchInsertMeeting(res.data)
      dispatchSetSnackbarMessage({
        type: 'success',
        message: 'جلسه با موفقیت ساخته شد'
      })
    })
    .then(() =>
      sendAnalytics('CREATE_MEETING', {
        ...meeting,
        creatingDuration: new Date() - loadTime
      })
    )
    .catch(console.log)

export const cancelMeeting = meetingId =>
  post('/meeting/api/cancelMeeting', { meetingId })
    .then(() => {
      dispatchRemoveMeeting(meetingId)
      sendAnalytics('CANCEL_MEETING', { meetingId })
    })
    .catch(console.log)

export const getMeetingById = meetingId =>
  get(`/meeting/api/getMeetingById/${meetingId}`)
    .then(res => res.data)
    .catch(console.log)
