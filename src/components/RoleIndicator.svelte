<script>
import {currentRole} from '../store.js'

let bg = $state('')

const colors = ['', 'bg-student', 'bg-parent', 'bg-teacher', 'bg-admin']

currentRole.subscribe((role) => {
  const level = role?.level ?? 0
  bg = colors[level] || ''
})
</script>

<div class={`${bg} role-bg`}>&nbsp;</div>
