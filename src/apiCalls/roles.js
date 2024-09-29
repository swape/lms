import {fetchApi} from '../utils/dataFetching'

export function getRoles() {
  return fetchApi(`api/user-roles`, 'GET')
}
