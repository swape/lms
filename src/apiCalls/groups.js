import {fetchApi} from '../utils/dataFetching'

export async function getGroups(sid) {
  return await fetchApi(`api/groups?sid=${sid}`, 'GET')
  // return supabaseClient.from('groups').select('*').eq('sid', sid)
}

export function updateGroup(group) {
  return {}
  // return supabaseClient.from('groups').update(group).eq('id', group.id)
}

export function addGroup(group) {
  return {}
  // return supabaseClient.from('groups').insert(group)
}
