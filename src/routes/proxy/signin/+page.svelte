<script lang="ts">
  import {onMount} from 'svelte';
  import {loadSignIn} from '$lib/services/auth.services';
  import {i18n} from '$lib/stores/i18n.store';
  import {Spinner} from '@papyrs/ui';
  import WhatsII from '$lib/components/modals/WhatsII.svelte';
  import {icConfig} from '../../../lib/utils/env.utils';

  let loaded = false;
  let inProgress = false;

  let config: Record<string, string | boolean> = {};

  onMount(async () => {
    config = {
      ...icConfig(),
      terms: 'https://app.papy.rs/terms.html',
      privacy: 'https://app.papy.rs/privacy.html'
    };

    await loadSignIn();

    loaded = true;
  });
</script>

<main>
  <section class="overview">
    <h1>{$i18n.sign_in.title}</h1>

    <p>{$i18n.sign_in.overview}</p>
  </section>

  <section class="sign-in">
    {#if loaded}
      <ic-signin-proxy i18n={$i18n} on:inProgress={() => (inProgress = true)} {config}>
        <div slot="spinner" class="progress">
          <Spinner />
        </div>
      </ic-signin-proxy>

      {#if !inProgress}
        <WhatsII />
      {/if}
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

  .progress {
    margin: 2.75rem;
  }
</style>
