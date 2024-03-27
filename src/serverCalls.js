
import {getStorage} from './utils/localStorage.ts'

export function signOutUser() {
  // reset all localstorage data end sign out
}

export function signInWithGoogle() {
  console.log('signing in with google')
}

export function getRoles(uid) {
  // TODO: getting roles and add to myRoles based on the user's uid
}

export function getSchoolNames() {
  // TODO: getting schoold names and add to schoolNames
}

function fetchRooms(sid) {
  // TODO: fetch rooms based on the sid
}

export function getRooms(sid) {
  const rooms = getStorage(`room-${sid}`)
  if (!rooms?.data) {
    return fetchRooms(sid)
  } else {
    return rooms.data
  }
}

export function populateRoomsBasedOnCurrentRole(role) {
  if (role) {
    getRooms(role.sid).then((rooms) => {
      // TODO: fetch room_users and add to rooms
      console.log('rooms', rooms)
    })
  }
}

export async function populateRolesAndSchools(uid) {
  console.log('populateRolesAndSchools')
}
