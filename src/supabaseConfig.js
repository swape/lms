import {createClient} from '@supabase/supabase-js'
import {authStateReady, auth, user} from './store'

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
  }
}

export async function signOut() {
  const {error} = await supabaseClient.auth.signOut()
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
