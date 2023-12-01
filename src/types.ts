export interface School {
  id: number
  name: string
  phone: string
  email: string
}

export interface Role {
  id: number
  title: string
}
export interface NewUser {
  id: number
  name: string
  lastName: string
  email: string
  phone: string
  roleId: number
  schoolId: number
}

export interface User extends NewUser {
  parents?: NewUser[]
}
