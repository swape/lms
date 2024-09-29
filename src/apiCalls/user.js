import {fetchApi} from '../utils/dataFetching'

export function getUserInfo() {
  return fetchApi(`api/user`, 'GET')
}

export function getRegisteredUsers(sid) {
  return fetchApi(`api/users?sid=${sid}`, 'GET')
}
