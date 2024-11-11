export interface RoleTitles {
  id: number
  title: string
}
export interface NewUser {
  uid?: number
  name: string
  lastName: string
  email: string
  phone: string
  groups: number[] | string[]
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
