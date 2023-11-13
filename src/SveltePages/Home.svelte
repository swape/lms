<script>
import {user, roles} from '../store.js'
import Card from '../components/Card.svelte'
function resetRole() {
  $user = null
}
</script>

{#if $roles?.length === 1}
  <h1 class="text-xl text-center p-3">{`Hei ${$user?.fullName}`}</h1>
{/if}
<section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
  {#if $roles?.length > 1}
    <Card title={`Hello ${$user?.fullName}`}>
      <p>You are logged inn as: {$user?.name} ({$user?.role})</p>
      <div class="card-actions justify-end">
        <button on:click={resetRole} class="btn btn-primary">Bytt rolle</button>
      </div>
    </Card>
  {/if}

  <Card title="Mer info">
    <p>noe her</p>
    <div class="card-actions">
      <button class="btn btn-secondary">knappen</button>
      <button class="btn btn-accent">knappen</button>
    </div>
  </Card>

  <Card title="Innlevering">
    <p>Fag: Matte</p>
    <p>Frist: Fredag</p>
    <div class="card-actions">
      <button class="btn btn-secondary">knappen</button>
      <button class="btn btn-accent">knappen</button>
    </div>
  </Card>
</section>
