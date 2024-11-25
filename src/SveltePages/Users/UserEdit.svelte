<script>
import {createEventDispatcher, onMount} from 'svelte'
import {roleTitles} from '../../constants.ts'
import {saveEditedUser} from '../../apiCalls/user.js'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
import {sid, currentRole} from '../../store.js'
import GroupCheckbox from '../../components/GroupCheckbox.svelte'
import TabArea from '../../components/TabArea.svelte'
import {getGroupsForUser, updateUserGroups} from '../../apiCalls/groups.js'
import {updateRole} from '../../apiCalls/roles.js'

// TODO: move to constants
const userEditModalMenu = [
  {id: 0, title: 'Informasjon'},
  {id: 1, title: 'Rolle'},
  {id: 2, title: 'Grupper'}
]

let activeTab = userEditModalMenu[0]

export let user = null
let localUserGroups = []

onMount(async () => {
  localUserGroups = []
  const fetchedGroups = await getGroupsForUser(user.rid)
  localUserGroups = fetchedGroups.map((group) => group.gid)
})

const dispatch = createEventDispatcher()

async function saveUser() {
  await saveEditedUser({uid: user.uid, name: user.name, phone: user.phone})
  await updateRole(user.rid, user.level)
  await updateUserGroups(user.rid, user.groups || [], user.uid)
  await populateUsersAndUnregisteredUsers($sid)
  dispatch('toggle')
}

function replaceGroups(e) {
  user.groups = e.detail
}

let selectedRole = user?.level ? roleTitles.find((role) => role.id === user.level) : null

$: if (selectedRole) {
  user.level = selectedRole.id
}
</script>

{#if user}
  <div>
    <TabArea bind:activeTab={activeTab} menu={userEditModalMenu} />

    {#if activeTab.id === 0}
      <div class="form-control w-full">
        <label class="label" for="name">
          <span class="label-text">Navn</span>
        </label>
        <input name="name" type="text" class="input input-bordered w-full input-sm" bind:value={user.name} />
      </div>

      {#if !user.rid}
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text">E-post</span>
          </label>
          <input name="email" type="email" class="input input-bordered w-full input-sm" bind:value={user.email} />
        </div>
      {:else}
        <div class="py-3">{user.email}</div>
      {/if}
      <div class="form-control w-full">
        <label class="label" for="phone">
          <span class="label-text">Tlf.nr.</span>
        </label>
        <input name="phone" type="tel" class="input input-bordered w-full input-sm" bind:value={user.phone} />
      </div>
    {/if}

    {#if activeTab.id === 1}
      {#if $currentRole.uid === user.uid}
        <div class="py-3">Du kan ikke endre din egen rolle</div>
      {:else}
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
      {/if}
    {/if}

    {#if activeTab.id === 2}
      <GroupCheckbox selectedGroups={localUserGroups} on:change={replaceGroups} />
    {/if}

    <div class="pt-5">
      <button class="btn btn-primary btn-sm" type="button" on:click={saveUser}>Lagre</button>
    </div>
  </div>
{/if}
