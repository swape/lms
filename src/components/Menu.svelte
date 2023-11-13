<script>
import {currentPage, menuList} from '../store.js'
let drawerValue = false
function onClick(page) {
  $currentPage = page
  drawerValue = false
}
</script>

<div class="drawer z-30">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerValue} />
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {#each $menuList as page}
        <li>
          <button on:click={() => onClick(page.page)} class={$currentPage === page.page ? 'active' : ''}>
            <span class="indicator">
              <span class="material-symbols-outlined">{page.icon}</span>
              {#if page.haveIndicator}
                <span class="indicator-item">&nbsp;</span>
              {/if}
            </span>
            <span>{page.name}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</div>
<nav class="inset-0 right-auto overflow-scroll sm:fixed bg-neutral-content">
  <div class="sm:hidden text-primary-content flex gap-3 justify-between items-center m-4">
    <label for="my-drawer" class="btn btn-sm"><span class="material-symbols-outlined">menu</span></label>
    <span class="text-xl pr-2">LMS</span>
  </div>
  <div class="sm:flex flex-col hidden desktop-buttons">
    {#each $menuList as page}
      <button on:click={() => onClick(page.page)} class={$currentPage === page.page ? 'active' : ''}>
        <span class="indicator">
          <span class="material-symbols-outlined">{page.icon}</span>
          {#if page.haveIndicator}
            <span class="indicator-item">&nbsp;</span>
          {/if}
        </span>
        <span>{page.name}</span>
      </button>
    {/each}
  </div>
</nav>

<style>
.desktop-buttons > button {
  @apply text-neutral min-h-[66px] indicator w-20 h-20 text-xs flex flex-col justify-center items-center gap-2;
}

.desktop-buttons > button.active {
  @apply bg-primary text-primary-content;
}
.indicator-item {
  @apply rounded-full bg-secondary w-2 h-2;
}
</style>
