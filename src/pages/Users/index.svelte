<script>
import {roleTitles} from '../../constants.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'
import Icon from '../../components/Icon.svelte'
import {onMount} from 'svelte'
import {allUsers, unregisteredUsers, sid, isTeacherOrAdmin, currentRole} from '../../store.js'
import {filterUsers} from './helpers.ts'
import DeleteUnregisteredUser from './DeleteUnregisteredUser.svelte'
import AcceptUser from './AcceptUser.svelte'
import {populateRoomsAndGroups, populateUsersAndUnregisteredUsers} from '../../services.js'

let selectedUser = $state(null)

let activeTab = $state(roleTitles[0])
let roleFilter = $state('')
let filteredUsers = $state([])
let localUsers = $state([])
let localUnregisteredUsers = $state([])
let isOpen = $state(false)
let isOpenAccept = $state(false)
let isOpenEdit = $state(false)

onMount(() => {
  populateUsersAndUnregisteredUsers($sid)
  populateRoomsAndGroups($sid, $currentRole)
})

allUsers.subscribe((value) => {
  localUsers = value
  if (localUsers?.length > 0 && activeTab?.id) {
    filteredUsers = filterUsers(roleFilter, localUsers, activeTab.id)
  }
})

unregisteredUsers.subscribe((value) => {
  localUnregisteredUsers = value || []
})

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
  selectedUser = {...user}
  toggleEditUser()
}

function tabChange(selectedTab) {
  activeTab = selectedTab
  if (selectedTab.id === 0) {
    filteredUsers = localUnregisteredUsers
  } else {
    if (localUsers?.length > 0) {
      filteredUsers = filterUsers(roleFilter, localUsers, selectedTab.id)
    }
  }
}

$effect(() => {
  tabChange(activeTab)
})
</script>

<section class="m-4">
  <TabArea bind:activeTab={activeTab} menu={roleTitles} change={tabChange} />

  <div class="mt-3 flex justify-between">
    {#if activeTab.id !== 0}
      <div class="form-control w-full max-w-xs mb-5">
        <label class="label" for="group-filter">
          <span class="label-text">Filter</span>
        </label>
        <input
          bind:value={roleFilter}
          id="group-filter"
          type="text"
          placeholder=""
          class="input input-sm input-bordered w-full max-w-xs" />
      </div>
      <!-- not done yet
      <button class="btn btn-primary btn-sm" type="button" onclick={() => editUseModalConfirm(emptyUser)}
        ><Icon name="add" /> Ny bruker</button>

      <Modal id="add-user">
        <UserEdit user={selectedUser} />
      </Modal>
      -->
    {/if}
  </div>
  <div>
    {#if filteredUsers.length > 0}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>E-post</th>
              <th>Navn</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredUsers as user}
              <tr>
                <th class="flex gap-2 flex-col">
                  <span class="font-bold">{user.email}</span>
                  <span class="text-xs text-gray-400">{user.uid} - {user.rid || ''}</span>
                </th>
                <td>
                  <span class="font-bold">{user.name || ''}</span>
                  {#if user.message}
                    <div class="min-w-40">{user?.message || ''}</div>
                  {/if}
                </td>

                <td class="flex justify-end gap-2 flex-wrap">
                  {#if activeTab.id === 0}
                    <button class="btn btn-primary btn-sm" type="button" onclick={() => acceptUserConfirm(user)}>
                      <Icon name="check" />
                      Godkjenn som ...
                    </button>
                    <button class="btn btn-error btn-sm" type="button" onclick={() => deleteEnrolledUserConfirm(user)}>
                      <Icon name="delete" />
                      Slett
                    </button>
                  {:else}
                    <button class="btn btn-primary btn-sm" type="button" onclick={() => editUseModalConfirm(user)}
                      >Rediger
                    </button>
                    {#if user.level === 1}
                      <button class="btn btn-secondary btn-sm" type="button">Fravær</button>
                    {/if}
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</section>
{#if $isTeacherOrAdmin && selectedUser}
  {#if isOpen}
    <Modal id="userDeleteModal" isOpen={isOpen} toggle={toggleDeleteUser}>
      <DeleteUnregisteredUser user={selectedUser} toggle={toggleDeleteUser} />
    </Modal>
  {/if}
  {#if isOpenAccept}
    <Modal id="userAcceptModal" isOpen={isOpenAccept} toggle={toggleAcceptUser}>
      <AcceptUser user={selectedUser} toggle={toggleAcceptUser} />
    </Modal>
  {/if}
  {#if isOpenEdit}
    <Modal id="editUserModal" isOpen={isOpenEdit} toggle={toggleEditUser}>
      <UserEdit user={selectedUser} toggle={toggleEditUser} />
    </Modal>
  {/if}
{/if}
