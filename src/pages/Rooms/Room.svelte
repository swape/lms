<script>
import {currentRoom, isTeacherOrAdmin} from '../../store.js'
import TabArea from '../../components/TabArea.svelte'
import {roomSections} from '../../constants.ts'
import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import Icon from '../../components/Icon.svelte'
import RoomMessages from './RoomMessages.svelte'
import RoomGroupMembers from './RoomGroupMembers.svelte'
import RoomTimeList from '../../components/RoomTimeList.svelte'

let activeTab = $state(roomSections[0])
let localRoomSection = $state([])

let isOpen = $state(false)
let isOpenGroups = $state(false)

function toggleModal() {
  isOpen = !isOpen
}
function toggleGroupsModal() {
  isOpenGroups = !isOpenGroups
}

// TODO: make this more dynamic
localRoomSection = $isTeacherOrAdmin ? roomSections : roomSections.filter((section) => section.id !== 3)
</script>

<section class="m-4">
  <div class="flex gap-3 items-center justify-between">
    <button type="button" class="btn btn-primary btn-circle btn-sm" onclick={() => ($currentRoom = null)}>
      <Icon name="chevron_left" />
    </button>

    <div>
      <h1 class="text-xl md:text-3xl" data-id={$currentRoom.id}>{$currentRoom.title}</h1>
    </div>

    <div class="flex justify-end gap-3">
      {#if $isTeacherOrAdmin}
        <Modal
          id="edit-room"
          isOpen={isOpen}
          toggle={toggleModal}
          btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
          openText="edit">
          <EditRoom toggle={toggleModal} defaultRoom={$currentRoom} />
        </Modal>
      {/if}
    </div>
  </div>

  <p class="p-4 ml-7">
    {$currentRoom.description}
    <RoomTimeList roomId={$currentRoom.id} />
  </p>

  <div class="mt-3">
    <TabArea bind:activeTab={activeTab} menu={localRoomSection} change={(changedTab) => (activeTab = changedTab)} />

    {#if activeTab.id === 1}
      <RoomMessages roomId={$currentRoom.id} />
    {/if}
    {#if activeTab.id === 2}
      Innleveringer
    {/if}
    {#if activeTab.id === 3 && $isTeacherOrAdmin}
      <RoomGroupMembers roomId={$currentRoom.id} />
    {/if}
  </div>
</section>
