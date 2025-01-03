<script>
import {deleteRoomTime, getAllRoomTimes, insertRoomTime} from '../apiCalls/rooms.js'
import {onMount} from 'svelte'

export let rid = 0

let day = null
let from = ''
let to = ''

let localTimes = []

onMount(() => {
  if (rid) {
    getTimeTable()
  }
})

function save() {
  if (day && from && to) {
    insertRoomTime(rid, day, from, to).then(() => {
      day = null
      from = ''
      to = ''

      getTimeTable()
    })
  }
}

function getTimeTable() {
  getAllRoomTimes(rid).then((data) => {
    localTimes = data
  })
}
const dayStrings = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag']

function dayToString(day) {
  return dayStrings[day - 1]
}

function deleteTime(id) {
  deleteRoomTime(id).then(() => {
    getTimeTable()
  })
}
</script>

<div>
  {#each localTimes as time}
    <div class="flex gap-4 justify-between items-center border-b border-gray-200 py-2">
      <div>{dayToString(time.day)}</div>
      <div>{time.time_from} - {time.time_to}</div>
      <div><button class="btn btn-sm btn-error" on:click={() => deleteTime(time.id)}>Slett</button></div>
    </div>
  {/each}
</div>

<div class="mt-5">
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label for="day">Dag</label>
      <select id="day" name="day" class="select select-primary w-full max-w-xs" bind:value={day}>
        <option value="">Velg dag</option>
        {#each Array.from({length: 7}, (_, i) => i + 1) as day}
          <option value={day}>{dayToString(day)}</option>
        {/each}
      </select>
    </div>
    <div class="flex flex-col gap-2">
      <label for="time">Fra tidspunkt</label>
      <input type="time" id="time" name="time" class="input input-bordered w-full max-w-xs" bind:value={from} />
    </div>

    <div class="flex flex-col gap-2">
      <label for="time">Til tidspunkt</label>
      <input type="time" id="time" name="time" class="input input-bordered w-full max-w-xs" bind:value={to} />
    </div>
    <button class="btn btn-secondary btn-sm" on:click={() => save()}>Legg til</button>
  </div>
</div>
