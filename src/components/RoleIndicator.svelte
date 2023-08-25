<script>
import {user} from '../store.js'

let bg = 'bg-base-100'

user.subscribe((value) => {
  if (value?.role === 'admin') {
    bg = 'bg-primary'
  } else if (value?.role === 'teacher') {
    bg = 'bg-secondary'
  } else if (value?.role === 'parent') {
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
