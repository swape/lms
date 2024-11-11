<script>
import {createEventDispatcher} from 'svelte'
import {roleTitles} from '../../constants.ts'
import {saveEditedUser} from '../../apiCalls/user.js'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
import {sid} from '../../store.js'
import GroupCheckbox from '../../components/GroupCheckbox.svelte'

export let user = null
const dispatch = createEventDispatcher()

function saveUser() {
  const saveData = {
    uid: user.uid,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    sid: $sid,
    groups: user.groups || []
  }

  saveEditedUser(saveData)
    .then(() => {
      populateUsersAndUnregisteredUsers($sid)
      dispatch('toggle')
    })
    .catch((e) => {
      // TODO show error message
      console.log(e)
    })
}

function replaceGroups(e) {
  user.groups = e.detail
}

let selectedRole = user?.role ? roleTitles.find((role) => role.id === user.role) : null

$: if (selectedRole) {
  user.role = selectedRole.id
}
</script>

{#if user}
  <div>
    <div class="form-control w-full mb-5">
      <label class="label" for="list">
        <span class="label-text">Rolle</span>
      </label>
      <select
        name="list"
        class="select select-bordered select-accent select-sm w-full max-w-xs"
        bind:value={selectedRole}>
        {#each roleTitles as role}
          <option value={role}>{role.title}</option>
        {/each}
      </select>
    </div>

    <div class="form-control w-full">
      <label class="label" for="name">
        <span class="label-text">Navn</span>
      </label>
      <input name="name" type="text" class="input input-bordered w-full input-sm" bind:value={user.name} />
    </div>

    <div class="form-control w-full">
      <label class="label" for="email">
        <span class="label-text">E-post</span>
      </label>
      <input name="email" type="email" class="input input-bordered w-full input-sm" bind:value={user.email} />
    </div>

    <div class="form-control w-full">
      <label class="label" for="phone">
        <span class="label-text">Tlf.nr.</span>
      </label>
      <input name="phone" type="tel" class="input input-bordered w-full input-sm" bind:value={user.phone} />
    </div>
    <!-- TODO: make this part scrollable and maybe in a a tab inside the modal -->
    <GroupCheckbox selectedGroups={user.groups} on:change={replaceGroups} />

    <div class="pt-5">
      <button class="btn btn-primary btn-sm" type="button" on:click={saveUser}>Lagre</button>
    </div>
  </div>
{/if}
