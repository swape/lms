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
  if (value?.level === 4) {
    isAdmin = true
    userRooms = $rooms
    sid = value.sid
  } else {
    // TODO filter rooms based on user/group
  }
})
</script>

{#if $currentRoom}
  <Room />
{:else}
  <div class="flex justify-between p-4">
    <h1 class="text-3xl text-center grow">Klasseromene</h1>
    {#if isAdmin}
      <Modal id="add-user" btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined" openText="add_circle">
        <EditRoom sid={sid} />
      </Modal>
    {/if}
  </div>

  <RoomList userRooms={userRooms} />
  {#if userRooms.length === 0 && isAdmin}
    <EmptyPlaceholder message="Her kan du legge til nye klasserom" />
  {/if}
{/if}
