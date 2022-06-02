<script lang="ts">
  import {onMount} from 'svelte';
  import {initAuth, loadSignIn} from '$lib/services/auth.services';
  import {i18n} from '$lib/stores/i18n.store';
  import {goto} from '$app/navigation';
  import Nav from '$lib/components/core/Nav.svelte';
  import Spinner from '$lib/components/ui/Spinner.svelte';
  import {toasts} from '$lib/stores/toasts.store';
  import WhatsII from "../lib/components/modals/WhatsII.svelte";

  let loaded = false;

  let config: Record<string, string> = {};

  onMount(async () => {
    config = {
      terms: 'https://app.papy.rs/terms.html',
      privacy: 'https://app.papy.rs/privacy.html'
    };

    await loadSignIn();

    loaded = true;
  });

  const onSignInSuccess = async () => {
    await goto('/', {replaceState: true});

    await initAuth();
  };

  const onSignInError = (err?: string) =>
    toasts.error({
      text: 'Something went wrong while sign-in.',
      detail: err
    });
</script>

<Nav />

<main>
  <section class="overview">
    <h1>{$i18n.sign_in.title}</h1>

    <p>{$i18n.sign_in.overview}</p>
  </section>

  <section class="sign-in">
    {#if loaded}
      <ic-signin
        i18n={$i18n}
        on:ddgSignInSuccess={onSignInSuccess}
        on:ddgSignInError={onSignInError}
        {config}>
        <div slot="spinner">
          <Spinner />
        </div>
      </ic-signin>

      <WhatsII />
    {:else}
      <Spinner />
    {/if}
  </section>
</main>

<style lang="scss">
  ic-signin {
    --padding: 3rem;
    --font-size-very-small: var(--font-size-ultra-small);

    :global(p.terms) {
      margin-bottom: 0;
      padding-bottom: 0.45rem;
    }
  }

  main {
    @media (min-height: 500px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    @supports (-webkit-touch-callout: none) {
      padding: inherit;
      height: -webkit-fill-available;
    }
  }

  section {
    margin: 0.75rem auto;
    max-width: 720px;

    position: relative;
  }

  .overview {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) {
      flex-grow: unset;
    }

    margin-bottom: 0.25rem;

    p {
      margin-bottom: 0;
    }
  }

  .sign-in {
    min-height: 180px;

    @media (min-width: 768px) {
      margin-bottom: 4rem;
    }
  }

  p,
  h1 {
    text-align: center;
  }

  h1 {
    --bigger-title: 1.2;
    font-size: calc(var(--font-size-h1) * var(--bigger-title));

    line-height: 1.1;
    margin-bottom: 1.75rem;

    @media (min-width: 768px) {
      --bigger-title: 2;
    }
  }

  p {
    font-size: var(--font-size-h3);
  }
</style>
