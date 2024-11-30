<script>
import {updateRoom, updateRoomGroups} from '../../apiCalls/rooms.js'
import {createEventDispatcher} from 'svelte'
import {populateRoomsAndGroups} from '../../services.js'
import {currentRoom, sid} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'
import TabArea from '../../components/TabArea.svelte'
import GroupCheckbox from '../../components/GroupCheckbox.svelte'

const dispatch = createEventDispatcher()

export let defaultRoom = {
  title: '',
  description: '',
  groups: []
}

let roomEditModalMenu = [{id: 1, title: 'Rominstillinger'}]

if (defaultRoom.id) {
  roomEditModalMenu.push({id: 2, title: 'Grupper'})
}

let activeTab = roomEditModalMenu[0]
let errorMessage = ''

function editRoom() {
  errorMessage = ''
  if (defaultRoom.title === '' || defaultRoom.description === '') {
    errorMessage = 'Fyll ut alle feltene'
    return
  }

  defaultRoom.sid = $sid
  updateRoom(defaultRoom).then(async (res) => {
    if (res.error) {
      errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
    } else {
      if (defaultRoom?.id) {
        await updateRoomGroups(defaultRoom.id, defaultRoom.groups)
      }

      await populateRoomsAndGroups($sid, true)
      currentRoom.set(null)
      dispatch('toggle')
    }
  })
}
function replaceGroups({detail}) {
  defaultRoom.groups = [...detail]
}
</script>

<TabArea bind:activeTab={activeTab} menu={roomEditModalMenu} />

<div>
  {#if activeTab.id === 1}
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
    </div>
  {/if}

  {#if activeTab.id === 2 && defaultRoom.id}
    <GroupCheckbox selectedGroups={defaultRoom.groups} on:change={replaceGroups} />
  {/if}

  {#if errorMessage}
    <div class="pt-4">
      <ErrorBox message={errorMessage} />
    </div>
  {/if}

  <div class="mt-5">
    <button class="btn btn-primary btn-sm" on:click={editRoom}>Lagre</button>
  </div>
</div>
