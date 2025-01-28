<script>
import {currentRoom, isTeacherOrAdmin, rooms, usersRooms} from '../../store.js'

import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'
import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

let localUserRooms = $state([])
let isOpen = $state(false)

console.log('here', $currentRoom)

function toggleModal() {
  isOpen = !isOpen
}

isTeacherOrAdmin.subscribe((value) => {
  if (value) {
    rooms.subscribe((roomValue) => {
      if (roomValue) {
        localUserRooms = roomValue
      }
    })
  } else {
    usersRooms.subscribe((roomsValue) => {
      if (roomsValue) {
        localUserRooms = roomsValue
      }
    })
  }
})
</script>

{#if $currentRoom}
  <Room />
{:else}
  <div class="flex justify-between p-4 w-full">
    <h1 class="text-3xl text-center grow">Klasserommene er her</h1>
    {#if $isTeacherOrAdmin}
      <Modal
        id="add-room"
        isOpen={isOpen}
        toggle={toggleModal}
        btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
        openText="add_circle">
        <EditRoom toggle={toggleModal} />
      </Modal>
    {/if}
  </div>
  {#if localUserRooms.length > 0}
    <RoomList userRooms={localUserRooms} />
  {/if}

  {#if localUserRooms.length === 0}
    <EmptyPlaceholder message="Fant ingen room" />
  {/if}
{/if}
