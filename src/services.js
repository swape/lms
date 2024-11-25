import {getRoles} from './apiCalls/roles.js'
import {getSchools} from './apiCalls/schools.js'
import {getRooms} from './apiCalls/rooms.js'
import {getGroups, getGroupUserCount} from './apiCalls/groups.js'

import {myRoles, schoolNames, rooms, groups, allUsers, unregisteredUsers} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'
import {getRegisteredUsers} from './apiCalls/user.js'
import {getUnregisteredUsers} from './apiCalls/enroll.js'

export async function populateRoomsAndGroups(sid, reFetch = false) {
  /*
const roomSidName = `rooms-for-sid-${sid}`
let roomsList = getStorage(roomSidName)

if (!roomsList?.data || reFetch) {
  roomsList = await getRooms(sid)
  saveStorage(roomSidName, {data: roomsList})
} else {
  roomsList = roomsList.data
}
 rooms.set(roomsList)
*/

  const groupSidName = `groups-for-sid-${sid}`
  const storedGroups = getStorage(groupSidName)
  let groupList = []

  if (!storedGroups?.data || reFetch) {
    groupList = await getGroups(sid)
    saveStorage(groupSidName, {data: groupList})
  } else {
    groupList = storedGroups.data
  }
  groups.set(groupList)

  await getGroupUserCount(sid)
}

export async function populateUsersAndUnregisteredUsers(sid) {
  getRegisteredUsers(sid)
  getUnregisteredUsers(sid)
}
