import { writable } from 'svelte/store'

export const auth = writable(true)
export const currentPage = writable('home')
export const user = writable(null)


const testRoles = [
  {role: 'admin', name:'Ali admin', username: 'swape', school: 'Høgskolen i Østfold', fullName: 'Ali admin'},
  {role: 'student', name:'a elev', username: 'swape' ,school: 'barneskolen', fullName: 'Ali elev'},
  {role: 'parent', name:'foreldre 1 Aurora', username: 'swape' ,school: 'barneskolen', fullName: 'Ali foreldre 1'},
  {role: 'parent', name:'foreldre 2 Noah', username: 'swape' ,school: 'ungdomskole', fullName: 'Ali foreldre 2'},
  {role:'teacher', name:'a lærer', username: 'swape', school: 'ungdomsskolen', fullName: 'Ali lærer'}
]
export const roles = writable(testRoles)

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
    page: 'calender',
    icon: 'calendar_month',
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
  title: 'Matte',
  description: '1 + 1 = 2 og slikt'
  },
  {
    title: 'Gym',
    description: 'wax on wax off'
  },
  {
    title: 'Norsk',
    description: 'Hei på deg'
  },
  {
    title: 'Engelsk',
    description: 'Hello there'
  },
  {
    title: 'Fransk',
    description: 'Bonjour'
  }
]

export const rooms = writable(testRooms)