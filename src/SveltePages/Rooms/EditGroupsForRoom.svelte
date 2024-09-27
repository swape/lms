<script>
import {upsertGroupRoom, deleteGroupRoom} from '../../apiCalls/group-rooms.js'
// import {createEventDispatcher} from 'svelte'
// import {populateGroupRooms} from '../../services.js'
import {groups} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'
// const dispatch = createEventDispatcher()

export let room = {}

let allGroups = []
let thisRoomGroups = []
let checkedGroups = {}
let ready = false

groups.subscribe((value) => {
  if (value) {
    allGroups = [...value]
    populate()
  }
})

async function populate(reFetch = false) {
/*  await populateGroupRooms(room.id, reFetch)
    .then((res) => {
      thisRoomGroups = res

      thisRoomGroups.forEach((group) => {
        checkedGroups[group.gid] = true
      })
    })
    .finally(() => {
      ready = true
    })*/
}

let errorMessage = ''

async function changeThisGroup(event) {
  const value = parseInt(event.target.value, 10)
  const rid = room.id
  errorMessage = ''
  const foundGR = thisRoomGroups.find((group) => group.gid === value)

  if (foundGR?.id) {
    // await deleteGroupRoom(room.id, event.target.value)
    thisRoomGroups = thisRoomGroups.filter((group) => group.gid !== value)
    delete checkedGroups[value]
  } else {
   /* await upsertGroupRoom({
      gid: value,
      rid
    })*/
  }
  await populate(true)
}
</script>

<div>
  <div class="form-control w-full">
    <h2>{room.title} grupper</h2>
    <div class="form-control pt-4 overflow-auto max-h-[320px]">
      {#if ready}
        {#each allGroups as group}
          <label class="cursor-pointer label border-b">
            <input
              type="checkbox"
              class="toggle toggle-primary"
              checked={!!checkedGroups[group.id]}
              id={`gid-${group.id}`}
              name={group.title}
              value={group.id}
              on:change={changeThisGroup} />
            <span class="label-text pr-4">{group.title}</span>
          </label>
        {/each}
      {/if}
    </div>

    {#if errorMessage}
      <div class="pt-4">
        <ErrorBox message={errorMessage} />
      </div>
    {/if}
  </div>
</div>
