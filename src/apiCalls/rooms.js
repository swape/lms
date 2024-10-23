import {fetchApi} from '../utils/dataFetching'

export async function getRooms(sid) {
  return await fetchApi(`api/rooms?sid=${sid}`, 'GET')
}

export async function getRoomGroups(rid) {
  return await fetchApi(`api/room-groups?rid=${rid}`, 'GET')
}

export async function updateRoomGroups(groupObject) {
  return await fetchApi(`api/room-groups`, 'POST', groupObject)
}

export async function deleteRoomGroups(rid, group) {
  return await fetchApi(`api/room-groups?rid=${rid}&gid=${group}`, 'DELETE')
}

export function updateRoom(room) {
  return fetchApi(`api/rooms`, 'POST', room)
}
