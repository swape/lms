import {supabase} from '../supabase.js'
import {groupUserCount} from '../store.js'

export async function getGroups(sid) {
  return await supabase
    .from('groups')
    .select('id, sid, title, description')
    .eq('sid', sid)
    .then((res) => {
      // @ts-ignore
      if (res?.data?.length > 0) {
        return res.data
      }
      return []
    })
}

export async function updateGroup(group) {
  return supabase.from('groups').upsert(group).select()
}

export async function updateUserGroups(rid, groups, uid) {
  const newGroups = groups.map((group) => {
    return {
      uid,
      rid,
      gid: group
    }
  })

  await supabase.from('user_group').delete().eq('rid', rid)
  if (newGroups.length > 0) {
    await supabase.from('user_group').insert(newGroups)
  }
}

export function getGroupsForUser(rid) {
  return new Promise((resolve, reject) => {
    supabase
      .from('user_group')
      .select('*')
      .eq('rid', rid)
      .then((res) => {
        if (res.error) {
          reject(res.error)
        } else {
          resolve(res.data || [])
        }
      })
  })
}

export async function getGroupUserCount(sid) {
  return await supabase
    .from('group_user_count')
    .select('*')
    .eq('sid', sid)
    .then((res) => {
      // @ts-ignore
      if (res?.data?.length > 0) {
        // @ts-ignore
        groupUserCount.set(res.data)
        return res.data
      }
      return []
    })
}
