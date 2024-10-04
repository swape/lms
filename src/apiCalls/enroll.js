import {fetchApi} from '../utils/dataFetching'

export async function getEnrollments(sid) {
  return await fetchApi(`api/enroll?sid=${sid}`, 'GET')
}

export async function getEnrollmentsFromEmail(email) {
  return await fetchApi(`api/enroll?email=${email}`, 'GET')
}

export async function insertEnrollment(enrollment) {
  return await fetchApi(`api/enroll`, 'POST', enrollment)
}

export async function getUnregisteredUsers(sid) {
  return await fetchApi(`api/enroll/unregistered?sid=${sid}`, 'GET')
}

export function deleteEnrolledUser(sid, uid) {
  return fetchApi(`api/enroll?sid=${sid}&uid=${uid}`, 'DELETE')
}

export function acceptUser(sid, uid, role) {
  return fetchApi(`api/enroll/accept?sid=${sid}&uid=${uid}&role=${role}`, 'POST')
}
