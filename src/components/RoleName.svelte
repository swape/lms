<script lang="ts">
import {roleTitles} from '../constants.ts'

let {level} = $props()

function getRoleTitle(levelId: number) {
  return roleTitles.filter(({id}) => id === levelId)?.[0]?.title
}
</script>

<span class="role-title" data-role-id={level}>{getRoleTitle(level)}</span>
