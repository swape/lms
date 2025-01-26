<script>
let {loading = true, loadingText = 'Loading', inline = false} = $props()
</script>

{#if loading}
  {#if inline}
    <div class="spinner">{loadingText} <span class="loading-spinner"></span></div>
  {:else}
    <div class="spinner-modal">
      {#if loadingText}<div>{loadingText}</div>{/if}
      <div class="loading-spinner"></div>
    </div>
  {/if}
{/if}

<style>
.spinner-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  display: flex;
  align-items: center;

  .loading-spinner {
    margin: 0 0.5rem;
    width: 20px;
    height: 20px;
  }
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
