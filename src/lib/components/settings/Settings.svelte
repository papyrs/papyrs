<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {onMount} from 'svelte';
  import {toastsError} from '$lib/stores/toasts.store';
  import {canistersBalance, canistersControllers} from '$lib/services/admin.services';
  import {formatCycles} from '$lib/utils/number.utils';
  import {getPrincipal} from '$lib/services/auth.services';
  import type {Principal} from '$lib/types/ic';
  import {Spinner} from '@papyrs/ui';
  import AddController from '$lib/components/settings/AddController.svelte';

  let settings: {
    label: string;
    cycles: string;
    canisterId: string;
    controllers: Principal[];
  }[] = [];

  let principal: string | undefined;

  let loading = true;

  const initSettings = async () => {
    try {
      const [{data, storage}, {data: dataControllers, storage: storageControllers}] =
        await Promise.all([canistersBalance(), canistersControllers()]);

      settings = [
        {
          label: 'Data',
          cycles: formatCycles(data.balance),
          canisterId: data.bucketId.toText(),
          controllers: dataControllers
        },
        {
          label: 'Storage',
          cycles: formatCycles(storage.balance),
          canisterId: storage.bucketId.toText(),
          controllers: storageControllers
        }
      ];
    } catch (err) {
      toastsError({
        text: 'Something went wrong while fetching the canisters status.',
        detail: err
      });
    }
  };

  const initPrincipal = async () => {
    try {
      principal = (await getPrincipal())?.toText();
    } catch (err) {
      toastsError({
        text: 'Something went wrong while fetching the principal information.',
        detail: err
      });
    }
  };

  const reloadSettings = async () => {
    loading = true;

    await initSettings();

    loading = false;
  };

  onMount(async () => {
    await Promise.all([initSettings(), initPrincipal()]);

    loading = false;
  });
</script>

{#if !loading}
  <h1>{$i18n.settings.smart_contracts}</h1>

  <p>{$i18n.settings.principal_id}: {principal}</p>

  <div class="grid">
    {#each settings as { cycles, canisterId, label, controllers }}
      <article>
        <h3>{label}</h3>

        <p>Balance: {cycles} cycles</p>
        <p>Canister id: {canisterId}</p>

        <p>Controllers:</p>

        <ul>
          {#each controllers as controller}
            <li>{controller.toText()}</li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>

  <AddController on:papyControllerAdded={reloadSettings} />
{:else}
  <Spinner />
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/grid';
  @use '@papyrs/ui/styles/mixins/card';

  .grid {
    @include grid.posts;

    grid-template-columns: 1fr;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, calc((100% - (1 * 0.75rem)) / 2));
    }

    margin-bottom: 1.45rem;
  }

  article {
    @include card.card(false);
  }

  ul {
    font-size: var(--font-size-very-small);
    margin: 0;
    padding: 0 0 0 1rem;
  }
</style>
