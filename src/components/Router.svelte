<script>
import Home from '../pages/Home.svelte'
import Chat from '../pages/Chat.svelte'
import Rooms from '../pages/Rooms/index.svelte'
import GroupsPage from '../pages/Groups/index.svelte'
import UsersPage from '../pages/Users/index.svelte'
import Calendar from '../pages/Calendar/index.svelte'

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
