<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {onMount} from 'svelte';
  import {toastsError} from '$lib/stores/toasts.store';
  import {canistersBalance, canistersControllers} from '$lib/services/admin.services';
  import {formatCycles} from '$lib/utils/number.utils';
  import {getPrincipal} from '$lib/services/auth.services';
  import type {Principal} from '$lib/types/ic';
  import {Spinner} from '@papyrs/ui';

  let cycles: {
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

      cycles = [
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

  onMount(async () => {
    await Promise.all([initSettings(), initPrincipal()]);

    loading = false;
  });
</script>

{#if !loading}
  <h1>{$i18n.settings.smart_contracts}</h1>

  <div class="grid">
    {#each cycles as { cycles, canisterId, label, controllers }}
      <article>
        <h3>{label}</h3>

        <p>Balance: {cycles} cycles</p>
        <p>Canister id: {canisterId}</p>

        <p class="controllers">Controllers:</p>

        {#each controllers as controller}
          <p>{controller.toText()}</p>
        {/each}
      </article>
    {/each}
  </div>

  <p>{$i18n.settings.principal_id}: {principal}</p>
{:else}
  <Spinner />
{/if}

<style lang="scss">
  @use '@papyrs/ui/styles/mixins/grid';
  @use '@papyrs/ui/styles/mixins/card';

  .grid {
    @include grid.posts;

    margin-bottom: 1.45rem;
  }

  article {
    @include card.card(false);
  }

  .controllers {
    padding: var(--padding) 0 0;
  }
</style>
