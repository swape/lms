<script>
import UserCard from '../../components/UserCard.svelte'
import TabArea from '../../components/TabArea.svelte'
import Button from '../../components/Button.svelte'
import {user} from '../../store.js'
import {calculateMinutes} from '../../utils/helper.ts'
import {absenceTabs} from '../../constants.ts'
import {insertAbsence} from '../../apiCalls/absence.js'

const {uid = null, roomId = null, close = () => {}} = $props()
let activeTab = $state(absenceTabs[0])
let isDisabled = $state(true)

const absence = $state({
  date: new Date().toISOString().split('T')[0],
  time_from: '',
  time_to: '',
  reason: '',
  uid,
  roomId,
  minutes: 0,
  createdBy: $user.uid
})

function onChange(section, value) {
  absence[section] = value
  isDisabled = isButtonDisabled()
  if (activeTab.id !== 1 && absence.time_from && absence.time_to) {
    absence.minutes = calculateMinutes(absence.time_from, absence.time_to)
  }
}

function registerAbsence() {
  if (activeTab.id === 1) {
    absence.time_from = null
    absence.time_to = null
    absence.minutes = 0
  } else {
    absence.minutes = calculateMinutes(absence.time_from, absence.time_to)
    if (absence.minutes < 0) {
      isDisabled = true
      return
    }
  }
  isDisabled = true
  insertAbsence(absence).then(() => {
    close()
  })
}

function tabChange(tab) {
  activeTab = tab
  isDisabled = isButtonDisabled()
}

function isButtonDisabled() {
  if (activeTab.id === 1) {
    return !absence.date || !absence.reason
  }
  return !absence.date || !absence.reason || !absence.time_from || !absence.time_to
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

    <TabArea bind:activeTab={activeTab} menu={absenceTabs} change={(changedTab) => tabChange(changedTab)} />

    {#if activeTab.id === 2}
      <label for="absence-date">Fra:</label>
      <input
        id="absence-date"
        type="time"
        class="input"
        onchange={({target}) => {
          onChange('time_from', target.value)
        }} />
      <label for="absence-date">Til:</label>
      <input
        id="absence-date"
        type="time"
        class="input"
        onchange={({target}) => {
          onChange('time_to', target.value)
        }} />
      {#if absence.minutes > 0}
        <p class="text-green-500">Totalt {absence.minutes} minutter.</p>{/if}
      {#if absence.minutes < 0 && absence.time_from && absence.time_to}
        <p class="text-red-500">Ugyldig tidsintervall.</p>
      {/if}
    {/if}

    <label for="absence-reason">Årsak:</label>
    <textarea
      id="absence-reason"
      class="textarea w-full"
      onkeyup={({target}) => {
        onChange('reason', target.value)
      }}></textarea>
  </div>
  <Button text="Registrer fravær" classList="btn-primary" action={registerAbsence} disabled={isDisabled} />
</div>
