<script>
import {roles, emptyUser} from '../../constants.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'

let selectedUser = emptyUser
const testUsers = [
  {
    id: 1,
    name: 'Cy Ganderton',
    groups: ['Klasse2A', 'Matte2A', 'Norsk2A'],
    list: 1
  },
  {
    id: 2,
    name: 'Hart Hagerty',
    groups: ['Klasse2A', 'Matte2A', 'Norsk2A'],
    list: 1
  },
  {
    id: 3,
    name: 'Brice Swyre',
    groups: ['Klasse2A', 'Matte2A', 'Norsk2A'],
    list: 2
  },
  {
    id: 4,
    name: 'Dorolice Duffill',
    groups: ['Klasse2A', 'Matte2A', 'Norsk2A'],
    list: 3
  },
  {
    id: 5,
    name: 'Georgeanna Girodias',
    groups: ['Klasse2A', 'Matte2A', 'Norsk2A'],
    list: 4
  }
]
$: activeTab = roles[0]
let groupFilter = ''
let filteredUsers = []

$: {
  if (activeTab) {
    filteredUsers = filterUsers(groupFilter)
  }
}
function filterUsers(inputFilter) {
  return testUsers.filter((listUser) => listUser.list === activeTab.id && filterUsersWithInput(listUser, inputFilter))
}
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

<div></div>
<section class="m-4">
  <TabArea bind:activeTab={activeTab} menu={roles} />

  <div class="mt-3 flex justify-between">
    <div class="form-control w-full max-w-xs">
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
  </div>

  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Navn</th>
            <th>Grupper</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredUsers as user}
            <tr>
              <th>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.groups.join(', ')}</td>
              <td class="flex justify-end gap-2">
                <button class="btn btn-primary btn-sm" type="button">Rediger</button>
                <button class="btn btn-secondary btn-sm" type="button">Fravær</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
