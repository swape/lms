<script>
import {upsertRoomMessage} from '../../apiCalls/roomMessages.js'
import {createEventDispatcher} from 'svelte'

export let roomId = null
const dispatch = createEventDispatcher()

export let defaultMessage = {
  title: '',
  message: '',
  dueDate: ''
}

function saveMessage() {
  let newMessage = {...defaultMessage, roomId}

  if (defaultMessage.title && defaultMessage.message) {
    upsertRoomMessage(newMessage).then(() => {
      dispatch('toggle')
    })
  }
}

// TODO: add validation and error handling
</script>

<h2 class="text-xl">{defaultMessage?.id ? 'Rediger melding' : 'Ny melding'}</h2>
<div>
  <div class="form-control w-full">
    <label class="label" for="title">
      <span class="label-text">Tittel</span>
    </label>
    <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={defaultMessage.title} />

    <label class="label" for="description">
      <span class="label-text">Beskrivelse</span>
    </label>
    <textarea
      name="description"
      class="textarea h-24 textarea-bordered textarea-primary w-full"
      bind:value={defaultMessage.message}></textarea>
  </div>

  <div>
    <label class="label" for="dueDate">
      <span class="label-text">Frist</span>
    </label>
    <input
      name="dueDate"
      type="datetime-local"
      class="input input-bordered w-full input-sm"
      bind:value={defaultMessage.dueDate} />
  </div>

  <div class="mt-5">
    <button class="btn btn-primary btn-sm" on:click={saveMessage}>Lagre</button>
  </div>
</div>
