<script lang="ts">
let {name = 'chevron_left', ariaHidden = true} = $props()
</script>

<span class="material-symbols-outlined" aria-hidden={ariaHidden}>{name}</span>
