import {supabase} from '../supabase.js'

export async function getRooms(sid) {
  return await supabase
    .from('rooms')
    .select('*')
    .eq('sid', sid)
    .then((res) => {
      if (res?.data?.length > 0) {
        return res.data
      }
      return []
    })
}

export function updateRoom({sid, title, description, id = null}) {
  return supabase.from('rooms').upsert({sid, title, description, id}).select()
}

export async function updateRoomGroups(roomId, groups) {
  const newGroups =
    groups?.length > 0
      ? groups.map((group) => {
          return {
            roomId,
            gid: group
          }
        })
      : []

  await supabase.from('group_room').delete().eq('roomId', roomId)
  if (newGroups.length > 0) {
    return supabase.from('group_room').insert(newGroups)
  }
}

export async function getRoomGroups(roomId) {
  return await supabase
    .from('group_room')
    .select('*')
    .eq('roomId', roomId)
    .then((res) => {
      if (res?.data?.length > 0) {
        return res.data
      }
      return []
    })
}
