<script>
import {user} from '../store.js'

let bg = 'bg-base-100'

user.subscribe((value) => {
  if (value?.role === 4) {
    bg = 'bg-primary'
  } else if (value?.role === 3) {
    bg = 'bg-secondary'
  } else if (value?.role === 2) {
    bg = 'bg-accent'
  }
})
</script>

<div class={`role-indicator ${bg}`}>&nbsp;</div>

<style>
.role-indicator {
  @apply w-full h-1;
}
</style>
