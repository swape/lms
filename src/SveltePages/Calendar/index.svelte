<script>
import {rooms} from '../../store.js'
import DateCard from '../../components/DateCard.svelte'
import {infos} from './testInfo.ts'

let roomsList = []

rooms.subscribe((value) => {
  if (value && value.length > 0) {
    roomsList = [...value]
  }
})

function getRoomName(id) {
  return roomsList.find((room) => room?.id === id)?.title || ''
}
</script>

<section class="m-4 flex gap-3 flex-col">
  {#each infos as info}
    <div class="bg-white p-3 rounded-md">
      <div class="flex justify-between">
        <div class="p-3">
          <h2 class="text-xl mb-3">{`${getRoomName(info.roomId)}: ${info.title}`}</h2>
          <p>{info.description}</p>
          <div class="mt-8"><button class="btn btn-sm btn-accent">Les mer</button></div>
        </div>
        <div class="flex flex-col text-center">
          <div class="text-sm">Frist:</div>
          <DateCard date={info.dueDate} />
        </div>
      </div>
    </div>
  {/each}
</section>
