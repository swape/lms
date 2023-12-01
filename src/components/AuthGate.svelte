<script>
import Login from './Login.svelte'
import {auth, myRoles, user} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
export let showLogin = false

// TODO: on start check if we have token in localstorage or token is passed through url
// if so, try to login with it
// first step after token passed through url is set that token to localstorage
// then get userdata and roles trough api
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
