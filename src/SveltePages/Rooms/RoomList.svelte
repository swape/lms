<script>
import {currentRoom} from '../../store.js'
import Card from '../../components/Card.svelte'
let {userRooms = []} = $props()

function selectRoom(room) {
  $currentRoom = room
}
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
  {#each userRooms as room}
    <Card title={room.title}>
      <p>{room.description}</p>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" onclick={() => selectRoom(room)} type="button">Vis</button>
      </div>
    </Card>
  {/each}
</section>
