<script>
  import {rooms} from '../../store.js'
  import Card from '../../components/Card.svelte'

  let roomsList = []

  let infos = [{
    title: 'Dagens lekse',
    date: new Date(),
    dueDate: '2020-10-10',
    description: 'gjør leksen',
    roomId: 2
  },
    {
      title: 'Dagens lekse',
      date: new Date(),
      dueDate: '2020-10-20',
      description: 'gjør leksen',
      roomId: 3
    }]

  rooms.subscribe(value => {
    roomsList = [...value]
  })

  function getRoomName(id) {
    return roomsList.find(room => room.id === id).title || ''
  }

</script>

<section class='m-4 flex gap-3 flex-col'>
  {#each infos as info}
    <Card title={`${getRoomName(info.roomId)}: ${info.title}`}>
      <p>{info.description}</p>
      <div>Frist: <small>{info.dueDate}</small></div>
    </Card>
    {/each}

</section>
