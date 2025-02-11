<script>
import Icon from './Icon.svelte'

const {message} = $props()
</script>

{#if message}
  <div class="alert alert-error" role="alert">
    <div class="flex gap-4">
      <Icon name="error" />
      <div>{message}</div>
    </div>
  </div>
{/if}
