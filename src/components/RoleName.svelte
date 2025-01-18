<script lang="ts">
import {roleTitles} from '../constants.ts'
import {getLevelFromRoleAndUser} from '../apiCalls/user'

let {role, uid} = $props()
let localTitle = $state('')

getLevelFromRoleAndUser(role, uid).then((level) => {
  localTitle = roleTitles.filter(({id}) => id === level)?.[0]?.title
})
</script>

<span class="role-title" data-role-id={role}>{localTitle}</span>
