<script>
import {currentRoom,isAdmin} from '../../store.js'
import Card from '../../components/Card.svelte'
// import {populateGroupRooms} from '../../services.js'
export let userRooms = []

let roomsGroups = {}

userRooms.map((room) => {
  if (room.id) {
  /*  populateGroupRooms(room.id).then((groupRooms) => {
      roomsGroups[room.id] = groupRooms
    })*/
  }
})

function selectRoom(room) {
  $currentRoom = room
}
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
  {#each userRooms as room}
    <Card title={room.title}>
      <p>{room.description}</p>
      {#if isAdmin && roomsGroups[room.id]?.length > 0}<div class="text-xs flex gap-2 flex-wrap">
          {#each roomsGroups[room.id] as group}
            <span>{group?.groups?.title}</span>
          {/each}
        </div>
      {/if}
      <div class="card-actions">
        <button class="btn btn-primary btn-sm" on:click={() => selectRoom(room)} type="button">Vis</button>
      </div>
    </Card>
  {/each}
</section>
