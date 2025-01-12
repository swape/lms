<script>
import {currentRole} from '../store.js'

let bg = $state('')

const colors = ['', '', 'bg-tertiary', 'bg-secondary', 'bg-primary']

currentRole.subscribe((role) => {
  const level = role?.level ?? 0
  bg = colors[level] || ''
})
</script>

<div class={`w-full h-1  ${bg}`}>&nbsp;</div>
