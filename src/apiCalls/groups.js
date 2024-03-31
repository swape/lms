import {supabaseClient} from '../supabaseConfig'

export function getGroups(sid) {
  return supabaseClient.from('groups').select('*').eq('sid', sid)
}

export function updateGroup(group) {
  return supabaseClient.from('groups').update(group).eq('id', group.id)
}

export function addGroup(group) {
  return supabaseClient.from('groups').insert(group)
}
