import type {Role, User} from './types.ts'

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

export const user: User = {
  id: 0,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  parents: [],
  roleId: 0,
  schoolId: 0
}
