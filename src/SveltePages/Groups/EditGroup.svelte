<script>
import {populateRoomsAndGroups} from '../../services.js'
import {updateGroup} from '../../apiCalls/groups.js'
import {sid} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'

let {defaultGroup = {}, toggle = () => {}} = $props()

let localGroup = $state({...defaultGroup})
let errorMessage = $state('')

function editGroup() {
  errorMessage = ''
  if (localGroup.title === '' || localGroup.description === '') {
    errorMessage = 'Fyll ut alle feltene'
    return
  }

  updateGroup({...localGroup, sid: $sid}).then((res) => {
    if (res.error) {
      errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
    } else {
      populateRoomsAndGroups($sid, true)

      toggle()
    }
  })
}
</script>

<div>
  <div class="form-control w-full">
    <div><small class="text-gray-400">ID: {localGroup.id}</small></div>
    <label class="label" for="title">
      <span class="label-text">Tittel</span>
    </label>
    <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={localGroup.title} />

    <label class="label" for="description">
      <span class="label-text">Beskrivelse</span>
    </label>
    <textarea
      name="description"
      class="textarea h-24 textarea-bordered textarea-primary w-full"
      bind:value={localGroup.description}></textarea>

    {#if errorMessage}
      <div class="pt-4">
        <ErrorBox message={errorMessage} />
      </div>
    {/if}

    <div class="mt-3">
      <button
        class="btn btn-primary btn-sm"
        onclick={editGroup}
        disabled={!(localGroup.title && localGroup.description)}>Lagre</button>
    </div>
  </div>
</div>
