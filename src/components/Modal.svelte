<script>
import {createEventDispatcher} from 'svelte'
export let id = 'my_modal_1'
export let openText = 'open modal'
export let btnClass = 'btn'

export let isOpen = false

const dispatch = createEventDispatcher()

function toggleModal() {
  dispatch('toggle')
}
</script>

<button class={btnClass} on:click={() => toggleModal()}>{openText}</button>
<dialog id={id} class="modal {isOpen ? 'modal-open' : ''}">
  <div class="modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={() => toggleModal()}>✕</button>
    </form>
    <slot />
  </div>
  <form method="dialog" class="modal-backdrop">
    <button on:click={() => toggleModal()} type="button">close</button>
  </form>
</dialog>
