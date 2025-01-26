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

<div class="form-container">
  {#if !feedback}
    <p>Oi, det ser ut som om {$user.email} ikke er koblet til en konto hos oss.</p>
    <p>Du kan be om å bli lagt til i systemet.</p>
    {#if localSchools.length > 0}
      <div>
        {#if localSchools.length === 1}
          <div>{localSchools[0].title}</div>
        {/if}
        {#if localSchools.length > 1}
          <label for="my-select"><span>Velg skole:</span></label>
          <select id="my-select" bind:value={selectedSchool}>
            <option value="">Velg skole</option>
            {#each localSchools as school}
              <option value={school.id}>{school.title}</option>
            {/each}
          </select>
        {/if}
      </div>

      <div>
        <label for="my-name"><span>Navn:</span></label>
        <input id="my-name" bind:value={name} type="text" />
      </div>

      <div>
        <label for="my-textarea"><span>Melding:</span></label>
        <textarea
          class="textarea textarea-bordered textarea-xs w-full max-w-xs h-36"
          id="my-textarea"
          bind:value={message}></textarea>
      </div>
      <div>
        <button onclick={sendForm} disabled={!selectedSchool || name?.length < 2}>Send forespørsel</button>
      </div>
    {/if}
  {/if}
</div>
{#if feedback}
  <p>{feedback}</p>
{/if}

<style>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
label {
  display: block;
  margin-block-end: 0.5rem;
}

p {
  margin: 0.5rem 0;
}

textarea {
  width: 100%;
  min-height: 12ch;
}

@media (max-width: 768px) {
  .form-container {
    gap: 0.5rem;
  }

  button,
  select,
  input {
    width: 100%;
  }
}
</style>
