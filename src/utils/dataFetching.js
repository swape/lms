import {Passage} from '@passageidentity/passage-js'
import {LOGIN_API, API_URL} from '../config.js'
import {getUserInfo} from '../apiCalls/user.js'

import {authStateReady, user, auth} from '../store.js'

const passage = new Passage(LOGIN_API)

export async function fetchUserAuth() {
  const userP = passage.currentUser
  return await userP
    .userInfo()
    .then(async (userRes) => {
      if (userRes) {
        const additionalInfo = await getUserInfo(userRes.id)
        // console.log(additionalInfo)
        const combinedUserData = {
          email: userRes.email,
          uid: userRes.id,
          lastLoginAt: userRes.lastLoginAt,
          name: additionalInfo.name,
          phone: additionalInfo.phone
        }
        // TODO save to backend if not already saved
        auth.set(true)
        user.set(combinedUserData)
        return combinedUserData
      }
    })
    .catch((err) => {
      console.log('wow some error happened', err)
    })
    .finally(() => {
      authStateReady.set(true)
    })
}
export async function fetchApi(path, method = 'GET', body = null) {
  const passageToken = localStorage.getItem('psg_auth_token') ?? null

  return await fetch(`${API_URL}${path}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {Authorization: `Bearer ${passageToken}`, 'Content-Type': 'application/json'}
  })
    .then((res) => {
      if (res.status === 401) {
        auth.set(false)
        user.set(null)
        return null
      }

      return res.json()
    })
    .catch((e) => {
      console.log('e ...', e)
    })
}
