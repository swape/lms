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
  <section>
    <h1 class="text-3xl text-center">{getSchoolName($currentRole?.sid)}</h1>
    {#if $myRoles?.length > 1}
      <Card title={`Hei ${$user.name || ''}`}>
        <p>
          Du er logget inn som:
          <RoleName level={$currentRole?.level} />
        </p>
        <div class="mt-4">
          <button class="btn" type="button" onclick={resetRole}>Bytt rolle</button>
        </div>
      </Card>
    {/if}
  </section>
{/if}
