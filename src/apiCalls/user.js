import {fetchApi} from '../utils/dataFetching'

export function getUserInfo(uid) {
  return fetchApi(`api/user?uid=${uid}`, 'GET')
}
