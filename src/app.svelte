<script>
import AuthGate from './components/AuthGate.svelte'
import Menu from './components/Menu.svelte'
import RoleIndicator from './components/RoleIndicator.svelte'
import Router from './components/Router.svelte'
</script>

<AuthGate>
  <Menu />
  <main>
    <RoleIndicator />
    <Router />
  </main>
</AuthGate>
