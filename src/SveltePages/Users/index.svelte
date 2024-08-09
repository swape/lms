<script>
import {roleTitles, emptyUser} from '../../constants.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'
import {testUsers} from './testUsers.ts'
import {getEnrollments} from '../../apiCalls/enroll.js'
import {currentRole} from '../../store.js'
import Icon from '../../components/Icon.svelte'

let selectedUser = emptyUser

$: activeTab = roleTitles[0]
let groupFilter = ''
let filteredUsers = []
let unregisteredUsers = []
function fetchUnregisteredUsers(){
  currentRole.subscribe((role) => {
    if (role) {
      getEnrollments(role.sid).then((res)=>{
        unregisteredUsers = res.data
      })
    }
  })
}

fetchUnregisteredUsers()

$: {
  if (activeTab) {
    filteredUsers = filterUsers(groupFilter)
  }
}
// TODO: move outside of this file
function filterUsers(inputFilter) {
  if(activeTab.id === 0){
    fetchUnregisteredUsers()
    return unregisteredUsers
  }

  return testUsers.filter((listUser) => listUser.role === activeTab.id && filterUsersWithInput(listUser, inputFilter))
}
// TODO: move outside of this file
function filterUsersWithInput(listUser, inputFilter) {
  if (groupFilter.trim() === '') {
    return true
  }

  return (
    listUser.groups.some((group) => group.toLowerCase().includes(inputFilter.toLowerCase())) ||
    listUser.name.toLowerCase().includes(inputFilter.toLowerCase())
  )
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
            <th>{activeTab.id === 0? 'E-post': 'Id' }</th>
            <th>Navn</th>
            <th>{activeTab.id === 0? 'Melding': 'Grupper' }</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {#if activeTab.id === 0}
          {#each unregisteredUsers as user}
            <tr>
              <th>{user.email}</th>
              <td>{user.name} </td>
              <td>{user.message}</td>
              <td class="flex justify-end gap-2 flex-wrap">
                <button class="btn btn-primary btn-sm" type="button"><Icon name="check"/> Godkjenn som ...</button>
                <button class="btn btn-error btn-sm" type="button"><Icon name="delete"/> Slett</button>
              </td>
            </tr>
          {/each}
        {:else}
          {#each filteredUsers as user}
            <tr>
              <th>{user.uid}</th>
              <td>{user.name}</td>
              <td>{user.groups.join(', ')}</td>
              <td class="flex justify-end gap-2 flex-wrap">
                <button class="btn btn-primary btn-sm" type="button">Rediger</button>
                <button class="btn btn-secondary btn-sm" type="button">Fravær</button>
              </td>
            </tr>
          {/each}
        {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>
