import {supabase} from '../supabase.js'

export function getAbsencesForUser(userId) {
  return supabase.from('absence').select('*').eq('uid', userId)
}

export function insertAbsence(absence) {
  return supabase.from('absence').insert(absence)
}

export function deleteAbsence(absenceId) {
  return supabase.from('absence').delete().eq('id', absenceId)
}

export function updateAbsence(absenceId, absence) {
  return supabase.from('absence').update(absence).eq('id', absenceId)
}

export function getAbsenceForRoom(roomId) {
  return supabase.from('absence').select('*').eq('roomId', roomId)
}
