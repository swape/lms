import {fetchApi} from '../utils/dataFetching'

export async function getGroups(sid) {
  return await fetchApi(`api/groups?sid=${sid}`, 'GET')
  // return supabaseClient.from('groups').select('*').eq('sid', sid)
}

export function updateGroup(group) {
  return fetchApi(`api/groups`, 'POST', group)
}
