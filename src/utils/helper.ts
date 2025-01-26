import {roleTitles} from '../constants.ts'
import {getStorage} from './localStorage.ts'

export function getLevelTitle(level: number) {
  return roleTitles.find((role) => role.id === level)?.title
}

export function getSchoolName(sid: string) {
  let schools = getStorage('schools')?.data
  if (schools?.length) {
    return schools.find(({id}: {id: string}) => id === sid)?.title || ''
  }
  return ''
}
