<script>
let {title = '', children} = $props()
</script>

<div class="card">
  {#if title}<h2>{title}</h2>{/if}
  {@render children()}
</div>

<style>
.card {
  --bg: light-dark(var(--light), var(--dark));
  background-color: color-mix(in hsl, hsl(200 50 80), var(--bg) 80%);
  border-radius: 5px;
  margin: 1rem;
  padding: 1rem;

  h2 {
    margin: 0;
  }
}
</style>
