<script>
  import {rooms} from '../../store.js'
  import DateCard from '../../components/DateCard.svelte'

  let roomsList = []

  let infos = [{
    title: 'Dagens lekse',
    date: new Date(),
    dueDate: new Date().setMonth(5),
    description: 'gjør leksen',
    roomId: 2
  },
    {
      title: 'Dagens lekse',
      date: new Date(),
      dueDate: new Date().setMonth(10),
      description: 'gjør leksen',
      roomId: 3
    },
    {
      title: 'Mer lekser',
      date: new Date(),
      dueDate: '2024-02-21T10:39:33.074Z',
      description: 'gjør leksen og masse mer tekst for å se hvordan det blir med flere linjer med tekst. gjør leksen og masse mer tekst for å se hvordan det blir med flere linjer med tekst.',
      roomId: 3
    }
    ]

  rooms.subscribe(value => {
    roomsList = [...value]
  })

  function getRoomName(id) {
    return roomsList.find(room => room.id === id).title || ''
  }

</script>

<section class='m-4 flex gap-3 flex-col'>
  {#each infos as info}
    <div class='bg-base-200 p-3 rounded-md'>
      <div class='flex justify-between'>
        <div class='p-3'>
          <h2 class='text-xl mb-3'>{`${getRoomName(info.roomId)}: ${info.title}`}</h2>
          <p>{info.description}</p>
        </div>
        <div class='flex flex-col text-center'>
          <div class='text-sm'>Frist:</div>
          <DateCard date={info.dueDate}/>
        </div>
      </div>
    </div>
    {/each}

</section>
