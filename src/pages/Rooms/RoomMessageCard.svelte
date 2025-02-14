<script>
import Card from '../../components/Card.svelte'
import DateCard from '../../components/DateCard.svelte'
import {isTeacherOrAdmin} from '../../store.js'
import {isOldDueDate} from '../../utils/date.ts'
import Button from '../../components/Button.svelte'

const {localMessage = {}, openThisMessage = () => {}, children} = $props()
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
  {#if children}
    <div>
      {@render children()}
    </div>
  {/if}
  {#if $isTeacherOrAdmin}
    <div class="card-actions">
      <Button action={() => openThisMessage(localMessage)} text="Rediger" />
    </div>
  {/if}
</Card>
