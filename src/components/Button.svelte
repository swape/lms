<script>
import Icon from './Icon.svelte'
let {
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
