<script>
import Icon from './Icon.svelte'

export let message = null
</script>

{#if message}
  <div class="alert alert-info" role="alert">
    <div class="flex gap-4">
      <Icon name="info"/>
      <div>{message}</div>
    </div>
  </div>
{/if}
