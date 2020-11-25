import { get } from '../../setup/request'
// actions
import { dispatchAddUsers } from './users.action'

export const getUsers = () =>
  get(`/user/api/getUsers`)
    .then(res => dispatchAddUsers(res.data))
    .catch(console.log)
