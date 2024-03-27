import {supabaseClient} from '../supabaseConfig'

export function getRooms(sid) {
  return supabaseClient.from('rooms').select('*').eq('sid', sid)
}
