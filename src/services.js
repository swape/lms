import {getRoles} from './apiCalls/roles.js'
import {getSchools} from './apiCalls/schools.js'
import {getRooms, getRoomGroups} from './apiCalls/rooms.js'
import {getGroups} from './apiCalls/groups.js'

import {myRoles, schoolNames, rooms, groups, allUsers, unregisteredUsers} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'
import {getRegisteredUsers} from './apiCalls/user.js'
import {getUnregisteredUsers} from './apiCalls/enroll.js'

export async function populateRolesAndSchools() {
  // fetching roles
  let roles = await getRoles()

  // fetching schools
  let schools = getStorage('schools')

  if (!schools?.data) {
    schools = await getSchools()
    schoolNames.set(schools)
    saveStorage('schools', {data: schools})
  } else {
    schools = schools.data
  }
  // adding school names to roles
  roles.forEach((role) => {
    role.schoolName = schools.find((school) => school.id === role.sid).title
  })
  schoolNames.set(schools)
  myRoles.set(roles)
}

export async function populateRoomsAndGroups(sid, reFetch = false) {
  const roomSidName = `rooms-for-sid-${sid}`
  const groupSidName = `groups-for-sid-${sid}`

  let roomsList = getStorage(roomSidName)
  const storedGroups = getStorage(groupSidName)

  if (!roomsList?.data || reFetch) {
    roomsList = await getRooms(sid)
    saveStorage(roomSidName, {data: roomsList})
  } else {
    roomsList = roomsList.data
  }

  rooms.set(roomsList)

  let groupList = []

  if (!storedGroups?.data || reFetch) {
    groupList = await getGroups(sid)
    saveStorage(groupSidName, {data: groupList})
  } else {
    groupList = storedGroups.data
  }

  groups.set(groupList)
}

export async function populateRoomGroups(rid, reFetch = false) {
  const groupRoomName = `groups-for-room-${rid}`

  const storedGroupsForRoom = getStorage(groupRoomName)

  let groupRoomList = []

  if (!storedGroupsForRoom?.data || reFetch) {
    groupRoomList = await getRoomGroups(rid)
    saveStorage(groupRoomName, {data: groupRoomList})
  } else {
    groupRoomList = storedGroupsForRoom.data
  }
  return groupRoomList
}

export async function populateUsersAndUnregisteredUsers(sid) {
  // fetching users
  let users = await getRegisteredUsers(sid)
  if (users) {
    allUsers.set(users)
  }
  let notRegisteredUsers = await getUnregisteredUsers(sid)
  if (notRegisteredUsers) {
    unregisteredUsers.set(notRegisteredUsers)
  }
}
