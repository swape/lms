<script>
import Button from './Button.svelte'
const {isOpen = false, btnClass = 'btn', openText = null, id = 'my_modal_1', children, toggle = () => {}} = $props()
</script>

{#if openText}
  <button class={btnClass} onclick={() => toggle()}>{openText}</button>
{/if}
<dialog id={id} class="modal {isOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <form method="dialog" class="p-2">
      <Button
        action={() => toggle()}
        icon="close_small"
        classList="btn-primary btn-sm btn-circle btn-ghost absolute right-2 top-2" />
    </form>
    {#if isOpen}
      {@render children()}
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={() => toggle()} type="button">close</button>
  </form>
</dialog>
