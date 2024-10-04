import {fetchApi} from '../utils/dataFetching'

export function getUserInfo() {
  return fetchApi(`api/user`, 'GET')
}

export function getRegisteredUsers(sid) {
  return fetchApi(`api/users?sid=${sid}`, 'GET')
}

export function deleteUser(sid, uid) {
  return fetchApi(`api/user?sid=${sid}&uid=${uid}`, 'DELETE')
}

export function saveEditedUser(data) {
  return fetchApi(`api/user`, 'POST', data)
}
