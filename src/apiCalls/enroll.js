import {supabase} from '../supabase.js'
import {unregisteredUsers} from '../store.js'

export async function getEnrollmentsFromEmail(email) {
  return new Promise((resolve, reject) => {
    supabase
      .from('enroll')
      .select('*')
      .eq('email', email)
      .then((res) => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res.data)
        }
      })
  })
}

export async function insertEnrollment(enrollment) {
  return new Promise((resolve, reject) => {
    supabase
      .from('enroll')
      .insert(enrollment)
      .then((res) => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res.data)
        }
      })
  })
}

export function getUnregisteredUsers(sid) {
  supabase
    .from('enroll')
    .select('*')
    .eq('sid', sid)
    .then((res) => {
      // @ts-ignore
      if (res.data?.length > 0) {
        // @ts-ignore
        unregisteredUsers.set(res.data)
      }
    })
}

export function deleteEnrolledUser(sid, uid) {
  return supabase.from('enroll').delete().eq('sid', sid).eq('uid', uid)
}

export async function acceptUser(sid, uid, level) {
  return new Promise((resolve) => {
    supabase
      .from('roles')
      .insert({sid, uid, level})
      .then((res) => {
        if (!res.error) {
          deleteEnrolledUser(sid, uid).then(() => {
            resolve(res.data)
          })
        }
      })
  })
}
