<script>
import {currentPage, currentRole, menuList} from '../store.js'
import {defaultMenu} from '../constants.ts'
import Icon from './Icon.svelte'
import {signOut} from '../supabase.js'

let drawerValue = $state(false)

function toggleDrawer() {
  drawerValue = !drawerValue
}

currentRole.subscribe((role) => {
  if (role) {
    menuList.set(defaultMenu.filter((menu) => menu.roles.includes(role.level)))
  }
})

function selectPage(page) {
  $currentPage = page
  drawerValue = false
}
</script>

<div class={drawerValue ? 'open backdrop' : 'backdrop'} onclick={toggleDrawer} role="none"></div>
<nav class={drawerValue ? 'open' : ''}>
  <menu class="menu bg-base-200 lg:menu-horizontal rounded-box w-full">
    {#each $menuList as page}
      <li>
        <button type="button" onclick={() => selectPage(page.page)} class={$currentPage === page.page ? 'active' : ''}>
          <span>
            <Icon name={page.icon} />
          </span>
          <span>
            {page.name}
            {#if !page.haveIndicator}
              <span class="status status-success">&nbsp;</span>
            {/if}
          </span>
        </button>
      </li>
    {/each}
    <li>
      <button onclick={() => signOut()}>
        <Icon name="logout" />
        <span>Logg ut</span></button>
    </li>
  </menu>
</nav>
