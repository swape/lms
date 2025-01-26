<script>
import {user, myRoles, currentRole} from '../store.js'
import Card from '../components/Card.svelte'
import RoleName from '../components/RoleName.svelte'
import {getSchoolName} from '../utils/helper.ts'

function resetRole() {
  $currentRole = null
}
</script>

{#if $user?.uid}
  <h1 class="text-3xl text-center">{getSchoolName($currentRole?.sid)}</h1>
  <h2 class="text-2xl text-center p-3">{`Hei ${$user.name || ''}`}</h2>

  <section class="grid grid-cols-1 md:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
    {#if $myRoles?.length > 1}
      <Card title={`Hello ${$user.name || ''}`}>
        <p>
          Du er logget inn som: <RoleName level={$currentRole?.level} />
        </p>
        <div class="card-actions justify-end">
          <button type="button" onclick={resetRole} class="btn btn-primary btn-sm">Bytt rolle</button>
        </div>
      </Card>
    {/if}
  </section>
{/if}
