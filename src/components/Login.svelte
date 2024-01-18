<script>
import {auth} from '../store.js'

import {onMount} from 'svelte'
import { Passage } from '@passageidentity/passage-js';

const PUBLIC_PASSAGE_APP_ID = import.meta.env.PUBLIC_PASSAGE_APP_ID
const passage = new Passage(PUBLIC_PASSAGE_APP_ID)
const user = passage.getCurrentUser()
function onClick() {
  // check real auth
  $auth = true
}

onMount(async () => {
  // check real auth
  const userInfo = await user.userInfo()

  if(userInfo?.id){
    $auth = true
  }
})

</script>
{#if !$auth}
<section class="container mx-auto">
  <div class="text-3xl py-4">Login page</div>
  {#if PUBLIC_PASSAGE_APP_ID}
    <passage-auth app-id={PUBLIC_PASSAGE_APP_ID}></passage-auth>
  {/if}

  <button on:click={onClick} type="button" class="btn btn-primary">Fake login</button>
</section>
{/if}
