<script>
import {groups} from '../../store.js'
import {onMount} from 'svelte'

onMount(async () => {
  // fetch groups
})
</script>

<div></div>
<section class="m-4">
  <div class="overflow-x-auto">
    <table class="table bg-white">
      <thead>
        <tr>
          <th>Gruppenavn</th>
          <th>Antall brukere</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {#each $groups as group}
        <tr>
          <td>{group.title}</td>
          <td>{group?.users?.length || 0}</td>
          <td class="flex justify-end"><button class="btn btn-primary btn-sm" >Rediger</button></td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
