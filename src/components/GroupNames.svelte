<script>
import GroupName from './GroupName.svelte'

let {groups = []} = $props()
</script>

<div class="flex gap-2 flex-wrap">
  {#each groups as groupId}
    <GroupName gid={groupId} />
  {/each}
</div>
