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
  <main class="container mx-auto flex gap-4 justify-center flex-col items-center p-4">
    <h1 class="text-3xl p-4">LMS</h1>
    <img
      src="/svg/undraw_education_f8ru.svg"
      alt="Illustration av en person som står over en bok"
      class="w-1/2 max-w-md" />

    <div class="max-w-[400px] w-full">
      <label>
        <span>E-post: </span>
        <input bind:value={email} class="input input-bordered w-full {haveError ? 'input-error' : ''}" type="email" />
      </label>
      <button class="btn btn-primary mt-4 w-full" onclick={login}>Logg inn</button>
    </div>
  </main>
{:else}
  <div class="container mx-auto flex gap-4 justify-center flex-col items-center p-4 text-2xl">
    Sjekk e-posten for innlogginslenke
  </div>
{/if}
