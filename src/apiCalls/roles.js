import {fetchApi} from '../utils/dataFetching'

export function getRoles(uid) {
  return fetchApi(`api/user-roles?uid=${uid}`, 'GET')
}
