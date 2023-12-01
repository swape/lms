<script>
import {roles, user} from '../store.js'

function selectRole(role) {
  $user = role
}

if ($roles.length === 1) {
  selectRole($roles[0])
}
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-xxl">
      <img src="/svg/undraw_my_answer_re_k4dv.svg" class="mx-auto w-52 md:w-96 pb-4" alt="Velg rolle" />
      <h1 class="text-5xl font-bold">Hei du!</h1>
      <p class="py-6">Du har flere roller. Velg role for å gå videre.</p>
      <div class="flex flex-wrap gap-2 p-3">
        {#each $roles as role}
          <button on:click={() => selectRole(role)} class="btn btn-outline">{role.name}</button>
        {/each}
      </div>
    </div>
  </div>
</div>
