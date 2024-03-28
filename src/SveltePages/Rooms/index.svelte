<script>
import {rooms, currentRoom, user, currentRole} from '../../store.js'
import Card from '../../components/Card.svelte'
import Room from './Room.svelte'

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

function selectRoom(room) {
  $currentRoom = room
}
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

  <section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
    {#each userRooms as room}
      <Card title={room.title}>
        <p>{room.description}</p>
        <div class="card-actions">
          <button class="btn btn-primary btn-sm" on:click={() => selectRoom(room)} type="button">knappen</button>
        </div>
      </Card>
    {/each}
  </section>
{/if}
