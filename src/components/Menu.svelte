<script>
import {currentPage, currentRole, menuList} from '../store.js'
import {defaultMenu} from '../constants.ts'
import Icon from './Icon.svelte'
import {signOut} from '../supabase.js'
import Button from './Button.svelte'

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

<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="block sm:hidden">
      <Button action={toggleDrawer} icon="menu" classList="btn-ghost btn-circle" />

      {#if drawerValue}
        <button class="drawer-backdrop" onclick={toggleDrawer}><span class="hidden">Close menu</span></button>
      {/if}

      <ul
        class="{drawerValue
          ? ''
          : 'hidden'} sm:relative z-2 menu dropdown-content bg-base-100 rounded-box sm:p-2 shadow-sm w-full fixed top-10 left-0 right-0">
        {#each $menuList as page}
          <li>
            <button
              type="button"
              onclick={() => selectPage(page.page)}
              class={$currentPage === page.page ? 'menu-active' : ''}>
              <span>
                <Icon name={page.icon} />
              </span>
              <span>
                {page.name}
                {#if page.haveIndicator}
                  <span class="status status-success">&nbsp;</span>
                {/if}
              </span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <Button action={() => selectPage('home')} text="LMS" classList="btn-ghost text-xl" />
  </div>
  <div class="navbar-end">
    <Button action={() => signOut()} icon="logout" classList="btn-ghost btn-circle" />
  </div>
</div>

<menu class="menu hidden bg-base-200 sm:menu-horizontal rounded-box w-full">
  {#each $menuList as page}
    <li>
      <button
        type="button"
        onclick={() => selectPage(page.page)}
        class={$currentPage === page.page ? 'menu-active' : ''}>
        <span>
          <Icon name={page.icon} />
        </span>
        <span>
          {page.name}
          {#if page.haveIndicator}
            <span class="status status-success">&nbsp;</span>
          {/if}
        </span>
      </button>
    </li>
  {/each}
</menu>

<style>
.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}
</style>
