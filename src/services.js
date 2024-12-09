import {getRooms} from './apiCalls/rooms.js'
import {getGroups, getGroupUserCount} from './apiCalls/groups.js'

import {rooms, groups} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'
import {getRegisteredUsers} from './apiCalls/user.js'
import {getUnregisteredUsers} from './apiCalls/enroll.js'

export async function populateRoomsAndGroups(sid, reFetch = false) {
  const roomSidName = `rooms-for-sid-${sid}`
  let roomsList = getStorage(roomSidName)
  const groupSidName = `groups-for-sid-${sid}`
  const storedGroups = getStorage(groupSidName)
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
}

export async function populateUsersAndUnregisteredUsers(sid) {
  getRegisteredUsers(sid)
  getUnregisteredUsers(sid)
}
