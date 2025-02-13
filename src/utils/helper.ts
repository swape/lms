import {roleTitles} from '../constants.ts'
import {getStorage} from './localStorage.ts'

export function getLevelTitle(level: number) {
  return roleTitles.find((role) => role.id === level)?.title
}

export function getSchoolName(sid: string) {
  const schools = getStorage('schools')?.data
  if (schools?.length) {
    return schools.find(({id}: {id: string}) => id === sid)?.title || ''
  }
  return ''
}

export function calculateMinutes(from: string, to: string) {
  const fromTime = from.split(':')
  const toTime = to.split(':')

  const fromMinutes = parseInt(fromTime[0]) * 60 + parseInt(fromTime[1])
  const toMinutes = parseInt(toTime[0]) * 60 + parseInt(toTime[1])

  return toMinutes - fromMinutes
}
