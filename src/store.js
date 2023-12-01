import {writable} from 'svelte/store'

export const auth = writable(true)
export const currentPage = writable('home')
export const user = writable(null)

const testRoles = [
  {role: 4, name: 'Ali admin', uid: 'swape', school: 'Høgskolen i Østfold'},
  {role: 1, name: 'a elev', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'foreldre 1 Aurora', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'foreldre 2 Noah', uid: 'swape', school: 'ungdomskole'},
  {role: 3, name: 'a lærer', uid: 'swape', school: 'ungdomsskolen'}
]
export const myRoles = writable(testRoles)

const testMenuList = [
  {
    name: 'Hjem',
    page: 'home',
    icon: 'home',
    haveIndicator: false
  },
  {
    name: 'Meldinger',
    page: 'chat',
    icon: 'chat',
    haveIndicator: true
  },
  {
    name: 'Rom',
    page: 'rooms',
    icon: 'menu_book',
    haveIndicator: false
  },
  {
    name: 'Kalender',
    page: 'calendar',
    icon: 'calendar_month',
    haveIndicator: false
  },
  {
    name: 'Grupper',
    page: 'groups',
    icon: 'group',
    haveIndicator: false
  },
  {
    name: 'Instillinger',
    page: 'settings',
    icon: 'settings',
    haveIndicator: false
  }
]
export const menuList = writable(testMenuList)

const testRooms = [
  {
    id: 1,
    title: 'Matte',
    description: '1 + 1 = 2 og slikt'
  },
  {
    id: 2,
    title: 'Gym',
    description: 'wax on wax off'
  },
  {
    id: 3,
    title: 'Norsk',
    description: 'Hei på deg'
  },
  {
    id: 4,
    title: 'Engelsk',
    description: 'Hello there'
  },
  {
    id: 5,
    title: 'Fransk',
    description: 'Bonjour'
  }
]

export const rooms = writable(testRooms)

export const currentRoom = writable(null)
