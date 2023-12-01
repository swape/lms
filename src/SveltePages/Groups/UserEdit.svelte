<script>
import {roles} from '../../constants.ts'
export let user = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  role: 1
}

function roleChange(e) {
  user.role = e.target.value
}
</script>

<div>
  <div class="form-control w-full mb-5">
    <select class="select select-bordered select-accent select-sm w-full max-w-xs" on:change={roleChange}>
      {#each roles as role}
        <option value={role.id}>{role.title}</option>
      {/each}
    </select>
  </div>

  <div class="form-control w-full">
    <label class="label" for="name">
      <span class="label-text">Navn</span>
    </label>
    <input name="name" type="text" class="input input-bordered w-full input-sm" value={user.name} />
  </div>

  <div class="form-control w-full">
    <label class="label" for="lastname">
      <span class="label-text">Etternavn</span>
    </label>
    <input name="lastname" type="text" class="input input-bordered w-full input-sm" value={user.lastName} />
  </div>

  <div class="form-control w-full">
    <label class="label" for="email">
      <span class="label-text">E-post</span>
    </label>
    <input name="email" type="text" class="input input-bordered w-full input-sm" value={user.email} />
  </div>

  <div class="form-control w-full">
    <label class="label" for="phone">
      <span class="label-text">Tlf.nr.</span>
    </label>
    <input name="phone" type="text" class="input input-bordered w-full input-sm" value={user.phone} />
  </div>

  <div class="pt-5">
    <button class="btn btn-primary btn-sm">Lagre</button>
  </div>
</div>
