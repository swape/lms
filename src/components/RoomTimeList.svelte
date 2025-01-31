<script>
import {onMount} from 'svelte'
import {getAllRoomTimes} from '../apiCalls/rooms.js'
import {dayStrings} from '../constants.ts'

let {roomId} = $props()
let roomTimes = $state([])

onMount(() => {
  if (roomId) {
    getAllRoomTimes(roomId).then((data) => (roomTimes = data))
  }
})
</script>

{#if roomId}
  <div>
    {#each roomTimes as time}
      <div class="text-sm">
        <span class="font-medium">{dayStrings[time.day]}:</span>
        <span>{time.time_from} - {time.time_to}</span>
      </div>
    {/each}
  </div>
{/if}
