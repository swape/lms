export interface NewUser {
  id: number
  name: string
  lastName: string
  email: string
  phone: string
  role: number
}

export interface User extends NewUser {
  parents: NewUser[]
}

export const user: User = {
  id: 0,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  parents: [],
  role: 1
}
