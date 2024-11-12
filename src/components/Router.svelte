<script>
import Home from '../SveltePages/Home.svelte'
import Chat from '../SveltePages/Chat.svelte'
import Rooms from '../SveltePages/Rooms/index.svelte'
import GroupsPage from '../SveltePages/Groups/index.svelte'
import UsersPage from '../SveltePages/Users/index.svelte'
import Calendar from '../SveltePages/Calendar/index.svelte'

import {currentPage} from '../store.js'
</script>

{#if $currentPage === 'home'}
  <Home />
{:else if $currentPage === 'chat'}
  <Chat />
{:else if $currentPage === 'rooms'}
  <Rooms />
{:else if $currentPage === 'groups'}
  <GroupsPage />
{:else if $currentPage === 'calendar'}
  <Calendar />
{:else if $currentPage === 'users'}
  <UsersPage />
{:else}
  <Home />
{/if}
