<script>
import {updateRoom} from '../../apiCalls/rooms.js'
import {createEventDispatcher} from 'svelte'

import {populateRoomsAndGroups} from '../../services.js'
import {currentRoom, sid} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'

const dispatch = createEventDispatcher()

export let defaultRoom = {
  title: '',
  description: ''
}

let errorMessage = ''

function editRoom() {
  errorMessage = ''
  if (defaultRoom.title === '' || defaultRoom.description === '') {
    errorMessage = 'Fyll ut alle feltene'
    return
  }

  defaultRoom.sid = $sid
  updateRoom(defaultRoom).then((res) => {
    if (res.error) {
      errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
    } else {
      populateRoomsAndGroups(sid, true)
      dispatch('toggle')
      $currentRoom = defaultRoom
    }
  })
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

    {#if errorMessage}
      <div class="pt-4">
        <ErrorBox message={errorMessage} />
      </div>
    {/if}

    <div class="mt-3">
      <button class="btn btn-primary btn-sm" on:click={editRoom}>Lagre</button>
    </div>
  </div>
</div>
