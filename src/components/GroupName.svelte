<script>
import {groups} from '../store.js'

let {gid = null} = $props()

let localGroups = $state([])

groups.subscribe((value) => {
  localGroups = value
})

function findGroupItem(id) {
  return localGroups.find((group) => group.id === id)
}
</script>

<span class="badge badge-ghost h-auto" title={findGroupItem(gid)?.description}>{findGroupItem(gid)?.title || ''}</span>
