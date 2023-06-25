<script lang="ts">
  import Nav from '$lib/components/core/Nav.svelte';
  import {auth} from '$lib/stores/auth.store';
  import {i18n} from '$lib/stores/i18n.store';
  import SignIn from '$lib/components/core/SignIn.svelte';
  import Posts from '$lib/components/posts/Posts.svelte';
</script>

<Nav />

<main>
  {#if !$auth.authUser}
    <SignIn text={$i18n.profile.access_posts} />
  {:else}
    <Posts />
  {/if}
</main>
