<script>
import {upsertRoomMessage} from '../../apiCalls/roomMessages.js'
import Button from '../../components/Button.svelte'

let {defaultMessage = {}, roomId = null, toggle = () => {}} = $props()
let localMessage = $state({...defaultMessage})

function saveMessage() {
  localMessage.dueDate = localMessage.dueDate ?? null

  let newMessage = {...localMessage, roomId}

  if (newMessage.title && newMessage.message) {
    upsertRoomMessage(newMessage).then(toggle)
  }
}
</script>

<h2 class="text-xl">{localMessage?.id ? 'Rediger melding' : 'Ny melding'}</h2>
<div>
  <div class="form-control w-full">
    <label class="label" for="title">
      <span class="label-text">Tittel</span>
    </label>
    <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={localMessage.title} />

    <label class="label" for="description">
      <span class="label-text">Beskrivelse</span>
    </label>
    <textarea
      name="description"
      class="textarea h-24 textarea-bordered textarea-primary w-full"
      bind:value={localMessage.message}></textarea>
  </div>

  <div>
    <label class="label" for="dueDate">
      <span class="label-text">Frist</span>
    </label>
    <input
      name="dueDate"
      type="datetime-local"
      class="input input-bordered w-full input-sm"
      bind:value={localMessage.dueDate} />
  </div>

  <div class="mt-5">
    <Button action={saveMessage} text="Lagre" disabled={!(localMessage.title && localMessage.message)} />
  </div>
</div>
