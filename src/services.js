import {getRooms, getUsersRooms} from './apiCalls/rooms.js'
import {getGroups, getGroupUserCount} from './apiCalls/groups.js'
import {rooms, groups, usersRooms} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'
import {getRegisteredUsers} from './apiCalls/user.js'
import {getUnregisteredUsers} from './apiCalls/enroll.js'

export async function populateRoomsAndGroups(sid, role, reFetch = false) {
  const roomSidName = `rooms-for-sid-${sid}`
  let roomsList = getStorage(roomSidName)
  const groupSidName = `groups-for-sid-${sid}`
  const storedGroups = getStorage(groupSidName, 60 * 24)
  let groupList = []

  if (reFetch || !roomsList) {
    rooms.set([])
    roomsList = await getRooms(sid)
    saveStorage(roomSidName, roomsList)
  }
  rooms.set(roomsList)

  if (reFetch || !storedGroups?.length) {
    groups.set([])
    groupList = await getGroups(sid)
    saveStorage(groupSidName, groupList)
  } else {
    groupList = storedGroups
  }
  groups.set(groupList)
  await getGroupUserCount(sid)

  if (role) {
    const usersRoomsName = `users-rooms-${role.id}`
    let usersRoomsList = getStorage(usersRoomsName, 60 * 24)
    // getUsersRooms
    if (reFetch || !usersRoomsList) {
      usersRooms.set([])
      const uid = role.uid
      let usersRoomsData = await getUsersRooms(uid, role.id)
      if (usersRoomsData && usersRoomsData.length > 0) {
        const roomIds = usersRoomsData.map((item) => item.roomId)
        const filteredRooms = roomsList.filter((room) => roomIds.includes(room.id))
        saveStorage(usersRoomsName, filteredRooms)
      }
    }
    usersRooms.set(usersRoomsList)
  }
}

export async function populateUsersAndUnregisteredUsers(sid) {
  getRegisteredUsers(sid)
  getUnregisteredUsers(sid)
}
