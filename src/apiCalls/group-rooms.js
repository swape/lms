import {supabaseClient} from '../supabaseConfig'

export function getGroupsForRoom(rid) {
  return supabaseClient.from('group_room').select(`id, rid, gid, groups(title)`).eq('rid', rid)
}

export function upsertGroupRoom(groupRoom) {
  return supabaseClient.from('group_room').upsert(groupRoom)
}

export function deleteGroupRoom(rid, gid) {
  return supabaseClient.from('group_room').delete().eq('rid', rid).eq('gid', gid)
}
