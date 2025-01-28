<script>
import {getRoomGroups, updateRoom, updateRoomGroups} from '../../apiCalls/rooms.js'

import {populateRoomsAndGroups} from '../../services.js'
import {currentRoom, sid, currentRole} from '../../store.js'
import ErrorBox from '../../components/ErrorBox.svelte'
import TabArea from '../../components/TabArea.svelte'
import GroupCheckbox from '../../components/GroupCheckbox.svelte'
import AddDayAndTime from '../../components/AddDayAndTime.svelte'

let {defaultRoom = {}, toggle = () => {}} = $props()
let localRoom = $state({...defaultRoom})

const TAB_GROUP_ID = 3
const TAB_ROOM_ID = 1
const TAB_TIME_ID = 2

let roomEditModalMenu = $state([{id: TAB_ROOM_ID, title: 'Rominstillinger'}])

if (localRoom.id) {
  roomEditModalMenu.push({id: TAB_GROUP_ID, title: 'Grupper'})
  roomEditModalMenu.push({id: TAB_TIME_ID, title: 'Tidspunkt'})
  getRoomGroups(localRoom.id).then((data) => {
    localRoom.groups = data.map((group) => group.gid)
  })
}

let activeTab = $state(roomEditModalMenu[0])
let errorMessage = $state('')

function editRoom() {
  errorMessage = ''
  if (localRoom.title === '' || localRoom.description === '') {
    errorMessage = 'Fyll ut alle feltene'
    return
  }

  updateRoom({...localRoom, sid: $sid}).then(async (res) => {
    if (res.error) {
      errorMessage = res.error?.message || 'Noe gikk galt, prøv igjen senere'
    } else {
      if (localRoom?.id) {
        await updateRoomGroups(localRoom.id, localRoom.groups)
      }

      await populateRoomsAndGroups($sid, $currentRole, true)
      currentRoom.set(null)

      toggle()
    }
  })
}

function replaceGroups(value) {
  localRoom.groups = [...value]
}
</script>

<TabArea
  bind:activeTab={activeTab}
  menu={roomEditModalMenu}
  change={(tab) => {
    activeTab = tab
  }} />

<div>
  {#if activeTab.id === TAB_ROOM_ID}
    <div class="form-control w-full">
      <label class="label" for="title">
        <span class="label-text">Tittel</span>
      </label>
      <input name="title" type="text" class="input input-bordered w-full input-sm" bind:value={localRoom.title} />

      <label class="label" for="description">
        <span class="label-text">Beskrivelse</span>
      </label>
      <textarea
        name="description"
        class="textarea h-24 textarea-bordered textarea-primary w-full"
        bind:value={localRoom.description}></textarea>
    </div>
  {/if}

  {#if activeTab.id === TAB_TIME_ID && localRoom.id}
    <AddDayAndTime rid={localRoom.id} />
  {/if}

  {#if activeTab.id === TAB_GROUP_ID && localRoom.id}
    <GroupCheckbox selectedGroups={localRoom.groups} change={replaceGroups} />
  {/if}

  {#if errorMessage}
    <div class="pt-4">
      <ErrorBox message={errorMessage} />
    </div>
  {/if}

  <div class="mt-5">
    <button class="btn btn-primary btn-sm" onclick={editRoom}>Lagre</button>
  </div>
</div>
