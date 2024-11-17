<script>
import {onMount} from 'svelte'
import {getRoomMessages} from '../../apiCalls/roomMessages.js'
import Card from '../../components/Card.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'

export let rid = null

let localMessages = []

onMount(() => {
  if (rid) {
    getRoomMessages(rid).then((messages) => {
      localMessages = messages
    })
  }
})
</script>

{#if localMessages.length > 0}
  <div class="flex gap-4 flex-col mt-4">
    {#each localMessages as localMessage}
      <Card title={localMessage.title}>
        <div>{localMessage.message}</div>
        {#if localMessage.dueDate}
          <time datetime={localMessage.dueDate} class="mt-4 text-sm">{localMessage.dueDate}</time>
        {/if}
      </Card>
    {/each}
  </div>
{:else}
  <EmptyPlaceholder message="Ingen meldinger" />
{/if}
