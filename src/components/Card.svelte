<script>
const {title = '', children} = $props()
</script>

<div class="card shadow-sm m-2 p-5 bg-base-200 gap-3 flex flex-col justify-between dark:bg-slate-700">
  {#if title}<h2 class="card-title">{title}</h2>{/if}
  {@render children()}
</div>
