<script>
import {currentRoom} from '../../store.js'
import Card from '../../components/Card.svelte'
import RoomTimeList from '../../components/RoomTimeList.svelte'
import Button from '../../components/Button.svelte'

let {userRooms = []} = $props()

function selectRoom(room) {
  $currentRoom = room
}
</script>

<section class="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
  {#each userRooms as room}
    <Card title={room.title}>
      <p class="flex-1">{room.description}</p>
      <RoomTimeList roomId={room.id} />
      <div class="card-actions justify-end">
        <Button action={() => selectRoom(room)} text="Vis" />
      </div>
    </Card>
  {/each}
</section>
