<script>
import {getRoomGroups, updateRoom, updateRoomGroups} from '../../apiCalls/rooms.js'
import {createEventDispatcher} from 'svelte'
import {populateRoomsAndGroups} from '../../services.js'
import {currentRoom, sid} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'
import TabArea from '../../components/TabArea.svelte'
import GroupCheckbox from '../../components/GroupCheckbox.svelte'
import AddDayAndTime from '../../components/AddDayAndTime.svelte'

const dispatch = createEventDispatcher()

export let defaultRoom = {
  title: '',
  description: '',
  groups: []
}

const TAB_GROUP_ID = 3
const TAB_ROOM_ID = 1
const TAB_TIME_ID = 2

let roomEditModalMenu = [
  {id: TAB_ROOM_ID, title: 'Rominstillinger'},
  {id: TAB_TIME_ID, title: 'Tidspunkt'}
]

if (defaultRoom.id) {
  roomEditModalMenu.push({id: TAB_GROUP_ID, title: 'Grupper'})
  getRoomGroups(defaultRoom.id).then((data) => {
    defaultRoom.groups = data.map((group) => group.gid)
  })
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
  {#if activeTab.id === TAB_ROOM_ID}
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

  {#if activeTab.id === TAB_TIME_ID && defaultRoom.id}
    <AddDayAndTime rid={defaultRoom.id} />
  {/if}

  {#if activeTab.id === TAB_GROUP_ID && defaultRoom.id}
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
