<script lang="ts">
  import Nav from '$lib/components/core/Nav.svelte';
  import {auth} from '$lib/stores/auth.store';
  import {i18n} from '$lib/stores/i18n.store';
  import SignIn from '$lib/components/core/SignIn.svelte';
  import Cycles from '$lib/components/billing/Cycles.svelte';
</script>

<Nav />

<main>
  {#if !$auth.authUser}
    <SignIn text={$i18n.settings.access_settings} />
  {:else}
    <section>
      <Cycles />
    </section>
  {/if}
</main>

<style lang="scss">
  section {
    margin-bottom: 2.45rem;
  }
</style>
