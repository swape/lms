import {supabase} from '../supabase.js'
import {schoolNames} from '../store.js'
import {getStorage, saveStorage} from '../utils/localStorage.ts'

export async function getSchools(fetch = false) {
  let schools = getStorage('schools')

  if (fetch || !schools) {
    await supabase
      .from('schools')
      .select('*')
      .then((res) => {
        if (res?.data?.length > 0) {
          schoolNames.set(res.data)
          schools = res.data
        }
      })
    saveStorage('schools', {data: schools})
  } else {
    schools = schools.data
  }
  return schools
}
