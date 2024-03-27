<script>
export let message = null
</script>

{#if message}
  <div class="alert alert-error" role="alert">
    <div class="flex gap-4">
      <span class="material-symbols-outlined">error</span>
      <div>{message}</div>
    </div>
  </div>
{/if}
