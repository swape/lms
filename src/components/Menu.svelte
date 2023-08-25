<script>
import {currentPage, menuList} from '../store.js'

function onClick(page) {
  $currentPage = page
}
</script>

<nav>
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
</nav>

<style>
nav {
  @apply fixed inset-0 right-auto flex flex-col bg-neutral overflow-scroll;
}

button {
  @apply min-h-[66px] indicator bg-neutral w-20 h-20 text-primary-content text-xs flex flex-col justify-center items-center gap-2;
}

button.active {
  @apply bg-primary text-primary-content;
}
.indicator-item {
  @apply rounded-full bg-secondary w-2 h-2;
}
</style>
