<script>
let {message = 'Ingen data'} = $props()
</script>

<div class="p-4 flex flex-col gap-4 items-center mt-8">
  <img src="/svg/undraw_void_-3-ggu.svg" alt="Illustrasjon av et tomt rom" class="max-w-sm w-full" />
  <p class="pt-4">{message}</p>
</div>
