import {roleTitles} from '../constants.ts'

export function getLevelTitle(level: number) {
  return roleTitles.find((role) => role.id === level)?.title
}
