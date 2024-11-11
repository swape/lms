<script>
import {roleTitles, emptyUser} from '../../constants.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'
import Icon from '../../components/Icon.svelte'
import {onMount} from 'svelte'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
import {allUsers, unregisteredUsers, isAdmin, sid} from '../../store.js'
import {filterUsers} from './helpers.ts'
import DeleteUnregisteredUser from './DeleteUnregisteredUser.svelte'
import AcceptUser from './AcceptUser.svelte'
import GroupNames from '../../components/GroupNames.svelte'

let selectedUser = null

$: activeTab = roleTitles[0]
let groupFilter = ''
let filteredUsers = []
let localUsers = []
let localUnregisteredUsers = []

onMount(() => {
  populateUsersAndUnregisteredUsers($sid)
})

allUsers.subscribe((value) => {
  localUsers = value
  if (localUsers?.length > 0 && activeTab?.id) {
    filteredUsers = filterUsers(groupFilter, localUsers, activeTab.id)
  }
})

unregisteredUsers.subscribe((value) => {
  localUnregisteredUsers = value || []
})

$: {
  if (localUsers?.length > 0 && activeTab?.id && activeTab.id !== 0) {
    filteredUsers = filterUsers(groupFilter, localUsers, activeTab.id)
  }
  if (activeTab.id === 0) {
    filteredUsers = localUnregisteredUsers
  }
}

let isOpen = false
let isOpenAccept = false
let isOpenEdit = false

function toggleEditUser() {
  isOpenEdit = !isOpenEdit
}

function toggleDeleteUser() {
  isOpen = !isOpen
}

function toggleAcceptUser() {
  isOpenAccept = !isOpenAccept
}

function deleteEnrolledUserConfirm(user) {
  selectedUser = user
  toggleDeleteUser()
}

function acceptUserConfirm(user) {
  selectedUser = user
  toggleAcceptUser()
}

function editUseModalConfirm(user) {
  selectedUser = user
  toggleEditUser()
}
</script>

<section class="m-4">
  <TabArea bind:activeTab={activeTab} menu={roleTitles} />

  <div class="mt-3 flex justify-between">
    {#if activeTab.id !== 0}
      <div class="form-control w-full max-w-xs mb-5">
        <label class="label" for="group-filter">
          <span class="label-text">Filter</span>
        </label>
        <input
          bind:value={groupFilter}
          id="group-filter"
          type="text"
          placeholder=""
          class="input input-sm input-bordered w-full max-w-xs" />
      </div>

      <Modal id="add-user" btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined" openText="add_circle">
        <UserEdit user={selectedUser} />
      </Modal>
    {/if}
  </div>
  <div>
    <div class="overflow-x-auto">
      <table class="table bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>E-post</th>
            <th>Navn</th>
            <th>{activeTab.id === 0 ? 'Melding' : 'Grupper'}</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredUsers as user}
            <tr>
              <th>{user.uid}</th>
              <th>{user.email}</th>
              <td>{user.name}</td>
              <td>
                {#if user.groups?.length}<GroupNames groups={user.groups} />{/if}
                {#if user.message}<div class="min-w-40">{user?.message || ''}</div>{/if}</td>
              <td class="flex justify-end gap-2 flex-wrap">
                {#if activeTab.id === 0}
                  <button class="btn btn-primary btn-sm" type="button" on:click={() => acceptUserConfirm(user)}
                    ><Icon name="check" /> Godkjenn som ...</button>
                  <button class="btn btn-error btn-sm" type="button" on:click={() => deleteEnrolledUserConfirm(user)}
                    ><Icon name="delete" /> Slett</button>
                {:else}
                  <button class="btn btn-primary btn-sm" type="button" on:click={() => editUseModalConfirm(user)}
                    >Rediger</button>
                  <button class="btn btn-secondary btn-sm" type="button">Fravær</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
{#if isAdmin && selectedUser}
  {#if isOpen}
    <Modal id="userDeleteModal" isOpen={isOpen} on:toggle={toggleDeleteUser}>
      <DeleteUnregisteredUser user={selectedUser} on:toggle={toggleDeleteUser} />
    </Modal>
  {/if}
  {#if isOpenAccept}
    <Modal id="userAcceptModal" isOpen={isOpenAccept} on:toggle={toggleAcceptUser}>
      <AcceptUser user={selectedUser} on:toggle={toggleAcceptUser} />
    </Modal>
  {/if}
  {#if isOpenEdit}
    <Modal id="editUserModal" isOpen={isOpenEdit} on:toggle={toggleEditUser}>
      <UserEdit user={selectedUser} on:toggle={toggleEditUser} />
    </Modal>
  {/if}
{/if}
