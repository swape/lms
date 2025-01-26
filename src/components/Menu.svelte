<script>
import {currentPage, currentRole, menuList} from '../store.js'
import {defaultMenu} from '../constants.ts'
import Icon from './Icon.svelte'
import {signOut} from '../supabase.js'

let drawerValue = $state(false)

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

<nav>
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
nav {
  position: fixed;
  left: 0;
  top: 3px;
  bottom: 0;
  background-color: light-dark(var(--primary), var(--primary-dark));
  width: 250px;
  z-index: 1000;
}

menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

button {
  width: 100%;
  border: none;
  border-radius: 0;
  margin-top: 2px;
  font-size: 1.3rem;
  padding: 0 10px;
  height: 60px;
}

button.active,
button:hover {
  opacity: 0.9;
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
