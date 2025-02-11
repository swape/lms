<script>
import {currentPage, myRoles, currentRole, currentRoom} from '../store.js'

import LoadingSpinner from './LoadingSpinner.svelte'
import EnrollForm from './EnrollForm.svelte'
import {populateRoomsAndGroups} from '../services.js'
import {getLevelTitle} from '../utils/helper.ts'
import {getSchools} from '../apiCalls/schools.js'
import {onMount} from 'svelte'

let localSchools = $state([])

function selectRole(role) {
  $currentRole = role
  $currentPage = 'home'
  $currentRoom = null
  populateRoomsAndGroups(role.sid, $currentRole, true)
}

myRoles.subscribe((value) => {
  if (value?.length === 1) {
    selectRole(value[0])
  }
})

onMount(async () => {
  localSchools = await getSchools()
})

function getSchoolName(sid) {
  if (!localSchools || localSchools.length === 0) {
    return ''
  }
  const school = localSchools.find((s) => s.id === sid)
  if (!school) {
    return ''
  }
  return school.title || ''
}

function buttonClass(level) {
  const returnClass = ['btn']

  if (level === 4) {
    returnClass.push('btn-primary')
  } else if (level === 3) {
    returnClass.push('btn-secondary')
  } else if (level === 2) {
    returnClass.push('btn-tertiary')
  }
  return returnClass.join(' ')
}
</script>

{#if !$myRoles}
  <LoadingSpinner loadingText="Henter roller" />
{:else}
  <div class="max-w-auto flex flex-col gap-4 items-center mt-4 p-4">
    <img src="/svg/undraw_my_answer_re_k4dv.svg" alt="Velg rolle" role="none" class="max-w-90 w-full" />
    <h1 class="text-2xl">Hei du!</h1>

    {#if $myRoles.length > 1}
      <p>Du har flere roller. Velg role for å gå videre.</p>
      <div class="flex gap-2 flex-wrap mt-4 justify-center">
        {#each $myRoles as role}
          <button type="button" onclick={() => selectRole(role)} class={buttonClass(role.level)}
            >{getLevelTitle(role.level)} @ {getSchoolName(role.sid)}
          </button>
        {/each}
      </div>
    {/if}

    {#if $myRoles.length === 0}
      <EnrollForm />
    {/if}
  </div>
{/if}
