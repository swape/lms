import type {Menu, Role, User} from './types.ts'

export const roles: Role[] = [
  {
    id: 1,
    title: 'Studenter'
  },
  {
    id: 2,
    title: 'Foresatte'
  },
  {
    id: 3,
    title: 'Lærere'
  },
  {
    id: 4,
    title: 'Admin'
  }
]

export const emptyUser: User = {
  id: 0,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  parents: [],
  roleId: 0,
  schoolId: 0
}

export const defaultMenu: Menu[] = [
  {
    name: 'Hjem',
    page: 'home',
    icon: 'home',
    haveIndicator: false,
    roles: [1, 2, 3, 4]
  },
  {
    name: 'Meldinger',
    page: 'chat',
    icon: 'chat',
    haveIndicator: true,
    roles: [1, 2, 3, 4]
  },
  {
    name: 'Rom',
    page: 'rooms',
    icon: 'menu_book',
    haveIndicator: false,
    roles: [1, 2, 3, 4]
  },
  {
    name: 'Kalender',
    page: 'calendar',
    icon: 'calendar_month',
    haveIndicator: false,
    roles: [1, 2, 3, 4]
  },
  {
    name: 'Grupper',
    page: 'groups',
    icon: 'group',
    haveIndicator: false,
    roles: [3, 4]
  },
  {
    name: 'Instillinger',
    page: 'settings',
    icon: 'settings',
    haveIndicator: false,
    roles: [4]
  }
]

export const roomSections = [
  {
    id: 1,
    title: 'Meldinger'
  },
  {
    id: 2,
    title: 'Innleveringer'
  },
  {
    id: 3,
    title: 'Medlemmer'
  }
]
