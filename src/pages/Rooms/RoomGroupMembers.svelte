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

let {roomId = null} = $props()

let localMembers = $state([])
let loading = $state(false)

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
    localMembers = Object.values(members)
    loading = false
  })
}
</script>

<LoadingSpinner inline={true} loading={loading} />
{#if localMembers.length === 0}
  <section class="m-8">
    <EmptyPlaceholder message="Ingen medlemmer i gruppen" />
  </section>
{/if}
{#if localMembers.length > 0}
  <section class="mt-4 flex gap-3 flex-col">
    {#each localMembers as member}
      <div class="bg-white p-3 rounded-md">
        <div class="flex justify-between">
          <div class="p-3">
            <UserCard uid={member.uid} />
            {#each member.groups as group}
              <GroupName gid={group} />
            {/each}
          </div>
          <div>
            <span class="badge badge-ghost h-auto">
              <RoleName level={member.level} />
            </span>
          </div>
        </div>
      </div>
    {/each}
  </section>
{/if}
