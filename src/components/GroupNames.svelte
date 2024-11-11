<script>
import GroupName from './GroupName.svelte'

export let groups = []
</script>

<div class="flex gap-2 flex-wrap">
  {#each groups as groupId}
    <GroupName gid={groupId} />
  {/each}
</div>
