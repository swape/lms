import {fetchApi} from '../utils/dataFetching'

export async function getRooms(sid) {
  return await fetchApi(`api/rooms?sid=${sid}`, 'GET')
}

export function updateRoom(room) {
  return {}
  // return supabaseClient.from('rooms').update(room).eq('id', room.id)
}

export function addRoom(room) {
  return {}
  // return supabaseClient.from('rooms').insert(room)
}
