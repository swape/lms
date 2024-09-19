<script>
import {auth, user} from '../store.js'

import '@passageidentity/passage-elements/passage-auth'
import {onMount} from 'svelte'
import {fetchUserAuth} from '../utils/dataFetching.js'

auth.set(true)
user.set({uid: 1, email: 'swape@swape.net'})

onMount(() => {
  fetchUserAuth()
})
</script>

{#if !$auth}
  <main class="container mx-auto flex gap-4 justify-center flex-col items-center p-4">
    <h1 class="text-3xl p-4">LMS</h1>
    <img
      src="/svg/undraw_education_f8ru.svg"
      alt="Illustration av en person som står over en bok"
      class="w-1/2 max-w-md" />

    <passage-auth app-id={LOGIN_API}></passage-auth>
  </main>
{/if}
