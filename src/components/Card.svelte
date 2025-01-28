<script>
let {title = '', children} = $props()
</script>

<div class="card border border-base-300 shadow-sm m-2 p-4">
  {#if title}<h2 class="text-2xl pb-2">{title}</h2>{/if}
  {@render children()}
</div>
