<script>
import {currentRole} from '../store.js'

let bg = 'color-student'

currentRole.subscribe((role) => {
  const level = role?.level ?? 1
  
  if (level === 4) {
    bg = 'color-admin'
  } else if (level === 3) {
    bg = 'color-teacher'
  } else if (level === 2) {
    bg = 'color-parent'
  }
})
</script>

<div class={`w-full h-1 ${bg}`}>&nbsp;</div>
<style>
  .color-admin{
    @apply bg-orange-600;
  }
  .color-teacher{
    @apply bg-blue-700;
  }
  .color-parent{
    @apply bg-green-700;
  }
  .color-student{
    @apply bg-slate-600;
  }
</style>