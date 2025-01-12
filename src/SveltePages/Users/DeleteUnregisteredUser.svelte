<script>
import {sid} from '../../store.js'
import {deleteEnrolledUser} from '../../apiCalls/enroll.js'
import {populateUsersAndUnregisteredUsers} from '../../services.js'
let {user = null, toggle = () => {}} = $props()

function deleteUser() {
  deleteEnrolledUser($sid, user.uid)
    .then(() => {
      populateUsersAndUnregisteredUsers($sid)
      toggle()
    })
    .catch((e) => {
      // TODO show error message
      console.log(e)
    })
}
</script>

<h2 class="text-xl">Er du sikker du vil slette denne brukeren?</h2>
<div>
  <p class="pt-4">
    {user.uid}<br />
    {user.email}<br />{user.name}
  </p>
  <div class="flex pt-4 justify-between">
    <button class="btn btn-sm btn-ghost" onclick={() => toggle()}>Avbryt</button>
    <button class="btn btn-error btn-sm" onclick={deleteUser}>Slett</button>
  </div>
</div>
