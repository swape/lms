<script>
import {getAbsencesForUser, deleteAbsence} from '../../apiCalls/absence.js'
import {onMount} from 'svelte'
import {currentRole} from '../../store.js'
import Button from '../../components/Button.svelte'

let {uid = ''} = $props()
let localOverview = $state([])
let stats = $state({})
let canDelete = $state(false)

onMount(() => {
  fetchAbsenceForUser()
})

currentRole.subscribe((role) => {
  canDelete = role.level === 4
})

function fetchAbsenceForUser() {
  getAbsencesForUser(uid).then((res) => {
    if (res.data) {
      localOverview = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    calculateStats()
  })
}

function calculateStats() {
  let days = 0
  let hours = 0
  let minutes = 0
  localOverview.forEach((absence) => {
    if (absence.minutes) {
      hours += absence.minutes / 60
      minutes += absence.minutes
    } else {
      days++
    }
  })
  stats = {days, hours: Math.round(hours * 100) / 100, minutes}
}

function deleteThisAbsence(absence) {
  if (confirm(`Er du sikker på at du vil slette fraværet fra ${absence.date}?`)) {
    deleteAbsence(absence.id).then(() => {
      fetchAbsenceForUser()
    })
  }
}
</script>

<h2 class="text-xl">Oversikt</h2>

<div class="flex gap-2 my-3 justify-between border border-base-300 p-3 rounded">
  <span>Antall dager: {stats.days}</span>
  <span>Antall timer: {stats.hours} <i class="text-sm">(minutter: {stats.minutes})</i></span>
</div>

{#each localOverview as absence}
  <div class="flex gap-2 mb-2 pb-2 border-b border-gray-300">
    {#if canDelete}
      <Button action={() => deleteThisAbsence(absence)} icon="delete" classList="btn-circle btn-error btn-sm" />
    {/if}

    <span class="font-bold w-[110px]"> {absence.date}</span>

    {#if absence.minutes}
      <div class="flex flex-col w-[120px] text-sm">
        <span class="text-accent">({absence.minutes} minutter)</span>
        <span>{absence.time_from} - {absence.time_to}</span>
      </div>
    {:else}
      <span class="text-accent w-[120px]">Hele dagen</span>
    {/if}

    <span class="text-sm"> {absence.reason}</span>
  </div>
{/each}
