<script>
import {auth} from '../store.js'

function onClick() {
  // check real auth
  $auth = true
}
</script>

<button on:click={onClick}>Login</button>
