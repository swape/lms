<script>
import {rooms, currentRoom, isTeacherOrAdmin} from '../../store.js'

import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'

import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

let userRooms = []

rooms.subscribe((value) => {
  userRooms = []
  if (value) {
    if ($isTeacherOrAdmin) {
      userRooms = value
    } else {
      // TODO: filter rooms based on user/group
    }
  }
})

let isOpen = false

function toggleModal() {
  isOpen = !isOpen
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
  {#if userRooms.length > 0}
    <RoomList userRooms={userRooms} />
  {/if}

  {#if userRooms.length === 0}
    <EmptyPlaceholder message="Fant ingen room" />
  {/if}
{/if}
