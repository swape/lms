<script>
let {title = '', children} = $props()
</script>

<div class="card m-2 p-4">
  {#if title}<h2 class="text-2xl pb-2">{title}</h2>{/if}
  {@render children()}
</div>

<style>
.card {
  background-color: color-mix(in hsl, hsl(200 50 80), var(--bg-color) 60%);
  border-radius: 5px;

  h2 {
    margin: 0;
  }
}
</style>
