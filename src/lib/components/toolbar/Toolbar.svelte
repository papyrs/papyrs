<script lang="ts">
  import {auth} from '$lib/stores/auth.store';
  import Menu from '$lib/components/toolbar/Menu.svelte';
  import User from '$lib/components/toolbar/User.svelte';
  import Cloud from '$lib/components/toolbar/Cloud.svelte';
  import Theme from '$lib/components/toolbar/Theme.svelte';
</script>

<nav>
  <Menu />

  <div class:cloud={$auth.authUser !== null}>
    {#if $auth.authUser !== null}
      <Cloud />
    {/if}

    <User />

    <Theme />
  </div>
</nav>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;

    pointer-events: none;

    :global(*) {
      pointer-events: auto;
    }
  }

  div {
    display: grid;
    grid-template-columns: repeat(3, auto);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, auto);

      &.cloud {
        :global(aside) {
          grid-column: 2 / 3;
        }
      }
    }
  }
</style>
