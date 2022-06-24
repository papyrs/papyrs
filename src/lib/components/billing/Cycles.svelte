<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {onMount} from 'svelte';
  import {toasts} from '$lib/stores/toasts.store';
  import {canistersBalance} from '$lib/services/admin.services';
  import {formatCycles} from '$lib/utils/number.utils';
  import {getPrincipal} from '../../services/auth.services';
  import {i18nFormat} from '../../utils/i18n.utils';

  let cycles: {
    label: string;
    cycles: string;
    canisterId: string;
  }[] = [];

  let principal: string | undefined;

  const initCycles = async () => {
    try {
      const {data, storage} = await canistersBalance();

      cycles = [
        {
          label: 'Data',
          cycles: formatCycles(data.balance),
          canisterId: data.bucketId.toText()
        },
        {
          label: 'Storage',
          cycles: formatCycles(storage.balance),
          canisterId: storage.bucketId.toText()
        }
      ];
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while fetching the canisters status.',
        detail: err
      });
    }
  };

  const initPrincipal = async () => {
    try {
      principal = (await getPrincipal())?.toText();
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while fetching the principal information.',
        detail: err
      });
    }
  };

  onMount(async () => await Promise.all([initCycles(), initPrincipal()]));
</script>

<h1>{$i18n.nav.billing}</h1>

<p>{$i18n.billing.beta}</p>

<h2>{$i18n.billing.smart_contracts}</h2>

<div class="grid">
  {#each cycles as { cycles, canisterId, label }}
    <article>
      <h3>{label}</h3>

      <p>Balance: {cycles} cycles</p>
      <p>Canister id: {canisterId}</p>
    </article>
  {/each}
</div>

<p>{$i18n.billing.principal_id}: {principal}</p>

<p>
  {@html i18nFormat($i18n.billing.cycles, [
    {
      placeholder: '{0}',
      value:
        '<a href="https://internetcomputer.org/docs/current/concepts/tokens-cycles/" rel="external noopener norefferer">Cycles</a>'
    },
    {
      placeholder: '{1}',
      value: '<a href="https://discord.gg/EV76WqDuZW" rel="external noopener norefferer">Discord</a>'
    }
  ])}
</p>

<style lang="scss">
  @use '../../themes/mixins/grid';
  @use '../../themes/mixins/card';

  .grid {
    @include grid.posts;

    margin-bottom: 1.45rem;
  }

  article {
    @include card.card(false);
  }
</style>
