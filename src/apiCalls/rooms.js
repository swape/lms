import {supabase} from '../supabase.js'
import {getStorage, saveStorage} from '../utils/localStorage.ts'

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
  if (id) {
    return supabase.from('rooms').upsert({sid, title, description, id}).select()
  } else {
    return supabase.from('rooms').upsert({sid, title, description}).select()
  }
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

export async function insertRoomTime(roomId, day, from, to) {
  return supabase.from('room_time').insert({room_id: roomId, day, time_from: from, time_to: to}).select()
}

export async function getAllRoomTimes(roomId, force = false) {
  const roomTimeName = `room-time-${roomId}`
  const cachedTime = getStorage(roomTimeName)

  if (cachedTime?.length && !force) {
    return cachedTime
  }
  return await supabase
    .from('room_time')
    .select('*')
    .eq('room_id', roomId)
    .then((res) => {
      if (res?.data?.length > 0) {
        saveStorage(roomTimeName, res.data)
        return res.data
      }
      return []
    })
}

export async function deleteRoomTime(id) {
  return supabase.from('room_time').delete().eq('id', id).select()
}

export async function getUsersInRoom(roomId) {
  return await supabase
    .from('users_groups_rooms')
    .select('*, roles (level)')
    .eq('roomId', roomId)
    .then((res) => {
      if (res?.data?.length > 0) {
        return res.data
      }
      return []
    })
}

export async function getUsersRooms(uid, role) {
  // cache this data
  return await supabase
    .from('users_groups_rooms')
    .select('*')
    .eq('uid', uid)
    .eq('role', role)
    .then((res) => {
      if (res?.data?.length > 0) {
        return res.data
      }
      return []
    })
}
