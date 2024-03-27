import {supabaseClient} from '../supabaseConfig'

export function getSchools() {
  return supabaseClient.from('schools').select('*')
}
