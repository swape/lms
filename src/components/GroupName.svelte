<script>
import {groups} from '../store.js'

const {gid = null} = $props()

let localGroups = $state([])

groups.subscribe((value) => {
  localGroups = value
})

function findGroupItem(id) {
  return localGroups.find((group) => group.id === id)
}
</script>

<span class="badge h-auto badge-outline" title={findGroupItem(gid)?.description}
  >{findGroupItem(gid)?.title || ''}</span>
