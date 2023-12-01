<script>
import {user, myRoles} from '../store.js'
import Card from '../components/Card.svelte'
function resetRole() {
  $user = null
}

// TODO:  add uid to real name mapping
</script>

{#if $myRoles?.length === 1}
  <h1 class="text-xl text-center p-3">{`Hei ${$user?.fullName}`}</h1>
{/if}
<section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
  {#if $myRoles?.length > 1}
    <Card title={`Hello ${$user?.uid}`}>
      <p>Du er logget inn som: {$user?.name} ({$user?.school})</p>
      <div class="card-actions justify-end">
        <button type="button" on:click={resetRole} class="btn btn-primary btn-sm">Bytt rolle</button>
      </div>
    </Card>
  {/if}

  <Card title="Mer info">
    <p>noe her</p>
    <div class="card-actions">
      <button class="btn btn-primary btn-sm" type="button">knappen</button>
    </div>
  </Card>

  <Card title="Innlevering">
    <p>Fag: Matte</p>
    <p>Frist: Fredag</p>
    <div class="card-actions">
      <button class="btn btn-primary btn-sm" type="button">knappen</button>
    </div>
  </Card>
</section>
