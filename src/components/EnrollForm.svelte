<script>
  import {user, schoolNames} from '../store.js'
  import {insertEnrollment} from '../apiCalls/enroll.js'

  let localSchools = []
  let selectedSchool = ''
  let message = ''
  let feedback = ''

  schoolNames.subscribe((schools) => {
    localSchools = schools.filter((school) => !`${school.title}`.toLowerCase().startsWith('test'))
  })

  function sendForm() {
    insertEnrollment({sid: selectedSchool, message, email: $user.email, uid: $user.uid}).then((res) => {
      feedback = res
    })
  }

</script>
<div class="text-left">
  {#if !feedback}
    <p class="py-6">Oi, det ser ut som om {$user.email} ikke er koblet til en konto hos oss.</p>
    <p class="pb-6">Du kan be om å bli lagt til i systemet.</p>
    {#if localSchools.length > 0}
      <div class="flex flex-col items-start mb-4">
        {#if localSchools.length === 1}
          <div class="mb-2 text-2xl">{localSchools[0].title}</div>
        {/if}
        {#if localSchools.length > 1}
          <label for="my-select" class="mb-2"><span>Velg skole:</span></label>
          <select class="select select-primary w-full max-w-xs" id="my-select" bind:value={selectedSchool}>
            <option value="">Velg skole</option>
            {#each localSchools as school}
              <option value="{school.id}">{school.title}</option>
            {/each}
          </select>
        {/if}
      </div>
      <div  class="flex flex-col items-start">
        <label for="my-textarea" class="mb-2"><span>Melding:</span></label>
        <textarea class="textarea textarea-bordered textarea-xs w-full max-w-xs h-36" id="my-textarea" bind:value={message}></textarea>
      </div>
      <div>
        <button class="btn btn-primary mt-4" on:click={sendForm} disabled={!selectedSchool}>Send forespørsel</button>
      </div>
    {/if}
  {/if}

</div>
{#if feedback}
  <p class="mt-4">Meldingen er sendt til skolen.</p>
{/if}
