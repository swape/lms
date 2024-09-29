import {fetchApi} from '../utils/dataFetching'

export function getUserInfo() {
  return fetchApi(`api/user`, 'GET')
}
