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
  <main>
    <h1>LMS</h1>
    <img src="/svg/undraw_education_f8ru.svg" alt="Illustration av en person som står over en bok" />

    <div class="login-form">
      <label>
        <span>E-post: </span>
        <input bind:value={email} class={haveError ? 'input-error' : ''} type="email" />
      </label>
      <button onclick={login}>Logg inn</button>
    </div>
  </main>
{:else}
  <div class="feedback">Sjekk e-posten for innlogginslenke</div>
{/if}

<style>
img {
  width: 100%;
  max-width: 200px;
}

.login-form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.feedback {
  padding: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .login-form {
    flex-direction: column;
    align-items: end;
    width: 90svw;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  input,
  label,
  button {
    width: 100%;
  }
}
</style>
