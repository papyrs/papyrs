<script lang="ts">
  import Nav from '$lib/components/core/Nav.svelte';
  import Profile from '$lib/components/profile/Profile.svelte';
  import DeleteUser from '$lib/components/profile/DeleteUser.svelte';
  import Customization from '$lib/components/profile/Customization.svelte';
  import {auth} from '$lib/stores/auth.store';
</script>

<Nav />

<main>
  <section class="profile">
    <Customization />

    {#if $auth.loggedIn}
      <Profile />
    {/if}

    {#if $auth.loggedIn}
      <DeleteUser />
    {/if}
  </section>
</main>
