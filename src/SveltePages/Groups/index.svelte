<script>
import {groups} from '../../store.js'
import Modal from '../../components/Modal.svelte'
import {currentRole} from '../../store.js'
import GroupList from './GroupList.svelte'
import EditGroup from './EditGroup.svelte'

let isAdmin = false
let sid = 0

currentRole.subscribe((value) => {
  if (value) {
    sid = value.sid
    isAdmin = value?.level === 4
  }
})

let isOpen = false
function toggleModal() {
  isOpen = !isOpen
}
</script>

<div class="flex justify-between p-4">
  <h1 class="text-3xl text-center grow">Grupper</h1>
  {#if isAdmin}
    <Modal
      id="add-group"
      isOpen={isOpen}
      on:toggle={toggleModal}
      btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
      openText="add_circle">
      <EditGroup sid={sid} on:toggle={toggleModal} />
    </Modal>
  {/if}
</div>

{#if $groups?.length > 0}
  <GroupList groups={$groups} isAdmin={isAdmin} sid={sid} />
{/if}
