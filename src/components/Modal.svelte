<script>
  let {isOpen = false, btnClass = 'btn', openText = null, id = 'my_modal_1' , children, toggle = ()=>{} } = $props()
</script>

{#if openText}<button class={btnClass} onclick={() => toggle()}>{openText}</button>{/if}
<dialog id={id} class="modal {isOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={() => toggle()}>✕</button>
    </form>
    {#if isOpen}
      {@render children()}
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={() => toggle()} type="button">close</button>
  </form>
</dialog>
