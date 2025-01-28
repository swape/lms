<script>
import {user, schoolNames} from '../store.js'
import {getEnrollmentsFromEmail, insertEnrollment} from '../apiCalls/enroll.js'

let localSchools = $state([])
let selectedSchool = $state('')
let message = $state('')
let name = $state('')
let feedback = $state('')

schoolNames.subscribe(async (schools) => {
  if (!schools || schools.length === 0) {
    return
  }
  localSchools = schools.filter((school) => !`${school.title}`.toLowerCase().startsWith('test'))
  const enrollments = await getEnrollmentsFromEmail($user.email)

  if (enrollments.length > 0) {
    feedback = 'Du har allerede sendt en forespørsel. Administratoren vil legge deg i systemet så snart som mulig.'
  }
})

async function sendForm() {
  await insertEnrollment({sid: selectedSchool, message, email: $user.email, uid: $user.id, name})
  feedback = 'Meldingen er sendt til skolen. Administratoren vil legge deg i systemet så snart som mulig.'
}
</script>

<div class="max-w-auto flex flex-col gap-4 items-center mt-4">
  {#if !feedback}
    <p>Oi, det ser ut som om {$user.email} ikke er koblet til en konto hos oss.</p>
    <p>Du kan be om å bli lagt til i systemet.</p>
    {#if localSchools.length > 0}
      <div class="text-left flex flex-col gap-4 max-w-80">
        <div>
          {#if localSchools.length === 1}
            <div>{localSchools[0].title}</div>
          {/if}
          {#if localSchools.length > 1}
            <label for="my-select"><span>Velg skole:</span></label>
            <select id="my-select" class="select" bind:value={selectedSchool}>
              <option value="">Velg skole</option>
              {#each localSchools as school}
                <option value={school.id}>{school.title}</option>
              {/each}
            </select>
          {/if}
        </div>

        <div>
          <label for="my-name"><span>Navn:</span></label>
          <input id="my-name" bind:value={name} type="text" class="input" />
        </div>

        <div>
          <label for="my-textarea"><span>Melding:</span></label>
          <textarea id="my-textarea" class="textarea" bind:value={message}></textarea>
        </div>
        <div>
          <button class="btn btn-primary" onclick={sendForm} disabled={!selectedSchool || name?.length < 2}
            >Send forespørsel
          </button>
        </div>
      </div>
    {/if}
  {/if}
</div>
{#if feedback}
  <p class="text-center p-4">{feedback}</p>
{/if}
