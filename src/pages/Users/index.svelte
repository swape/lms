<script>
import {roleTitles} from '../../constants.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'
import {onMount} from 'svelte'
import {allUsers, unregisteredUsers, sid, isTeacherOrAdmin, currentRole} from '../../store.js'
import {filterUsers} from './helpers.ts'
import DeleteUnregisteredUser from './DeleteUnregisteredUser.svelte'
import AcceptUser from './AcceptUser.svelte'
import {populateRoomsAndGroups, populateUsersAndUnregisteredUsers} from '../../services.js'
import Button from '../../components/Button.svelte'
import UserAbsencesOverview from './UserAbsencesOverview.svelte'

let selectedUser = $state(null)

let activeTab = $state(roleTitles[0])
let roleFilter = $state('')
let filteredUsers = $state([])
let localUsers = $state([])
let localUnregisteredUsers = $state([])
let isOpen = $state(false)
let isOpenAccept = $state(false)
let isOpenEdit = $state(false)
let isAbsenceOverviewOpen = $state(false)

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

function toggleUserAbsenceOverview(uid) {
  selectedUser = uid
  isAbsenceOverviewOpen = !isAbsenceOverviewOpen
}

$effect(() => {
  tabChange(activeTab)
})
</script>

<Modal id="user-absence-overview" isOpen={isAbsenceOverviewOpen} toggle={() => toggleUserAbsenceOverview(null)}>
  <UserAbsencesOverview uid={selectedUser} close={() => toggleUserAbsenceOverview(null)} />
</Modal>

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
      <Button action={() => editUseModalConfirm(emptyUser)} text="Ny bruker" icon="add" />
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
                    <Button action={() => acceptUserConfirm(user)} text="Godkjenn som ..." icon="check" />
                    <Button action={() => deleteEnrolledUserConfirm(user)} text="Slett" icon="delete" />
                  {:else}
                    <Button action={() => editUseModalConfirm(user)} text="Rediger" icon="add" />

                    {#if user.level === 1}
                      <Button
                        text="Fraværoversikt"
                        icon="person_alert"
                        action={() => toggleUserAbsenceOverview(user.uid)} />
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
