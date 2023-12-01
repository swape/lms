<script>
import {rooms, currentRoom, user} from '../../store.js'
import Card from '../../components/Card.svelte'
import Room from './Room.svelte'

const testRooms = [
  {
    id: 1,
    title: 'Matte',
    description: '1 + 1 = 2 og slikt'
  },
  {
    id: 2,
    title: 'Gym',
    description: 'wax on wax off'
  },
  {
    id: 3,
    title: 'Norsk',
    description: 'Hei på deg'
  },
  {
    id: 4,
    title: 'Engelsk',
    description: 'Hello there'
  },
  {
    id: 5,
    title: 'Fransk',
    description: 'Bonjour'
  }
]

user.subscribe((value) => {
  if (value) {
    rooms.set(testRooms)
  }
})
function selectRoom(room) {
  $currentRoom = room
}
</script>

{#if $currentRoom}
  <Room />
{:else}
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
    {#each $rooms as room}
      <Card title={room.title}>
        <p>{room.description}</p>
        <div class="card-actions">
          <button class="btn btn-primary btn-sm" on:click={() => selectRoom(room)} type="button">knappen</button>
        </div>
      </Card>
    {/each}
  </section>
{/if}
