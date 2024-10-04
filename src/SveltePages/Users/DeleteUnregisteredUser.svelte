<script>
import {createEventDispatcher} from 'svelte'
import {sid} from '../../store.js'
import {deleteEnrolledUser} from '../../apiCalls/enroll.js'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
export let user = null
const dispatch = createEventDispatcher()

function deleteUser() {
  deleteEnrolledUser($sid, user.uid)
    .then(() => {
      populateUsersAndUnregisteredUsers()
      dispatch('toggle')
    })
    .catch((e) => {
      // TODO show error message
      console.log(e)
    })
}
</script>

<h2>Er du sikker du vil slette denne brukeren?</h2>
<div>
  <p class="pt-4">
    {user.uid}<br />
    {user.email}<br />{user.name}
  </p>
  <div class="flex pt-4 justify-between">
    <button class="btn btn-sm btn-ghost" on:click={() => dispatch('toggle')}>Avbryt</button>
    <button class="btn btn-primary btn-sm" on:click={deleteUser}>Slett</button>
  </div>
</div>
