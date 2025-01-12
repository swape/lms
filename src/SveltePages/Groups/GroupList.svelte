<script>
import Modal from '../../components/Modal.svelte'
import EditGroup from './EditGroup.svelte'
import {isTeacherOrAdmin, groupUserCount} from '../../store.js'
let {groups = []} = $props()
let localGroups = $state(groups)
let selectedGroup = $state({})

function selectGroup(group) {
  selectedGroup = {...group}
  toggleModal()
}

let isOpen = $state(false)

function toggleModal() {
  isOpen = !isOpen
}

let localGroupUserCount = $state([])

groupUserCount.subscribe((value) => {
  if (value) {
    localGroupUserCount = value
  }
})

function getUserCount(gid) {
  return localGroupUserCount.find((group) => group.gid === gid)?.count || 0
}
</script>

{#if $isTeacherOrAdmin}
  <Modal id="edit-group" isOpen={isOpen} toggle={toggleModal}>
    <EditGroup toggle={toggleModal} defaultGroup={selectedGroup} />
  </Modal>
{/if}

<section class="m-4">
  <div class="overflow-x-auto">
    <table class="table bg-white">
      <thead>
        <tr>
          <th>Gruppenavn</th>
          <th>Antall brukere</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {#each localGroups as group}
          <tr>
            <td>{group.title}</td>
            <td>{getUserCount(group.id)}</td>
            <td class="flex justify-end">
              <button class="btn btn-primary btn-sm" onclick={() => selectGroup(group)}>Rediger</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
