<script>
import Icon from './Icon.svelte'
const {
  classList = 'btn-primary btn-sm ',
  icon = null,
  text = '',
  type = 'button',
  action = () => {},
  disabled = false
} = $props()
</script>

<button class="btn {classList}" type={type} onclick={action} disabled={disabled}
  >{#if icon}<Icon name={icon} />{/if}
  {text}</button>

<style>
.btn > span.material-symbol-outlined {
  margin-inline-start: -0.3rem;
}
</style>
