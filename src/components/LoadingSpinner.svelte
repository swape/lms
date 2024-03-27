<script>
export let loading = true
export let loadingText = 'Loading'
export let inline = false
</script>

{#if inline}
  <div class="flex gap-2">{loadingText} <span class="loading loading-spinner"></span></div>
{:else}
  <div class="flex gap-4 justify-center items-center h-full absolute inset-0 bg-slate-400 opacity-90">
    {#if loadingText}<div class="text-2xl">{loadingText}</div>{/if}
    <div class="loading loading-spinner"></div>
  </div>
{/if}
