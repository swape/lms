<script>
import Login from './Login.svelte'
import {auth, currentRole, authStateReady} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
import {onMount} from 'svelte'
import {initiateFirebase} from '../serverCalls.js'

onMount(async () => {
  initiateFirebase()
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
<div>Loading <span class="loading loading-spinner"></span></div>
{/if}
