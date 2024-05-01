import {getRoles} from './apiCalls/roles.js'
import {getSchools} from './apiCalls/schools.js'
import {getRooms} from './apiCalls/rooms.js'
import {getGroups} from './apiCalls/groups.js'
import {getGroupsForRoom} from './apiCalls/group-rooms.js'
import {myRoles, schoolNames, rooms, groups} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'

export async function populateRolesAndSchools(uid) {
  let roles = []

  // fetching roles
  await getRoles(uid).then((res) => {
    roles = res.data
  })

  // fetching schools
  let schools = getStorage('schools')
  if (!schools?.data) {
    await getSchools().then((res) => {
      schools = res.data

      schoolNames.set(res.data)
      saveStorage('schools', {data: res.data})
    })
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
  let roomsList = getStorage(`rooms-for-sid-${sid}`)

  if (!roomsList?.data || reFetch) {
    await getRooms(sid).then((res) => {
      roomsList = res.data
      saveStorage(`rooms-for-sid-${sid}`, {data: res.data})
    })
  } else {
    roomsList = roomsList.data
  }

  rooms.set(roomsList)

  let groupList = []
  const storedGroups = getStorage(`groups-for-sid-${sid}`)
  if (!storedGroups?.data || reFetch) {
    await getGroups(sid).then((res) => {
      groupList = res.data
      saveStorage(`groups-for-sid-${sid}`, {data: res.data})
    })
  } else {
    groupList = storedGroups.data
  }

  groups.set(groupList)
}

export async function populateGroupRooms(rid, reFetch = false) {
  const storedGroupsForRoom = getStorage(`groups-for-room-${rid}`)
  let groupRoomList = []
  if (!storedGroupsForRoom?.data || reFetch) {
    await getGroupsForRoom(rid).then((res) => {
      groupRoomList = res.data
      saveStorage(`groups-for-room-${rid}`, {data: res.data})
    })
  } else {
    groupRoomList = storedGroupsForRoom.data
  }
  return groupRoomList
}
