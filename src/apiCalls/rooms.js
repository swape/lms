import {supabaseClient} from '../supabaseConfig'

export function getRooms(sid) {
  return supabaseClient.from('rooms').select('*').eq('sid', sid)
}

export function updateRoom(room) {
  return supabaseClient.from('rooms').update(room).eq('id', room.id)
}

export function addRoom(room) {
  return supabaseClient.from('rooms').insert(room)
}
