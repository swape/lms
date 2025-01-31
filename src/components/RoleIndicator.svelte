<script>
import {currentRole} from '../store.js'

let bg = $state('')

const colors = ['', 'bg-primary', 'bg-amber-500', 'bg-green-500', 'bg-rose-700']

currentRole.subscribe((role) => {
  const level = role?.level ?? 0
  bg = colors[level] || ''
})
</script>

<div class={`${bg} h-1`}>&nbsp;</div>
