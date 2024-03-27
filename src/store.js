import {writable} from 'svelte/store'

export const authStateReady = writable(false)
export const auth = writable(false)
export const currentPage = writable('home')
export const user = writable(null)
export const myRoles = writable(null)
export const currentRole = writable(null)
export const schoolNames = writable(null)
export const rooms = writable(null)
export const groups = writable(null)

export const menuList = writable(null)
export const currentRoom = writable(null)
