<script>
const chatRooms = [
  {id: 1, name: 'chat med klassen'},
  {id: 2, name: 'med lærer 1'},
  {id: 3, name: 'med lærer 2'},
  {id: 4, name: 'med annen elev'}
]
let myInput = null

let selectedRoom = null
function changeRoom(id) {
  selectedRoom = id
  myInput?.focus()
}
</script>

<h1 class="p-4 text-xl">Chat</h1>
<div class="p-4 sm:flex gap-3">
  <div class="sm:border-r p-2 hidden sm:block">
    <ul class="menu bg-base-200 w-56 rounded-box">
      {#each chatRooms as chatRoom}
        <li>
          <button
            on:click={() => changeRoom(chatRoom.id)}
            class={`${chatRoom.id === selectedRoom ? 'bg-primary text-primary-content' : ''} `}>{chatRoom.name}</button>
        </li>
      {/each}
    </ul>
  </div>

  <div class="block sm:hidden mb-3">
    <select bind:value={selectedRoom} class="select select-primary w-full" on:change={() => changeRoom(selectedRoom)}>
      <option disabled selected value={null}>Select a chat room</option>
      {#each chatRooms as chatRoom}
        <option value={chatRoom.id}>{chatRoom.name}</option>
      {/each}
    </select>
  </div>
  {#if selectedRoom}
    <div class="flex flex-col w-full">
      <div>
        <div><small>Navn til noen andre</small></div>
        <div class="chat chat-start">
          <div class="chat-bubble">It's over Anakin, <br />I have the high ground. ({selectedRoom})</div>
        </div>

        <div class="chat chat-end"><small>You</small></div>
        <div class="chat chat-end">
          <div class="chat-bubble">You underestimate my power!</div>
        </div>
      </div>

      <div>
        <input
          bind:this={myInput}
          type="text"
          placeholder="Type here"
          class="input input-bordered input-primary w-full mt-4" />
      </div>
    </div>
  {/if}
</div>
