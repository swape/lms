<script>
import {groups, isTeacherOrAdmin, sid} from '../../store.js'
import Modal from '../../components/Modal.svelte'
import GroupList from './GroupList.svelte'
import EditGroup from './EditGroup.svelte'
import {onMount} from 'svelte'
import {populateRoomsAndGroups} from '../../services.js'

let isOpen = false
let localGroups = []

function toggleModal() {
  isOpen = !isOpen
}

onMount(() => {
  populateRoomsAndGroups($sid)
})

groups.subscribe((value) => {
  localGroups = []
  if (value) {
    localGroups = value
  }
})
</script>

<div class="flex justify-between p-4">
  <h1 class="text-3xl text-center grow">Grupper</h1>
  {#if $isTeacherOrAdmin}
    <Modal
      id="add-group"
      isOpen={isOpen}
      on:toggle={toggleModal}
      btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
      openText="add_circle">
      <EditGroup on:toggle={toggleModal} />
    </Modal>
  {/if}
</div>

{#if localGroups?.length > 0}
  <GroupList groups={localGroups} />
{/if}
