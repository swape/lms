import {supabaseClient} from '../supabaseConfig.js'

export function getRoles(uid) {
  return supabaseClient.from('roles').select('*').eq('uid', uid)
}
