import {writable} from 'svelte/store'

// common stores
export const authStateReady = writable(false)
export const auth = writable(false)
export const schoolNames = writable(null)
export const isAdmin = writable(false)
export const isTeacherOrAdmin = writable(false)
export const sid = writable(null)
export const currentPage = writable('home')
export const menuList = writable(null)

// user stores
export const user = writable(null)
export const myRoles = writable(null)
export const currentRole = writable(null)

// room stores
export const rooms = writable(null)
export const usersRooms = writable(null)
export const currentRoom = writable(null)

// teacher or admin stores
export const groups = writable(null)
export const groupUserCount = writable(null)

// admin stores
export const allUsers = writable(null)
export const unregisteredUsers = writable(null)

currentRole.subscribe((value) => {
  if (value) {
    sid.set(value.sid)
    isAdmin.set(value.level === 4)
    isTeacherOrAdmin.set(value.level > 2)
  }
})
