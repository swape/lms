<script>
export let message = null
</script>

{#if message}
  <div class="alert alert-info" role="alert">
    <div class="flex gap-4">
      <span class="material-symbols-outlined">info</span>
      <div>{message}</div>
    </div>
  </div>
{/if}
