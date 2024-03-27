<script>
import Login from './Login.svelte'
import {auth, currentRole, authStateReady} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
import {onMount} from 'svelte'
import LoadingSpinner from './LoadingSpinner.svelte'
import {initiateAuthListener} from '../supabaseConfig.js'

onMount(async () => {
  initiateAuthListener()
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
