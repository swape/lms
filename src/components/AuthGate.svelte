<script>
import Login from './Login.svelte'
import {auth, currentRole, authStateReady} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
import LoadingSpinner from './LoadingSpinner.svelte'
import {getRoles} from '../apiCalls/roles.js'
import {getSchools} from '../apiCalls/schools.js'
import {user} from '../store.js'
import {saveStorage} from '../utils/localStorage.ts'

user.subscribe(async (value) => {
  if (value) {
    saveStorage('uid', $user.id)
    $authStateReady = true

    await getSchools(true)
    await getRoles($user.id, true)
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
