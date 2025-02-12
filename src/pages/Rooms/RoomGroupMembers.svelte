<script>
import {onMount} from 'svelte'
import {getUsersInRoom} from '../../apiCalls/rooms.js'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'
import LoadingSpinner from '../../components/LoadingSpinner.svelte'
import UserCard from '../../components/UserCard.svelte'
import GroupName from '../../components/GroupName.svelte'
import RoleName from '../../components/RoleName.svelte'
import {sid} from '../../store.js'
import {getRegisteredUsers} from '../../apiCalls/user.js'
import Card from '../../components/Card.svelte'
import Button from '../../components/Button.svelte'
import Modal from '../../components/Modal.svelte'
import RoomAbsences from './RoomAbsences.svelte'

const {roomId = null} = $props()

let localMembers = $state([])
let loading = $state(false)
let isAbsenceOpen = $state(false)
let selectedUser = $state(null)

onMount(() => {
  if (roomId) {
    getRegisteredUsers($sid)
    fetchAndPopulateMembers()
  }
})

function fetchAndPopulateMembers() {
  loading = true
  const members = {}
  getUsersInRoom(roomId).then((membersRes) => {
    membersRes.forEach((member) => {
      if (members[member.uid]) {
        members[member.uid].groups.push(member.gid)
      } else {
        members[member.role] = {
          name: member.name,
          groups: [member.gid],
          uid: member.uid,
          role: member.role,
          level: member.roles.level
        }
      }
    })
    localMembers = Object.values(members).sort((a, b) => a.level - b.level)
    loading = false
  })
}

function toggleUserAbsence(uid) {
  selectedUser = uid
  isAbsenceOpen = !isAbsenceOpen
}
</script>

<LoadingSpinner inline={true} loading={loading} />
<Modal id="user-absence" isOpen={isAbsenceOpen} toggle={() => toggleUserAbsence(null)}>
  <RoomAbsences roomId={roomId} uid={selectedUser} />
</Modal>
{#if localMembers.length === 0}
  <section class="m-8">
    <EmptyPlaceholder message="Ingen medlemmer i gruppen" />
  </section>
{/if}
{#if localMembers.length > 0}
  <section class="mt-4 flex gap-2 flex-col">
    {#each localMembers as member}
      <Card>
        <div class="flex justify-between">
          <div>
            <UserCard uid={member.uid} />

            {#each member.groups as group}
              <GroupName gid={group} />
            {/each}

            {#if member.level === 1}
              <div class="mt-4">
                <Button text="Fravær" icon="person_alert" action={() => toggleUserAbsence(member.uid)} />
              </div>
            {/if}
          </div>
          <div>
            <span class="badge h-auto badge-outline">
              <RoleName level={member.level} />
            </span>
          </div>
        </div>
      </Card>
    {/each}
  </section>
{/if}
