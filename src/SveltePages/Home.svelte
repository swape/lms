<script>
import {user, myRoles, currentRole, isAdmin} from '../store.js'
import Card from '../components/Card.svelte'
import {roleTitles} from '../constants.ts'

function resetRole() {
  $currentRole = null
}
</script>

{#if $user?.uid}
  <h1 class="text-2xl text-center p-3">{`Hei ${$user.name || ''}`}</h1>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
    {#if $myRoles?.length > 1}
      <Card title={`Hello ${$user.name || ''}`}>
        <p>
          Du er logget inn som: {roleTitles.filter((role) => role.id === $currentRole?.level)?.[0]?.title}
        </p>
        <div class="card-actions justify-end">
          <button type="button" on:click={resetRole} class="btn btn-primary btn-sm">Bytt rolle</button>
        </div>
      </Card>
    {/if}
    {#if $isAdmin}
      <Card title="debugging">
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">UID</dt>
          <dd>{$user.uid}</dd>
        </dl>
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">Name</dt>
          <dd>{$user.name || ''}</dd>
        </dl>
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">PHONE</dt>
          <dd>{$user.phone || ''}</dd>
        </dl>
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">EMAIL</dt>
          <dd>{$user.email}</dd>
        </dl>
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">Sid</dt>
          <dd>{$currentRole?.sid}</dd>
        </dl>
        <dl class="flex gap-3">
          <dt class="w-20 font-bold">Level</dt>
          <dd>{$currentRole?.level}</dd>
        </dl>
      </Card>
    {/if}
  </section>
{/if}
