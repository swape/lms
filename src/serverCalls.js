import {onAuthStateChanged, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import {auth, fireStoreDb} from './fireConfig'
import {collection, query, where, getDocs} from 'firebase/firestore'
import {authStateReady, auth as authStore, user, myRoles, schoolNames} from './store.js'
import {getStorage, saveStorage} from './utils/localStorage.ts'

export function initiateFirebase() {
  onAuthStateChanged(auth, (myUser) => {
    if (myUser) {
      console.log('user from on auth state changed', myUser)
      authStore.set(true)
      user.set(myUser)
      authStateReady.set(true)
    } else {
      console.log('no user from on auth state changed')
      authStateReady.set(true)
    }
  })
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  return signInWithRedirect(auth, provider)
}

export function getRoles(uid) {
  const rolesCollection = collection(fireStoreDb, 'roles')
  const roleQuery = query(rolesCollection, where('uid', '==', uid))

  return getDocs(roleQuery).then((roles) => {
    const rolesList = []
    roles.forEach((role) => {
      rolesList.push(role.data())
    })
    myRoles.set(rolesList)
    return rolesList
  })
}

// TODO: if some day there are many schools, we should get them by the user's role
export function getSchoolNames() {
  const schoolCollection = collection(fireStoreDb, 'schools')
  const allSchools = []

  return getDocs(schoolCollection).then((schoolsValue) => {
    schoolsValue.forEach((school) => {
      allSchools.push(school.data())
    })

    schoolNames.set(allSchools)
    return allSchools
  })
}

export async function populateRolesAndSchools(uid) {
  let roles = getStorage('roles')
  if (!roles?.data) {
    roles = await getRoles(uid)
    saveStorage('roles', {data: roles})
  }
  if (roles.data) {
    roles = roles.data
  }

  let schools = getStorage('schools')
  if (!schools?.data) {
    schools = await getSchoolNames()
    saveStorage('schools', {data: schools})
  }

  if (schools.data) {
    schools = schools.data
  }

  if (roles?.length > 0 && schools?.length > 0) {
    const rolesWithSchoolNames = roles.map((role) => {
      const schoolName = schools.find((s) => s?.sid === role?.sid)?.title || ''
      return {
        ...role,
        schoolName
      }
    })
    myRoles.set(rolesWithSchoolNames)
  }
}
