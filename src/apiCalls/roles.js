import {supabase} from '../supabase.js'
import {myRoles} from '../store.js'
import {getStorage, saveStorage} from '../utils/localStorage.ts'

export async function getRoles(uid, reFetch = false) {
  const rolesName = `roles-for-uid-${uid}`
  let rolesList = getStorage(rolesName)
  let localRoles = []

  if (reFetch || !rolesList) {
    await supabase
      .from('roles')
      .select('*')
      .eq('uid', uid)
      .then((res) => {
        if (res.error) {
          console.log('error', res.error)
          localRoles = []
        } else if (res.data.length === 0) {
          localRoles = []
        } else {
          localRoles = res.data.sort((a, b) => a.level - b.level)
        }
      })
    saveStorage(rolesName, {data: localRoles})
  } else {
    localRoles = rolesList.data
  }
  myRoles.set(localRoles)
  return localRoles
}

export async function updateRole(rid, level) {
  await supabase.from('roles').update({level}).eq('id', rid).select()
}
