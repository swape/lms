import {fetchApi} from '../utils/dataFetching'

export async function getGroupsForRoom(rid) {
  return await fetchApi(`api/rooms?rid=${rid}`, 'GET')
}

export function upsertGroupRoom(groupRoom) {
  return {}
  // return supabaseClient.from('group_room').upsert(groupRoom)
}

export function deleteGroupRoom(rid, gid) {
  return {}
  // return supabaseClient.from('group_room').delete().eq('rid', rid).eq('gid', gid)
}
