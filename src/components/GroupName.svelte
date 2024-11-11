<script>
import {groups} from '../store.js'
export let gid = null
let localGroups = []

groups.subscribe((value) => {
  localGroups = value
})

function findGroupItem(id) {
  return localGroups.find((group) => group.id === id)
}
</script>

<span class="badge badge-ghost h-auto" title={findGroupItem(gid)?.description}>{findGroupItem(gid)?.title || ''}</span>
