<script>
let {activeTab = null, menu = [], change = () => {}} = $props()

function changeTab(id) {
  activeTab = menu.find((menuItem) => menuItem.id === id)
  change(activeTab)
}
</script>

<div class="tabs w-full overflow-y-auto flex flex-row gap-2">
  {#each menu as menuItem}
    <button
      type="button"
      class={`tab ${activeTab?.id === menuItem.id ? 'active' : ''}`}
      onclick={() => changeTab(menuItem.id)}>{menuItem.title}</button>
  {/each}
</div>

<style>
.tabs {
  background-color: var(--bg-secondary-text);
  border-radius: 0.5rem;
  padding: 10px;

  button {
    border: 1px solid var(--text-color);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--bg-color);
    color: var(--text-color);
    cursor: pointer;

    &.active,
    &:hover {
      background-color: var(--bg-secondary);
      color: var(--bg-secondary-text);
    }
  }
}
</style>
