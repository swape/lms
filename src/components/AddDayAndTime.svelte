<script>
import {deleteRoomTime, getAllRoomTimes, insertRoomTime} from '../apiCalls/rooms.js'
import {onMount} from 'svelte'
import {dayStrings} from '../constants.ts'
import Icon from './Icon.svelte'

let {rid = 0} = $props()

let day = $state(null)
let from = $state('')
let to = $state('')

let localTimes = $state([])

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

function dayToString(day) {
  return dayStrings[day - 1]
}

function deleteTime(id) {
  deleteRoomTime(id).then(() => {
    getTimeTable()
  })
}

function checkIfFromIsBeforeTo(fromTime, toTime) {
  const fromTimeInt = parseInt(fromTime.replace(':', ''))
  const toTimeInt = parseInt(toTime.replace(':', ''))
  if (fromTimeInt && toTimeInt) {
    return fromTimeInt < toTimeInt
  }
  return true
}
</script>

<div>
  {#each localTimes as time}
    <div class="flex gap-4 justify-between items-center border-b border-gray-200 py-2">
      <div>{dayToString(time.day)}</div>
      <div>{time.time_from} - {time.time_to}</div>
      {#if !checkIfFromIsBeforeTo(time.time_from, time.time_to)}
        <div class="text-red-500 flex gap-2 justify-center"><Icon name="error" /> Ugyldig tid</div>
      {/if}
      <div><button class="btn btn-sm btn-error" onclick={() => deleteTime(time.id)}>Slett</button></div>
    </div>
  {/each}
</div>

<div class="mt-5 border-b border-gray-200 pb-5">
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

    {#if !checkIfFromIsBeforeTo(from, to)}
      <div class="text-red-500 flex gap-2 justify-center"><Icon name="error" /> Ugyldig tid</div>
    {/if}
    {#if day && from && to && checkIfFromIsBeforeTo(from, to)}
      <div class="flex gap-4">
        <button class="btn btn-secondary btn-sm" onclick={() => save()}>Legg til</button>
      </div>
    {/if}
  </div>
</div>
