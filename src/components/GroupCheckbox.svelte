<script>
import {groups} from '../store.js'

const {selectedGroups = [], change = () => {}} = $props()

let ready = $state(false)
let localGroups = $state([])

groups.subscribe((value) => {
  if (value) {
    localGroups = value.map((group) => {
      return {...group, checked: isSelected(group.id)}
    })
  }
  ready = true
})

function changeThisGroup(id) {
  localGroups = localGroups.map((group) => {
    if (group.id === id) {
      return {...group, checked: !group.checked}
    }
    return group
  })

  change(localGroups.filter((group) => group.checked).map((group) => group.id))
}

function isSelected(id) {
  return !!selectedGroups.find((groupID) => groupID === id)
}
</script>

{#if ready}
  {#each localGroups as group}
    <div class="form-control w-full pb-2">
      <label class="cursor-pointer">
        <input
          type="checkbox"
          id={`gid-${group.id}`}
          name={`gid-${group.id}`}
          value={group.id}
          checked={group.checked}
          onchange={() => changeThisGroup(group.id)} />
        <span class="badge">{group.title}</span>
      </label>
    </div>
  {/each}
{/if}
