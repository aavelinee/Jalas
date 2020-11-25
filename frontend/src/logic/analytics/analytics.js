import { post } from '../../setup/request'
import { getUserId } from '../user/user.reducer'

export const sendAnalytics = (type, data) =>
  post('/analytics/api/insertEvent', {
    type,
    data,
    userId: getUserId(),
    time: new Date()
  })

export const loadTime = new Date()
