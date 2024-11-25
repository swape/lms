import {fetchApi} from '../utils/dataFetching'
import {supabase} from '../supabase.js'
import {allUsers} from '../store.js'

export function getUserInfo() {
  // return fetchApi(`api/user`, 'GET')
}

export function getRegisteredUsers(sid) {
  supabase
    .from('users_roles')
    .select('*')
    .eq('sid', sid)
    .then((res) => {
      if (res?.data?.length > 0) {
        allUsers.set(res.data)
      }
    })
}

export function deleteUser(sid, uid) {
  // return fetchApi(`api/user?sid=${sid}&uid=${uid}`, 'DELETE')
}

export async function saveEditedUser(data) {
  await supabase.from('user_info').update(data).eq('uid', data.uid).select()
}
