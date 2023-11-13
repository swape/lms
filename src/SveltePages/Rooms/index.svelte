<script>
import {rooms, currentRoom} from '../../store.js'
import Card from '../../components/Card.svelte'
import Room from './Room.svelte'

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
          <button class="btn btn-secondary" on:click={() => selectRoom(room)}>knappen</button>
        </div>
      </Card>
    {/each}
  </section>
{/if}
