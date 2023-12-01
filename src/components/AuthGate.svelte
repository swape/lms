<script>
import Login from './Login.svelte'
import {auth, myRoles, user} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
export let showLogin = false

const testRoles = [
  {role: 4, name: 'Ali admin', uid: 'swape', school: 'Høgskolen i Østfold'},
  {role: 1, name: 'a elev', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'foreldre 1 Aurora', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'foreldre 2 Noah', uid: 'swape', school: 'ungdomskole'},
  {role: 3, name: 'a lærer', uid: 'swape', school: 'ungdomsskolen'}
]

auth.subscribe((value) => {
  if (value) {
    myRoles.set(testRoles)
  }
})

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
