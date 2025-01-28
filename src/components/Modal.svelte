<script>
let {isOpen = false, btnClass = 'btn', openText = null, id = 'my_modal_1', children, toggle = () => {}} = $props()
</script>

{#if openText}
  <button class={btnClass} onclick={() => toggle()}>{openText}</button>
{/if}
<dialog id={id} class="modal {isOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-primary btn-sm btn-circle btn-ghost absolute right-2 top-2" onclick={() => toggle()}
        >✕
      </button>
    </form>
    {#if isOpen}
      {@render children()}
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button onclick={() => toggle()} type="button">close</button>
  </form>
</dialog>

<style>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-backdrop > button {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  opacity: 0;
}

.modal-open {
  display: block;
}

.modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background-color: light-dark(var(--light), var(--dark));
  border: 1px solid light-dark(var(--dark), var(--light));
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

@media (max-width: 768px) {
  .modal-box {
    width: calc(100% - 2rem);
    left: auto;
    top: auto;
    translate: 1rem 1rem;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(10px);
}
</style>
