import {fetchApi} from '../utils/dataFetching'

export async function getSchools() {
  return await fetchApi(`api/schools`, 'GET')
}
