<script>
import {signInWithEmail} from '../supabase.js'

let email = $state(null)
let haveError = $state(false)
let showLogin = $state(true)

function checkIfValid(inputEmail) {
  if (inputEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(inputEmail)
  }
  return false
}

async function login() {
  haveError = false
  if (checkIfValid(email)) {
    showLogin = false
    await signInWithEmail(email)
  } else {
    haveError = true
  }
}
</script>

{#if showLogin}
  <div class="max-w-auto flex flex-col gap-4 items-center mt-4">
    <h1 class="text-2xl">LMS</h1>
    <img src="/svg/undraw_education_f8ru.svg" class="max-w-90" alt="Illustration av en person som står over en bok" />

    <div class="flex flex-col gap-4 items-center">
      <label>
        <span>E-post: </span>
        <input class="input {haveError ? 'input-error' : ''} " bind:value={email} type="email" />
      </label>
      <button onclick={login} class="btn btn-primary">Logg inn</button>
    </div>
  </div>
{:else}
  <div class="feedback">Sjekk e-posten for innlogginslenke</div>
{/if}
