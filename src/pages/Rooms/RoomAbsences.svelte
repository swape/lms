<script>
import UserCard from '../../components/UserCard.svelte'
import TabArea from '../../components/TabArea.svelte'
import Button from '../../components/Button.svelte'

const absenceTabs = [
  {id: 1, title: 'Hel dag'},
  {id: 2, title: 'Delvis'}
]

const {uid = null, roomId = null} = $props()
let activeTab = $state(absenceTabs[0])

const absence = {
  date: new Date().toISOString().split('T')[0],
  from: '',
  to: '',
  reason: '',
  uid,
  roomId
}

function onChange(section, value) {
  absence[section] = value
}

function registerAbsence() {
  if (activeTab.id === 1) {
    delete absence.from
    delete absence.to
  }

  console.log(absence)
}
</script>

<div class="flex gap-1 mb-2 text-xl">Fravær registrering for <UserCard uid={uid} /></div>
<div>
  <div class="flex flex-col gap-4 my-4 w-full">
    <label for="absence-date">Velg dato:</label>
    <input
      id="absence-date"
      type="date"
      class="input"
      value={absence.date}
      onchange={({target}) => {
        onChange('date', target.value)
      }} />

    <TabArea bind:activeTab={activeTab} menu={absenceTabs} change={(changedTab) => (activeTab = changedTab)} />

    {#if activeTab.id === 2}
      <label for="absence-date">Fra:</label>
      <input
        id="absence-date"
        type="time"
        class="input"
        onchange={({target}) => {
          onChange('from', target.value)
        }} />
      <label for="absence-date">Til:</label>
      <input
        id="absence-date"
        type="time"
        class="input"
        onchange={({target}) => {
          onChange('to', target.value)
        }} />
    {/if}

    <label for="absence-reason">Årsak:</label>
    <textarea
      id="absence-reason"
      class="textarea w-full"
      onchange={({target}) => {
        onChange('reason', target.value)
      }}></textarea>
  </div>
  <Button text="Registrer fravær" classList="btn-primary" action={registerAbsence} />
</div>
