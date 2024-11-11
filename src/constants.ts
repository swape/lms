import type {Menu, RoleTitles, User} from './types.ts'

export const roleTitles: RoleTitles[] = [
  {
    id: 1,
    title: 'Student'
  },
  {
    id: 2,
    title: 'Foresatt'
  },
  {
    id: 3,
    title: 'Lærer'
  },
  {
    id: 4,
    title: 'Admin'
  },
  {
    id: 0,
    title: 'Uregistrert'
  }
]

export const emptyUser: User = {
  uid: undefined,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  parents: [],
  groups: []
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
    name: 'Klasserom',
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
    icon: 'groups_3',
    haveIndicator: false,
    roles: [3, 4]
  },
  {
    name: 'Brukere',
    page: 'users',
    icon: 'people',
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
