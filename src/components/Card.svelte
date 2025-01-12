<script>

let {title = '',children} = $props()
</script>

<div class="card bg-white">
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    {@render children()}
  </div>
</div>
