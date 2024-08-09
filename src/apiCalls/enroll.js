import {supabaseClient} from '../supabaseConfig'

export function getEnrollments(sid) {
  return supabaseClient.from('enroll').select('*').eq('sid', sid)
}

export function getEnrollmentsFromEmail(email) {
  return supabaseClient.from('enroll').select('*').eq('email', email)
}

export function insertEnrollment(enrollment) {
  return supabaseClient.from('enroll').insert(enrollment)
}
