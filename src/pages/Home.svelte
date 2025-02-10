<script>
import {user, myRoles, currentRole, isTeacherOrAdmin} from '../store.js'
import Card from '../components/Card.svelte'
import RoleName from '../components/RoleName.svelte'
import {getSchoolName} from '../utils/helper.ts'
import Button from '../components/Button.svelte'

function resetRole() {
  $currentRole = null
}
</script>

{#if $user?.uid}
  <section>
    <h1 class="text-3xl text-center">{getSchoolName($currentRole?.sid)}</h1>
    {#if $myRoles?.length > 1}
      <Card title={`Hei ${$user.name || $user.email || ''}`}>
        {#if $isTeacherOrAdmin}<p>
            Du er logget inn som:
            <RoleName level={$currentRole?.level} />
          </p>
        {/if}
        <div class="mt-4">
          <Button action={resetRole} icon="supervisor_account" text="Bytt rolle" classList="btn-primary" />
        </div>
      </Card>
    {/if}
  </section>
{/if}
