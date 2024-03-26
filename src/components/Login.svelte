<script>
import {auth} from '../store.js'
import {signInWithGoogle} from '../serverCalls.js'

function googleLogin() {
  signInWithGoogle()
}
</script>

{#if !$auth}
  <section class="container mx-auto">
    <div class="text-3xl py-4">Login page</div>
    <button class="btn btn-primary" on:click={googleLogin}>Login with Google</button>
  </section>
{/if}
