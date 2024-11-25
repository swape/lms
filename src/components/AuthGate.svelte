<script>
import Login from './Login.svelte'
import {auth, currentRole, authStateReady} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
import {onMount} from 'svelte'
import LoadingSpinner from './LoadingSpinner.svelte'
import {getRoles} from '../apiCalls/roles.js'
import {getSchools} from '../apiCalls/schools.js'
import {user} from '../store.js'

onMount(async () => {
  $authStateReady = true
  if ($user) {
    await getSchools(true).then(async () => {
      await getRoles($user.id, true)
    })
  }
})

user.subscribe(async (value) => {
  if (value) {
    await getSchools(true).then(async () => {
      await getRoles($user.id, true)
    })
  }
})
</script>

{#if $authStateReady}
  {#if !$auth}
    <Login />
  {:else if $currentRole}
    <slot />
  {:else}
    <RoleSelect />
  {/if}
{:else}
  <LoadingSpinner />
{/if}
