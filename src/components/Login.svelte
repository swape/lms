<script>
import {auth} from '../store.js'
const PUBLIC_PASSAGE_APP_ID = import.meta.env.PUBLIC_PASSAGE_APP_ID
function onClick() {
  // check real auth
  $auth = true
}
</script>

<section class="container mx-auto">
  <div class="text-3xl py-4">Login page</div>
  <passage-auth app-id={PUBLIC_PASSAGE_APP_ID}></passage-auth>

  <button on:click={onClick} type="button" class="btn btn-primary">Fake login</button>
</section>
