<script>
import Login from './Login.svelte'
import {auth, roles, user} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
export let showLogin = false
</script>

{#if $auth}
  {#if $user}
    <slot />
  {:else if showLogin}
    <RoleSelect />
  {/if}
{:else if showLogin}
  <Login />
{/if}
