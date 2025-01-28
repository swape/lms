<script>
import {currentPage, myRoles, currentRole, schoolNames, currentRoom} from '../store.js'

import LoadingSpinner from './LoadingSpinner.svelte'
import EnrollForm from './EnrollForm.svelte'
import {populateRoomsAndGroups} from '../services.js'
import {getLevelTitle} from '../utils/helper.ts'

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

function getSchoolName(sid) {
  if (!$schoolNames || $schoolNames.length === 0) {
    return ''
  }
  return $schoolNames.find((s) => s.id === sid)?.title || ''
}
</script>

{#if !$myRoles}
  <LoadingSpinner loadingText="Henter roller" />
{:else}
  <main>
    <img src="/svg/undraw_my_answer_re_k4dv.svg" alt="Velg rolle" role="none" />
    <h1>Hei du!</h1>

    {#if $myRoles.length > 1}
      <p>Du har flere roller. Velg role for å gå videre.</p>
      <div class="button-list">
        {#each $myRoles as role}
          <button type="button" onclick={() => selectRole(role)} class={role.level === 4 ? 'btn-admin btn' : 'btn'}
            >{getLevelTitle(role.level)} @ {getSchoolName(role.sid)}
          </button>
        {/each}
      </div>
    {/if}

    {#if $myRoles.length === 0}
      <EnrollForm />
    {/if}
  </main>
{/if}

<style>
img {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}

.button-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-admin {
  border: 1px solid light-dark(var(--light), var(--dark));
  color: light-dark(var(--light), var(--dark));
  background-color: light-dark(var(--dark), var(--light));
}

@media (max-width: 768px) {
  .button-list {
    flex-direction: column;
    width: 90svw;
  }

  button {
    width: 100%;
  }
}
</style>
