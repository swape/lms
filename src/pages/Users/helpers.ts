export interface User {
  uid: number | string
  name: string
  groups: string[]
  level: number
  email?: string
  rid: number
}

export function filterUsers(inputFilter: string, list: User[], activeTabId: number) {
  if (inputFilter.trim() === '') {
    return list.filter((listUser: User) => listUser.level === activeTabId)
  }
  return list.filter((listUser: User) => listUser.level === activeTabId && filterUsersWithInput(listUser, inputFilter))
}

function filterUsersWithInput(listUser: User, inputFilter: string) {
  if (inputFilter.trim() === '') {
    return true
  }
  // TODO: filter by group names
  return (
    listUser.name.toLowerCase().includes(inputFilter.toLowerCase()) ||
    `${listUser.uid}`.toLowerCase().includes(inputFilter.toLowerCase()) ||
    `${listUser.email}`.toLowerCase().includes(inputFilter.toLowerCase())
  )
}
