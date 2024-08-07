<script>
import {currentRoom} from '../../store.js'
import TabArea from '../../components/TabArea.svelte'
import {roomSections} from '../../constants.ts'
import EditRoom from './EditRoom.svelte'
import EditGroupsForRoom from './EditGroupsForRoom.svelte'
import Modal from '../../components/Modal.svelte'
import Icon from '../../components/Icon.svelte'

let activeTab = roomSections[0]
export let isAdmin = false
export let sid = 0

let isOpen = false
let isOpenGroups = false
function toggleModal() {
  isOpen = !isOpen
}
function toggleGroupsModal() {
  isOpenGroups = !isOpenGroups
}
</script>

<section class="m-4">
  <div class="flex gap-3 items-center justify-between">
    <button type="button" class="btn btn-primary btn-circle btn-sm" on:click={() => ($currentRoom = null)}>
      <Icon name="chevron_left" />
    </button>

    <h1 class="text-3xl">{$currentRoom.title}</h1>

    {#if isAdmin}
      <div class="flex justify-end gap-3">
        <Modal
          id="edit-room"
          isOpen={isOpen}
          on:toggle={toggleModal}
          btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
          openText="edit">
          <EditRoom sid={sid} on:toggle={toggleModal} defaultRoom={$currentRoom} />
        </Modal>
        <Modal
          id="edit-groups"
          isOpen={isOpenGroups}
          on:toggle={toggleGroupsModal}
          btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
          openText="groups">
          <EditGroupsForRoom on:toggle={toggleGroupsModal} room={$currentRoom} />
        </Modal>
      </div>
    {/if}
  </div>

  <p class="p-4 ml-7">{$currentRoom.description}</p>
  <div class="mt-3">
    <TabArea bind:activeTab={activeTab} menu={roomSections} />
    {activeTab.title}
  </div>
</section>
