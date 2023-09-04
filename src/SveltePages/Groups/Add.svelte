<script>

  const menuList = [{
    id: 1,
    title: 'Studenter',
  },
    {
      id: 2,
      title: 'Lærere'
    },
    {
      id: 3,
      title: 'Admin'
    }
  ]
let activeTabId = 1
  function changeTab(id){
    activeTabId = id
  }

  function addUser(){

  }

</script>
<div>

</div>
<section class="m-4">
  <div class="tabs tabs-boxed">
    {#each menuList as menu}
    <button class={`tab ${activeTabId === menu.id ?'tab-active':''}`} on:click={()=>changeTab(menu.id)}>{menu.title}</button>
      {/each}
  </div>

  <div class='mt-3 flex justify-between'>

    <div class="form-control w-full max-w-xs">
      <label class="label" for='group-filter'>
        <span class="label-text">Filter</span>
      </label>
      <input id="group-filter" type="text" placeholder="" class="input input-sm input-bordered w-full max-w-xs" />
    </div>


    <button class="btn btn-circle btn-primary btn-sm" on:click={()=>addUser()}>
    <span class="material-symbols-outlined">
add_circle
</span>
  </button></div>

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
          <td class='flex justify-end'><button class='btn btn-secondary btn-sm'>Rediger</button></td>
        </tr>
        <!-- row 2 -->
        <tr class="hover">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Klasse2A, Matte2A, Norsk2A</td>
          <td class='flex justify-end'><button class='btn btn-secondary btn-sm'>Rediger</button></td>
        </tr>
        <!-- row 3 -->
        <tr>
          <th>3</th>
          <td>Brice Swyre</td>
          <td>Klasse2A, Matte2A, Norsk2A</td>
          <td class='flex justify-end'><button class='btn btn-secondary btn-sm'>Rediger</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>


</section>