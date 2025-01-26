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
<button onclick={toggleDrawer} class="menu-button"><Icon name="menu" /></button>
<nav class={drawerValue ? 'open' : ''}>
  <menu>
    {#each $menuList as page}
      <li>
        <button type="button" onclick={() => selectPage(page.page)} class={$currentPage === page.page ? 'active' : ''}>
          <span class="indicator">
            <Icon name={page.icon} />
            {#if page.haveIndicator}
              <span class="indicator-item">&nbsp;</span>
            {/if}
          </span>
          <span>{page.name}</span>
        </button>
      </li>
    {/each}
    <li>
      <button onclick={() => signOut()}><Icon name="logout" /><span>Logg ut</span></button>
    </li>
  </menu>
</nav>

<style>
.backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(5px);
  display: none;
}

nav {
  position: fixed;
  left: 0;
  top: 3px;
  bottom: 0;
  background-color: light-dark(var(--primary), var(--primary-dark));
  width: 250px;
  z-index: 1000;
  transition: all 0.3s;
}
.menu-button {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  background: light-dark(var(--primary), var(--primary-dark));
  padding: 5px;
  height: auto;
}

@media (max-width: 768px) {
  nav {
    translate: -250px;
  }
  nav.open {
    translate: 0;
  }
  .menu-button {
    display: inline-block;
  }
  .backdrop.open {
    display: block;
  }
}

menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
    border: none;
    border-radius: 0;
    margin-top: 2px;
    font-size: 1.3rem;
    padding: 0 10px;
    height: 60px;

    &.active,
    &:hover {
      opacity: 0.9;
    }
  }
}

.indicator {
  position: relative;
}

.indicator-item:after {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: light-dark(var(--primary), var(--primary-dark));
  transform: translateY(-50%);
  border-radius: 50%;
}
</style>
