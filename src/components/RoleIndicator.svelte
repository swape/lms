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

<style>
.role-bg {
  width: 100%;
  height: 5px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.bg-student {
  background-color: light-dark(var(--primary), var(--primary-dark));
}
.bg-parent {
  background-color: deepskyblue;
}
.bg-teacher {
  background-color: deeppink;
}
.bg-admin {
  background-color: red;
}
</style>
