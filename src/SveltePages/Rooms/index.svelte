<script>
import {rooms, currentRoom, currentRole} from '../../store.js'

import Room from './Room.svelte'
import RoomList from './RoomList.svelte'

let isAdmin = false
let userRooms = []

currentRole.subscribe((value) => {
  if (value?.level === 4) {
    isAdmin = true
    userRooms = $rooms
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
      <div class="">
        <button class="btn btn-circle btn-primary btn-sm">+</button>
      </div>
    {/if}
  </div>

  <RoomList userRooms={userRooms} />
{/if}
