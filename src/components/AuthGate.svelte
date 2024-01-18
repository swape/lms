<script>
import Login from './Login.svelte'
import {auth, myRoles, user} from '../store.js'
import RoleSelect from './RoleSelect.svelte'
export let showLogin = false
export let url = null

if(url){
  const queryString = url;

  if(queryString) {
    const urlParams = new URLSearchParams(queryString);
    const magicLink = urlParams.get('psg_magic_link')
    if(magicLink) {
      localStorage.setItem('psg_magic_link', magicLink)

      $auth = true
    }
  }
}

const testRoles = [
  {role: 4, name: 'Admin', uid: 'swape', school: 'Høgskolen i Østfold'},
  {role: 1, name: 'Elev', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'Far til Aurora', uid: 'swape', school: 'barneskolen'},
  {role: 2, name: 'Far til Noah', uid: 'swape', school: 'en ungdomskole'},
  {role: 3, name: 'Lærer', uid: 'swape', school: 'ungdomsskolen som har et langt navn'}
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

