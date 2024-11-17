import {fetchApi} from '../utils/dataFetching'

export async function getRoomMessages(rid) {
  return await fetchApi(`api/messages?rid=${rid}`, 'GET')
}
