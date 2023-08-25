<script>
import {rooms} from '../store.js'
import Card from '../components/Card.svelte'
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 gap-3 m-4 xl:grid-cols-3">
  {#each $rooms as room}
    <Card title={room.title}>
      <p>{room.description}</p>
      <div class="card-actions">
        <button class="btn btn-secondary">knappen</button>
      </div>
    </Card>
  {/each}
</section>
