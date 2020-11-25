import { post } from '../../setup/request'
// requests
import { getUserId } from './user.reducer'
import { getPolls } from '../polls/polls.request'
import { getUsers } from '../users/users.request'
import { getMeetings } from '../meetings/meetings.request'
// actions
import { dispatchSetUser } from './user.action'
import { dispatchSetSnackbarMessage } from '../../app/components/snackbar/snackbar.actions'

export const authenticateUser = (email, pass) =>
  post(`/user/api/checkUserAuth`, { email, pass }).then(res => {
    const { _id, password, ...user } = res.data || {}
    if (!_id) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'اطلاعات وارد شده صحیح نمی‌باشد'
      })
      return
    }
    dispatchSetUser({ userId: _id, ...user })
    getUsers()
    getPolls()
    getMeetings()
  })

export const updateUser = data =>
  post('/user/api/updateUser', {
    _id: getUserId(),
    ...data
  }).then(res => {
    const { _id, ...user } = res.data
    dispatchSetUser(dispatchSetUser({ userId: _id, ...user }))
  })

// authenticateUser('mail.mmdghanbari@gmail.com', '123')
