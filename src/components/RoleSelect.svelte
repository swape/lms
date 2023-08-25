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
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Select role</p>
      <div class="flex flex-wrap gap-2 p-3">
        {#each $roles as role}
          <button on:click={() => selectRole(role)} class="btn btn-outline">{role.name}</button>
        {/each}
      </div>
    </div>
  </div>
</div>
