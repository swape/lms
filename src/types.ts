export interface School {
  id: number
  name: string
  phone: string
  email: string
}

export interface Role {
  id: number
  uid: string
  sid: string
}

export interface RoleTitles {
  id: number
  title: string
}
export interface NewUser {
  uid: number
  name: string
  lastName: string
  email: string
  phone: string
}

export interface User extends NewUser {
  parents?: NewUser[]
}

export interface Menu {
  name: string
  page: string
  icon: string
  haveIndicator: boolean
  roles: number[]
}
