<script>
import {rooms, currentRoom, isTeacherOrAdmin} from '../../store.js'

import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'
import {isAdmin, user} from '../../store.js'
import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

import {getUsersRooms} from '../../apiCalls/rooms.js'

let userRooms = $state([])

rooms.subscribe((value) => {
  userRooms = []
  if (value) {
    if ($isAdmin) {
      userRooms = value
    } else {
      getUsersRooms($user.uid).then((rooms) => {
        const allUserRoomIDs = [...new Set(rooms.map((room) => room.roomId))]
        userRooms = value.filter((room) => allUserRoomIDs.includes(room.id))
      })
    }
  }
})

let isOpen = $state(false)

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
        toggle={toggleModal}
        btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
        openText="add_circle">
        <EditRoom toggle={toggleModal} />
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
