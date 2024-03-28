<script>
export let menu = []
export let activeTab = null
let activeTabId = 1
function changeTab(id) {
  activeTabId = id
  activeTab = menu.find((menuItem) => menuItem.id === id)
}
</script>

<div class="tabs tabs-boxed w-full bg-white">
  {#each menu as menuItem}
    <button
      type="button"
      class={`tab ${activeTabId === menuItem.id ? 'tab-active text-white' : ''}`}
      on:click={() => changeTab(menuItem.id)}>{menuItem.title}</button>
  {/each}
</div>
