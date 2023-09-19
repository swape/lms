<script>
import Home from '../SveltePages/Home.svelte'
import Chat from '../SveltePages/Chat.svelte'
import Rooms from '../SveltePages/Rooms.svelte'
import AddGroups from '../SveltePages/Groups/Add.svelte'
import Calendar from '../SveltePages/Calendar/index.svelte'

import {currentPage} from '../store.js'

// TODO: add admin and teacher security check here from $user var
</script>

{#if $currentPage === 'home'}
  <Home />
{:else if $currentPage === 'chat'}
  <Chat />
{:else if $currentPage === 'rooms'}
  <Rooms />
{:else if $currentPage === 'groups'}
  <AddGroups />
{:else if $currentPage === 'calendar'}
  <Calendar />
{:else}
  <Home />
{/if}
