import {supabase} from '../supabase.js'
import {allUsers} from '../store.js'

export function getUserInfo() {}

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

export function deleteUser(sid, uid) {}

export async function saveEditedUser(data) {
  await supabase.from('user_info').update(data).eq('uid', data.uid).select()
}
