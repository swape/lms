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
  background-color: light-dark(var(--dark), var(--light));
  border-radius: 0.5rem;
  padding: 10px;

  button {
    border: 1px solid light-dark(var(--dark), var(--light));
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: light-dark(var(--light), var(--dark));
    color: light-dark(var(--dark), var(--light));
    cursor: pointer;
  }
}
</style>
