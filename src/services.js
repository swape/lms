import {getRoles} from './apiCalls/roles.js'
import {getSchools} from './apiCalls/schools.js'
import {getRooms} from './apiCalls/rooms.js'
import {getGroups} from './apiCalls/groups.js'
import {getGroupsForRoom} from './apiCalls/group-rooms.js'
import {myRoles, schoolNames, rooms, groups} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'

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

export async function populateGroupRooms(rid, reFetch = false) {
  const groupRoomName = `groups-for-room-${rid}`

  const storedGroupsForRoom = getStorage(groupRoomName)

  let groupRoomList = []

  if (!storedGroupsForRoom?.data || reFetch) {
    groupRoomList = await getGroupsForRoom(rid)
    saveStorage(groupRoomName, {data: groupRoomList})
  } else {
    groupRoomList = storedGroupsForRoom.data
  }
  return groupRoomList
}
