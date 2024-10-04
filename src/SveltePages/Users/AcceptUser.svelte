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
    {user.uid}<br />
    {user.email}<br />{user.name}
  </p>

  <select class="select select-primary w-full max-w-xs" bind:value={selectedRole}>
    {#each roleTitles as role}
      <option value={role.id}>{role.title}</option>
    {/each}
  </select>

  <div class="flex pt-4 justify-between">
    <button class="btn btn-sm btn-ghost" on:click={() => dispatch('toggle')}>Avbryt</button>
    <button class="btn btn-primary btn-sm" on:click={acceptUserAction} disabled={!selectedRole}>Leggtil bruker</button>
  </div>
</div>
