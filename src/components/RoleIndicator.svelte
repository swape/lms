<script>
import {currentRole} from '../store.js'

let bg = 'bg-base-100'

currentRole.subscribe((value) => {
  if (value === 4) {
    bg = 'bg-primary'
  } else if (value === 3) {
    bg = 'bg-secondary'
  } else if (value === 2) {
    bg = 'bg-accent'
  }
})
</script>

<div class={`w-full h-1 ${bg}`}>&nbsp;</div>
