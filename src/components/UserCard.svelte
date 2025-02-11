<script>
import {allUsers} from '../store.js'

const {uid} = $props()
let localUsers = $state([])

allUsers.subscribe((value) => {
  if (value) {
    localUsers = value
  }
})

function findUser(id) {
  return localUsers.find((user) => user?.uid === id) || {}
}
</script>

<div>{findUser(uid).name || uid}</div>
