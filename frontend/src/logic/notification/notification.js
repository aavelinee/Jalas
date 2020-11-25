import { post } from '../../setup/request'

export const sendMeetingEmail = title =>
  post('/notification/api/reserveComplete', {
    message: `"${title}" meeting has been successfully submitted.`
  })
