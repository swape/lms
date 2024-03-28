import {createClient} from '@supabase/supabase-js'
import {authStateReady, auth, user} from './store'
import {resetAllStorage} from './utils/localStorage'

const supabaseUrl = import.meta.env.PUBLIC_PROJECT_URL
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY
export const supabaseClient = createClient(supabaseUrl, supabaseKey)

export function initiateAuthListener() {
  const {data} = supabaseClient.auth.onAuthStateChange((event, session) => {
    //console.log(event, session)

    if (event === 'INITIAL_SESSION') {
      // handle initial session
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
      storeUserAndAuth(session)
    } else if (event === 'SIGNED_OUT') {
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      // handle user updated event
    }

    authStateReady.set(true)
  })
}

function storeUserAndAuth(session) {
  if (session) {
    auth.set(session)
    user.set({
      uid: session.user.id,
      email: session.user.email
    })
    upsertUserInDb(session.user.id, session.user.email)
  }
}

async function upsertUserInDb(uid, email) {
  if (!uid || !email) {
    return
  }
  await supabaseClient
    .from('user_info')
    .select('*')
    .eq('uid', uid)
    .then(async (res) => {
      if (res.error || res.data.length === 0) {
        await supabaseClient.from('user_info').upsert({uid, email}).select()
      } else {
        user.set({uid: res.data[0].uid, email: res.data[0].email, name: res.data[0].name, phone: res.data[0].phone})
      }
    })
}

export async function signOut() {
  await supabaseClient.auth.signOut()
  resetAllStorage()
}

export async function signInWithEmailOtp(email) {
  const {data, error} = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true
      // emailRedirectTo: 'https://example.com/welcome',
    }
  })
  return {data, error}
}
