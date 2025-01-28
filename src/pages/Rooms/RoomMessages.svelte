<script>
import {onMount} from 'svelte'
import {getRoomMessages} from '../../apiCalls/roomMessages.js'
import Card from '../../components/Card.svelte'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'
import {isTeacherOrAdmin} from '../../store.js'
import Modal from '../../components/Modal.svelte'
import EditMessage from './EditMessage.svelte'
import DateCard from '../../components/DateCard.svelte'
import {isOldDueDate} from '../../utils/date.ts'
import LoadingSpinner from '../../components/LoadingSpinner.svelte'

let {roomId = null} = $props()

let localMessages = $state([])
let messageObject = $state({title: '', message: '', dueDate: ''})
let loading = $state(false)

onMount(() => {
  if (roomId) {
    fetchAndPopulateMessages()
  }
})

let isOpen = $state(false)

function toggleModal() {
  isOpen = !isOpen
  if (!isOpen) {
    fetchAndPopulateMessages()
    messageObject = {title: '', message: '', dueDate: ''}
  }
}

function fetchAndPopulateMessages() {
  localMessages = []
  loading = true
  getRoomMessages(roomId).then((messages) => {
    localMessages = messages
    loading = false
  })
}

function openThisMessage(message) {
  messageObject = {...message}
  toggleModal()
}

// TODO: show as markdown and expand as modal
</script>

{#if $isTeacherOrAdmin}
  <div class="flex justify-end mt-4">
    <Modal
      id="add-message"
      isOpen={isOpen}
      toggle={toggleModal}
      btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined"
      openText="add_circle">
      <EditMessage toggle={toggleModal} roomId={roomId} defaultMessage={messageObject} />
    </Modal>
  </div>
{/if}

<LoadingSpinner inline={true} loading={loading} />

{#if localMessages?.length > 0}
  <div class="flex gap-4 flex-col mt-4">
    {#each localMessages as localMessage}
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
          <div class="mt-5">
            <button onclick={() => openThisMessage(localMessage)} class="btn btn-primary btn-sm">Rediger</button>
          </div>
        {/if}
      </Card>
    {/each}
  </div>
{:else}
  <EmptyPlaceholder message="Ingen meldinger" />
{/if}
