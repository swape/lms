<script>
// import {createEventDispatcher} from 'svelte'
import {populateRoomGroups} from '../../services.js'
import {updateRoomGroups, deleteRoomGroups} from '../../apiCalls/rooms.js'
import {groups} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'
// const dispatch = createEventDispatcher()

export let room = {}

let allGroups = []
let thisRoomGroups = []
let checkedGroups = {}
let ready = false
let errorMessage = ''

groups.subscribe((value) => {
  if (value) {
    allGroups = [...value]
    populate()
  }
})

function populate(reFetch = false) {
  populateRoomGroups(room.id, reFetch)
    .then((res) => {
      thisRoomGroups = res

      thisRoomGroups.forEach((group) => {
        checkedGroups[group.gid] = true
      })
    })
    .finally(() => {
      ready = true
    })
}

async function changeThisGroup(event) {
  const selectedGroupID = parseInt(event.target.value, 10)
  const rid = room.id

  // TODO: check this logic later
  const foundGR = thisRoomGroups.find((group) => group.gid === selectedGroupID)

  if (foundGR?.id) {
    await updateRoomGroups({gid: selectedGroupID, rid})
  } else {
    await deleteRoomGroups(rid, selectedGroupID)
    thisRoomGroups = thisRoomGroups.filter((group) => group.gid !== selectedGroupID)
    delete checkedGroups[selectedGroupID]
  }
  populate(true)
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
