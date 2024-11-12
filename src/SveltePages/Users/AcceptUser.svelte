<script>
import {createEventDispatcher} from 'svelte'
import {sid} from '../../store.js'
import {acceptUser} from '../../apiCalls/enroll.js'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
import {roleTitles} from '../../constants.ts'
export let user = null
const dispatch = createEventDispatcher()
let selectedRole = null

function acceptUserAction() {
  acceptUser($sid, user.uid, selectedRole)
    .then(() => {
      populateUsersAndUnregisteredUsers($sid)
      dispatch('toggle')
    })
    .catch((e) => {
      // TODO show error message
      console.log(e)
    })
}
</script>

<h2 class="text-xl">Hva er brukerens rolle?</h2>
<div>
  <p class="py-4">
    <small class="text-sm">ID: {user.uid}</small><br /><br />
    <span class="text-md">{user.email}<br />{user.name}</span>
  </p>

  <select class="select select-bordered select-accent select-sm w-full max-w-xs" bind:value={selectedRole}>
    {#each roleTitles as role}
      <option value={role.id}>{role.title}</option>
    {/each}
  </select>

  <div class="flex pt-5 justify-between">
    <button class="btn btn-sm btn-ghost" on:click={() => dispatch('toggle')}>Avbryt</button>
    <button class="btn btn-primary btn-sm" on:click={acceptUserAction} disabled={!selectedRole}>Leggtil bruker</button>
  </div>
</div>
