import {supabaseClient} from '../supabaseConfig'

export function getEnrollments(sid) {
  return supabaseClient.from('enroll').select('*').eq('sid', sid)
}

export function insertEnrollment(enrollment) {
  return supabaseClient.from('enroll').insert(enrollment)
}
