import {supabase} from '../supabase.js'
import {schoolNames} from '../store.js'
import {getStorage, saveStorage} from '../utils/localStorage.ts'

export async function getSchools(fetch = false) {
  let schools = getStorage('schools', 60 * 24 * 7)

  if (fetch || !schools) {
    await supabase
      .from('schools')
      .select('*')
      .then(async (res) => {
        if (res?.data?.length > 0) {
          await schoolNames.set(res.data)
          schools = res.data
        }
      })
    saveStorage('schools', schools)
  }
  return schools
}
