<script>
import Card from '../../components/Card.svelte'
import DateCard from '../../components/DateCard.svelte'
import {isTeacherOrAdmin} from '../../store.js'
import {isOldDueDate} from '../../utils/date.ts'

let {localMessage = {}, openThisMessage} = $props()
</script>

<Card title={localMessage.title}>
  <div class="flex justify-between">
    <div class={isOldDueDate(localMessage.dueDate || new Date()) ? 'text-gray-400' : ''}>
      {localMessage.message}
    </div>
    {#if localMessage.dueDate}
      <DateCard date={localMessage.dueDate} />
    {/if}
  </div>
  {#if $isTeacherOrAdmin}
    <div class="card-actions">
      <button onclick={() => openThisMessage(localMessage)} class="btn btn-primary btn-sm">Rediger</button>
    </div>
  {/if}
</Card>
