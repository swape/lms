<script>
import {currentPage, currentRole, menuList} from '../store.js'
import {defaultMenu} from '../constants.ts'
import {signOut} from '../supabaseConfig.js'

let drawerValue = false

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

{#if $menuList}
  <div class="drawer z-30">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerValue} aria-hidden="true" />
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <menu class="menu px-4 py-5 w-80 min-h-full bg-indigo-900 text-white text-2xl">
        {#each $menuList as page}
          <li>
            <button
              type="button"
              on:click={() => selectPage(page.page)}
              class={$currentPage === page.page ? 'active' : ''}>
              <span class="indicator">
                <span class="material-symbols-outlined" aria-hidden="true">{page.icon}</span>
                {#if page.haveIndicator}
                  <span class="indicator-item" aria-hidden="true">&nbsp;</span>
                {/if}
              </span>
              <span>{page.name}</span>
            </button>
          </li>
        {/each}
        <li>
          <button on:click={signOut}
            ><span class="material-symbols-outlined" aria-hidden="true">logout</span><span>Logg ut</span></button>
        </li>
      </menu>
    </div>
  </div>
  <nav class="inset-0 right-auto overflow-scroll sm:fixed bg-indigo-900 text-white">
    <div class="sm:hidden flex gap-3 justify-between items-center m-4">
      <label for="my-drawer" class="btn btn-sm"><span class="material-symbols-outlined">menu</span></label>
    </div>
    <div class="sm:flex flex-col hidden desktop-buttons" aria-hidden="true">
      {#each $menuList as page}
        <button
          on:click={() => selectPage(page.page)}
          class={$currentPage === page.page ? 'active' : ''}
          aria-hidden="true"
          >
          <span class="indicator" aria-hidden="true">
            <span class="material-symbols-outlined" aria-hidden="true">{page.icon}</span>
            {#if page.haveIndicator}
              <span class="indicator-item" aria-hidden="true">&nbsp;</span>
            {/if}
          </span>
          <span>{page.name}</span>
        </button>
      {/each}
      <button on:click={signOut}
        ><span class="material-symbols-outlined" aria-hidden="true">logout</span><span>Logg ut</span></button>
    </div>
  </nav>
{/if}

<style>
.desktop-buttons > button {
  @apply text-white min-h-[66px] indicator w-20 h-20 text-xs flex flex-col justify-center items-center gap-2;
}

button.active {
  @apply bg-indigo-950 text-white;
}

button:focus-visible {
  @apply ring-1 ring-white text-white outline-none;
}
.desktop-buttons > button:focus-visible {
  @apply bg-indigo-800 text-white ring-2;
}

.indicator-item {
  @apply rounded-full bg-secondary w-2 h-2;
}
</style>
