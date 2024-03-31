<script>
import Modal from '../../components/Modal.svelte'
import EditGroup from './EditGroup.svelte'
export let groups = []
export let isAdmin = false
export let sid = 0

let selectedGroup = {}

function selectGroup(group) {
  selectedGroup = group
  toggleModal()
}

let isOpen = false
function toggleModal() {
  isOpen = !isOpen
}
</script>

{#if isAdmin}
  <Modal id="edit-group" isOpen={isOpen} on:toggle={toggleModal}>
    <EditGroup sid={sid} on:toggle={toggleModal} defaultGroup={selectedGroup} />
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
        {#each groups as group}
          <tr>
            <td>{group.title}</td>
            <td>{group?.users?.length || 0}</td>
            <td class="flex justify-end"
              ><button class="btn btn-primary btn-sm" on:click={() => selectGroup(group)}>Rediger</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
