<script>
import {currentPage, myRoles, currentRole, user, schoolNames} from '../store.js'
import {populateRolesAndSchools, populateRoomsAndGroups} from '../services.js'
import {onMount} from 'svelte'
import {roleTitles} from '../constants.ts'
import LoadingSpinner from './LoadingSpinner.svelte'
import EnrollForm from './EnrollForm.svelte'

function selectRole(role) {
  $currentRole = role
  $currentPage = 'home'
  populateRoomsAndGroups(role.sid)
}

onMount(async () => {
  user.subscribe((user) => {
    if (user.uid) {
      populateRolesAndSchools(user.uid)
    }
  })
})

myRoles.subscribe((value) => {
  if (value?.length === 1) {
    selectRole(value[0])
  }
})

function getLevelTitle(level) {
  return roleTitles.find((role) => role.id === level)?.title
}
</script>

{#if !$myRoles}
  <LoadingSpinner loadingText="Henter roller" />
{:else}
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-xxl">
        <img src="/svg/undraw_my_answer_re_k4dv.svg" class="mx-auto w-52 md:w-96 pb-4" alt="Velg rolle" role="none" />
        <h1 class="text-5xl font-bold">Hei du!</h1>
        {#if $myRoles.length > 1}
          <p class="py-6">Du har flere roller. Velg role for å gå videre.</p>
          <div class="flex flex-wrap gap-2 p-3 justify-center">
            {#each $myRoles as role}
              <button
                type="button"
                on:click={() => selectRole(role)}
                class="btn {role.level === 4 ? 'btn-secondary' : 'btn-primary'}  btn-md"
                >{getLevelTitle(role.level)} @ {role.schoolName}
              </button>
            {/each}
          </div>
        {/if}

        {#if $myRoles.length === 0}
          <EnrollForm />
        {/if}
      </div>
    </div>
  </div>
{/if}
