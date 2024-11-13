<script>
import {rooms, currentRoom, currentRole, isTeacherOrAdmin} from '../../store.js'

import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'

import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

let userRooms = []

currentRole.subscribe((value) => {
  if (value) {
    populateUserRooms($isTeacherOrAdmin)
  }
})

function populateUserRooms(forAdmin) {
  if (forAdmin) {
    userRooms = $rooms
  } else {
    // TODO filter rooms based on user/group
  }
}

let isOpen = false
function toggleModal() {
  isOpen = !isOpen
  populateUserRooms(true)
}
</script>

{#if $currentRoom}
  <Room />
{:else}
  <div class="flex justify-between p-4">
    <h1 class="text-3xl text-center grow">Klasserommene</h1>
    {#if $isTeacherOrAdmin}
      <Modal
        id="add-room"
        isOpen={isOpen}
        on:toggle={toggleModal}
        btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
        openText="add_circle">
        <EditRoom on:toggle={toggleModal} />
      </Modal>
    {/if}
  </div>

  <RoomList userRooms={userRooms} />
  {#if userRooms.length === 0 && $isTeacherOrAdmin}
    <EmptyPlaceholder message="Her kan du legge til nye klasserom" />
  {/if}
{/if}
