import {supabaseClient} from '../supabaseConfig'

export function getGroups(sid) {
  return supabaseClient.from('groups').select('*').eq('sid', sid)
}
