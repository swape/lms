<script>
import {user, myRoles, currentRole, isTeacherOrAdmin, usersRooms, currentPage, currentRoom} from '../store.js'
import Card from '../components/Card.svelte'
import RoleName from '../components/RoleName.svelte'
import {getSchoolName} from '../utils/helper.ts'
import Button from '../components/Button.svelte'
import {getRoomMessagesFromRoomArray} from '../apiCalls/roomMessages.js'
import {isOldDueDate} from '../utils/date.ts'
import RoomMessageCard from './Rooms/RoomMessageCard.svelte'

let messages = $state([])
let localRooms = $state([])

function resetRole() {
  $currentRole = null
}

usersRooms.subscribe((value) => {
  if (value) {
    localRooms = value
    const roomsList = value.map((room) => room.id)
    getRoomMessagesFromRoomArray(roomsList).then((data) => {
      messages = data.filter((message) => !isOldDueDate(message.dueDate || new Date()))
    })
  }
})

function getRoomName(roomId) {
  const room = localRooms.find((room) => room.id === roomId)
  return room?.title || ''
}

function gotoRoom(roomId) {
  const room = localRooms.find((room) => room.id === roomId)

  currentRoom.set(room)
  $currentPage = 'rooms'
}
</script>

{#if $user?.uid}
  <section>
    <h1 class="text-3xl text-center">{getSchoolName($currentRole?.sid)}</h1>
    {#if $myRoles?.length > 1}
      <Card title={`Hei ${$user.name || $user.email || ''}`}>
        {#if $isTeacherOrAdmin}<p>
            Du er logget inn som:
            <RoleName level={$currentRole?.level} />
          </p>
        {/if}
        <div class="mt-4">
          <Button action={resetRole} icon="supervisor_account" text="Bytt rolle" classList="btn-primary" />
        </div>
      </Card>
    {/if}

    {#if $currentRole.level === 1 || $currentRole.level === 2}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {#each messages as message}
          <RoomMessageCard localMessage={message}>
            <Button text={getRoomName(message.roomId)} action={() => gotoRoom(message.roomId)} />
          </RoomMessageCard>
        {/each}
      </div>
    {/if}
  </section>
{/if}
