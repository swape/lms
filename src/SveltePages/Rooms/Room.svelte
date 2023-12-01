<script>
import {currentRoom} from '../../store.js'
import TabArea from '../../components/TabArea.svelte'
import {roomSections} from '../../constants.ts'

let activeTab = roomSections[0]
</script>

<section class="m-4">
  <div class="flex gap-3 items-center">
    <button type="button" class="btn btn-primary btn-circle btn-sm" on:click={() => ($currentRoom = null)}>
      <span class="material-symbols-outlined">chevron_left</span>
    </button>
    <h1 class="text-3xl">{$currentRoom.title}</h1>
  </div>

  <p class="p-4 ml-7">{$currentRoom.description}</p>
  <div class="mt-3">
    <TabArea bind:activeTab={activeTab} menu={roomSections} />
    {activeTab.title}
  </div>
</section>
