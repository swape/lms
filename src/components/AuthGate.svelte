<script>
import Login from './Login.svelte'
import {auth, currentRole, authStateReady} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
import LoadingSpinner from './LoadingSpinner.svelte'
import {getRoles} from '../apiCalls/roles.js'
import {getSchools} from '../apiCalls/schools.js'
import {user} from '../store.js'
import {saveStorage} from '../utils/localStorage.ts'
import {onMount} from 'svelte'

onMount(() => {
  $authStateReady = true
})

user.subscribe(async (value) => {
  if (value) {
    const uid = value.id
    saveStorage('uid', uid)
    $authStateReady = true

    await getSchools(true)
    await getRoles(uid, true)
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
