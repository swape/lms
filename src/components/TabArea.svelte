<script>
let {activeTab = null, menu = [], change = () => {}} = $props()

function changeTab(id) {
  activeTab = menu.find((menuItem) => menuItem.id === id)
  change(activeTab)
}
</script>

<div class="tabs tabs-box w-full overflow-y-auto flex flex-row gap-2 dark:bg-slate-600">
  {#each menu as menuItem}
    <button
      type="button"
      class={`tab ${activeTab?.id === menuItem.id ? 'tab-active' : ''}`}
      onclick={() => changeTab(menuItem.id)}>{menuItem.title}</button>
  {/each}
</div>
