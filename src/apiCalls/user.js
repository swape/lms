import {supabase} from '../supabase.js'
import {allUsers} from '../store.js'

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

export async function saveEditedUser(data) {
  await supabase.from('user_info').update(data).eq('uid', data.uid).select()
}

export async function getUserInfo(uid) {
  const userInfo = await supabase.from('user_info').select('*').eq('uid', uid)

  return userInfo?.data?.[0] || {}
}
