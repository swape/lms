<script>
import {auth} from '../store.js'

import {signInWithEmailOtp} from '../supabaseConfig.js'
import ErrorBox from  './ErrorBox.svelte'
import InfoBox from './InfoBox.svelte'

let email = ''
let errorMessage = null
let okMessage = null

function sigInWithEmail() {
  errorMessage = null
  okMessage = null
  if (email && email.includes('@') && email.includes('.')) {
    // TODO: maybe limit to only from specific domain
    signInWithEmailOtp(email)
      .then((res) => {
        if (res.error) {
          errorMessage = res.error.message
        } else {
          okMessage = 'Sjekk e-posten din. Du har fått en magisk lenke for å logge inn'
        }
      })
      .catch((err) => {
        errorMessage = err.message
      })
  } else {
    errorMessage = 'Er det en gyldig e-postadresse?'
  }
}
</script>

{#if !$auth}
  <main class="container mx-auto flex gap-4 justify-center flex-col items-center p-4">
    <h1 class="text-3xl p-4">LMS</h1>
    <img src="/svg/undraw_education_f8ru.svg" alt="Illustration av en person som står oppå en bok" class="w-1/2" />
    <h2 class="text-xl pb-1 pt-5">Logg inn</h2>
    <div class="max-w-md gap-4 flex flex-col w-full">
      {#if okMessage}
        <InfoBox message={okMessage} />
      {:else}
        <label class="input input-bordered flex items-center gap-2">
          <span class="material-symbols-outlined" aria-hidden="true">email</span>
          <input type="email" bind:value={email} class="w-full" />
        </label>

        <button on:click={sigInWithEmail} class="btn btn-primary">Logg inn med e-post</button>
      {/if}
      <ErrorBox message={errorMessage} />
    </div>
  </main>
{/if}
