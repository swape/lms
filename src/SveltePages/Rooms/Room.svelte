<script>
import {currentRoom} from '../../store.js'
import TabArea from '../../components/TabArea.svelte'
import {roomSections} from '../../constants.ts'
import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'

let activeTab = roomSections[0]
export let isAdmin = false
export let sid = 0

let isOpen = false
function toggleModal() {
  isOpen = !isOpen
}
</script>

<section class="m-4">
  <div class="flex gap-3 items-center justify-between">
    <button type="button" class="btn btn-primary btn-circle btn-sm" on:click={() => ($currentRoom = null)}>
      <span class="material-symbols-outlined">chevron_left</span>
    </button>

    <h1 class="text-3xl">{$currentRoom.title}</h1>

    {#if isAdmin}
      <Modal
        id="edit-room"
        isOpen={isOpen}
        on:toggle={toggleModal}
        btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
        openText="edit">
        <EditRoom sid={sid} on:toggle={toggleModal} defaultRoom={$currentRoom} />
      </Modal>
    {/if}
  </div>

  <p class="p-4 ml-7">{$currentRoom.description}</p>
  <div class="mt-3">
    <TabArea bind:activeTab={activeTab} menu={roomSections} />
    {activeTab.title}
  </div>
</section>
