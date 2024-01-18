<script>
import {auth} from '../store.js'
import '@passageidentity/passage-elements/passage-auth'

const PUBLIC_PASSAGE_APP_ID = import.meta.env.PUBLIC_PASSAGE_APP_ID
function onClick() {
  // check real auth
  $auth = true
}
</script>
{#if !$auth}
<section class="container mx-auto">
  <div class="text-3xl py-4">Login page</div>
  {#if PUBLIC_PASSAGE_APP_ID}<passage-auth app-id={PUBLIC_PASSAGE_APP_ID}></passage-auth>{/if}

  <button on:click={onClick} type="button" class="btn btn-primary">Fake login</button>
</section>
{/if}
