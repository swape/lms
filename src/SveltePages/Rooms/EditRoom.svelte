<script>
import {updateRoom, addRoom} from '../../apiCalls/rooms.js'
import {createEventDispatcher} from 'svelte'
import {populateRoomsAndGroups} from '../../services.js'
import {currentRoom} from '../../store.js'

const dispatch = createEventDispatcher()

export let defaultRoom = {
  title: '',
  description: ''
}

export let sid = 0

function editRoom() {
  if (defaultRoom.title === '' || defaultRoom.description === '') {
    // TODO: show error message
    return
  }
  if (defaultRoom?.id) {
    updateRoom(defaultRoom).then((res) => {
      console.log(res)
      // TODO show error message
      populateRoomsAndGroups(sid, true)
      dispatch('toggle')
      $currentRoom = defaultRoom
    })
  } else {
    defaultRoom.sid = sid
    addRoom(defaultRoom).then((res) => {
      console.log(res)
      // TODO show error message
      populateRoomsAndGroups(sid, true)
      dispatch('toggle')
    })
  }
  console.log(defaultRoom)
}
</script>

<div>
  <div class="form-control w-full">
    <label class="label" for="title">
      <span class="label-text">Tittel</span>
    </label>
    <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={defaultRoom.title} />

    <label class="label" for="description">
      <span class="label-text">Beskrivelse</span>
    </label>
    <textarea
      name="description"
      class="textarea h-24 textarea-bordered textarea-primary w-full"
      bind:value={defaultRoom.description}></textarea>

    <div class="mt-3">
      <button class="btn btn-primary btn-sm" on:click={editRoom}>Lagre</button>
    </div>
  </div>
</div>
