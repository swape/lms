<script>
import {onMount} from 'svelte'
import {getRoomMessages} from '../../apiCalls/roomMessages.js'
import EmptyPlaceholder from '../../components/EmptyPlaceholder.svelte'
import {isTeacherOrAdmin} from '../../store.js'
import Modal from '../../components/Modal.svelte'
import EditMessage from './EditMessage.svelte'
import {isOldDueDate} from '../../utils/date.ts'
import LoadingSpinner from '../../components/LoadingSpinner.svelte'
import RoomMessageCard from './RoomMessageCard.svelte'

const {roomId = null} = $props()

let localMessages = $state([])
let localOldMessages = $state([])
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
    localMessages = messages.filter((message) => !isOldDueDate(message.dueDate || new Date()))
    localOldMessages = messages.filter((message) => isOldDueDate(message.dueDate || new Date()))
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
      openText="add">
      <EditMessage toggle={toggleModal} roomId={roomId} defaultMessage={messageObject} />
    </Modal>
  </div>
{/if}

<LoadingSpinner inline={true} loading={loading} />

{#if localMessages?.length > 0}
  <div class="flex gap-4 flex-col mt-4">
    {#each localMessages as localMessage}
      <RoomMessageCard localMessage={localMessage} openThisMessage={openThisMessage} />
    {/each}
    {#each localOldMessages as localMessage}
      <RoomMessageCard localMessage={localMessage} openThisMessage={openThisMessage} />
    {/each}
  </div>
{:else}
  <EmptyPlaceholder message="Ingen meldinger" />
{/if}
