<script>
import {createEventDispatcher} from 'svelte'
import {populateRoomsAndGroups} from '../../services.js'
import {updateGroup, addGroup} from '../../apiCalls/groups.js'

import ErrorBox from '../../components/ErrorBox.svelte'

const dispatch = createEventDispatcher()

export let defaultGroup = {
  title: '',
  description: ''
}

export let sid = 0
let errorMessage = ''

function editGroup() {
  errorMessage = ''
  if (defaultGroup.title === '' || defaultGroup.description === '') {
    errorMessage = 'Fyll ut alle feltene'
    return
  }
  if (defaultGroup?.id) {
    updateGroup(defaultGroup).then((res) => {
      if (res.error) {
        errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
      } else {
        populateRoomsAndGroups(sid, true)
        dispatch('toggle')
      }
    })
  } else {
    defaultGroup.sid = sid
    addGroup(defaultGroup).then((res) => {
      if (res.error) {
        errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
      } else {
        populateRoomsAndGroups(sid, true)
        dispatch('toggle')
      }
    })
  }
}
</script>

<div>
  <div class="form-control w-full">
    <label class="label" for="title">
      <span class="label-text">Tittel</span>
    </label>
    <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={defaultGroup.title} />

    <label class="label" for="description">
      <span class="label-text">Beskrivelse</span>
    </label>
    <textarea
      name="description"
      class="textarea h-24 textarea-bordered textarea-primary w-full"
      bind:value={defaultGroup.description}></textarea>

    {#if errorMessage}
      <div class="pt-4">
        <ErrorBox message={errorMessage} />
      </div>
    {/if}

    <div class="mt-3">
      <button class="btn btn-primary btn-sm" on:click={editGroup}>Lagre</button>
    </div>
  </div>
</div>
