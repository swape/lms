<script>
let {activeTab = null, menu = [], change = () => {}} = $props()

function changeTab(id) {
  activeTab = menu.find((menuItem) => menuItem.id === id)
  change(activeTab)
}
</script>

<div class="tabs tabs-boxed w-full p-5 bg-white overflow-y-auto">
  {#each menu as menuItem}
    <button
      type="button"
      class={`tab ${activeTab?.id === menuItem.id ? 'tab-active text-white' : ''}`}
      onclick={() => changeTab(menuItem.id)}>{menuItem.title}</button>
  {/each}
</div>
