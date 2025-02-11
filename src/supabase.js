import {createClient} from '@supabase/supabase-js'
import {REDIRECT_URL, SUPABASE_KEY, SUPABASE_URL} from './config.js'
import {auth, user} from './store.js'
import {getUserInfo} from './apiCalls/user.js'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export async function signInWithEmail(email) {
  const {data} = await supabase.auth.signInWithOtp({
    email,
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: true,
      emailRedirectTo: REDIRECT_URL
    }
  })
  // @ts-ignore
  if (data?.data?.user) {
    // @ts-ignore
    setUserInfo(data.data.user)
  }
}

supabase.auth.onAuthStateChange((authState) => {
  if (authState === 'SIGNED_IN') {
    auth.set(true)
    supabase.auth.getUser().then((res) => {
      if (res?.data?.user) {
        setUserInfo(res.data.user)
      }
    })
  } else {
    console.log('auth changed to: ', authState)
  }
})

function setUserInfo(userInfo) {
  userInfo.uid = userInfo.id
  getUserInfo(userInfo.uid).then((res) => {
    user.set({...res, ...userInfo, registeredPhone: res?.phone})
  })
}

export async function signOut() {
  await supabase.auth.signOut()
  localStorage.clear()
  window.location.reload()
}
