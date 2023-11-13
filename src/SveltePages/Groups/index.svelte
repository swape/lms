<script>
import {roles} from './roles.ts'
import {user} from './user.ts'

import TabArea from '../../components/TabArea.svelte'
import Modal from '../../components/Modal.svelte'
import UserEdit from './UserEdit.svelte'

let activeTab = roles[0]
</script>

<div></div>
<section class="m-4">
  <TabArea bind:activeTab={activeTab} menu={roles} />

  <div class="mt-3 flex justify-between">
    <div class="form-control w-full max-w-xs">
      <label class="label" for="group-filter">
        <span class="label-text">Filter</span>
      </label>
      <input id="group-filter" type="text" placeholder="" class="input input-sm input-bordered w-full max-w-xs" />
    </div>

    <Modal id="add-user" btnClass="btn btn-circle btn-primary btn-sm material-symbols-outlined" openText="add_circle">
      <UserEdit user={user} />
    </Modal>
  </div>

  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Navn</th>
            <th>Grupper</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Klasse2A, Matte2A, Norsk2A</td>
            <td class="flex justify-end"><button class="btn btn-secondary btn-sm">Rediger</button></td>
          </tr>
          <!-- row 2 -->
          <tr class="hover">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Klasse2A, Matte2A, Norsk2A</td>
            <td class="flex justify-end"><button class="btn btn-secondary btn-sm">Rediger</button></td>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Klasse2A, Matte2A, Norsk2A</td>
            <td class="flex justify-end"><button class="btn btn-secondary btn-sm">Rediger</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
