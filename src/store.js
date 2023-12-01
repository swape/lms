import {writable} from 'svelte/store'

export const auth = writable(true)
export const currentPage = writable('home')
export const user = writable(null)
export const myRoles = writable(null)
export const menuList = writable(null)
export const rooms = writable(null)
export const currentRoom = writable(null)
