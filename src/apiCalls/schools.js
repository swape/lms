import {fetchApi} from '../utils/dataFetching'

export async function getSchools(uid = '') {
  return await fetchApi(`api/schools?uid=${uid}`, 'GET')
}
