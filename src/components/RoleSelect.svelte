<script>
import {currentPage, myRoles, user} from '../store.js'

function selectRole(role) {
  $user = role
  $currentPage = 'home'
}

if ($myRoles.length === 1) {
  selectRole($myRoles[0])
}
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-xxl">
      <img src="/svg/undraw_my_answer_re_k4dv.svg" class="mx-auto w-52 md:w-96 pb-4" alt="Velg rolle" />
      <h1 class="text-5xl font-bold">Hei du!</h1>
      <p class="py-6">Du har flere roller. Velg role for å gå videre.</p>
      <div class="flex flex-wrap gap-2 p-3 justify-center">
        {#each $myRoles as role}
          <button
            on:click={() => selectRole(role)}
            class="btn {role.role === 4 ? 'btn-secondary' : 'btn-primary'}  btn-md"
            >{role.name} @ {role.school}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
