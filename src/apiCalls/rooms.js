import {fetchApi} from '../utils/dataFetching'

export async function getRooms(sid) {
  return await fetchApi(`api/rooms?sid=${sid}`, 'GET')
}

export function updateRoom(room) {
  return fetchApi(`api/rooms`, 'POST', room)
}
