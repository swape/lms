<script>
import {rooms, currentRoom, currentRole} from '../../store.js'

import EditRoom from './EditRoom.svelte'
import Modal from '../../components/Modal.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'

import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

let isAdmin = false
let userRooms = []
let sid = 0

currentRole.subscribe((value) => {
  if (value) {
    sid = value.sid
    populateUserRooms(value?.level === 4)
  }
})

function populateUserRooms(forAdmin) {
  if (forAdmin) {
    isAdmin = true
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
  <Room isAdmin={isAdmin} sid={sid} />
{:else}
  <div class="flex justify-between p-4">
    <h1 class="text-3xl text-center grow">Klasserommene</h1>
    {#if isAdmin}
      <Modal
        id="add-room"
        isOpen={isOpen}
        on:toggle={toggleModal}
        btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
        openText="add_circle">
        <EditRoom sid={sid} on:toggle={toggleModal} />
      </Modal>
    {/if}
  </div>

  <RoomList userRooms={userRooms} isAdmin={isAdmin} />
  {#if userRooms.length === 0 && isAdmin}
    <EmptyPlaceholder message="Her kan du legge til nye klasserom" />
  {/if}
{/if}
