<script lang="ts">
import {getLevelTitle} from '../utils/helper.ts'

const {level} = $props()
</script>

<span class="role-title" data-role-id={level}>{getLevelTitle(level)}</span>
