<script lang="ts">
  import type {CountInteraction} from '../../types/interaction';
  import {IconThumbUp} from '@papyrs/ui';
  import type {Doc, Interaction} from '@deckdeckgo/editor';
  import {busy} from '../../stores/busy.store';
  import {toastsError} from '../../stores/toasts.store';
  import {likeDislike} from '../../services/like.services';
  import {i18n} from '$lib/stores/i18n.store';

  export let doc: Doc;
  export let interaction: CountInteraction | undefined;

  let like: Interaction | undefined;
  let countLikes: bigint;
  $: ({like, countLikes} = interaction);

  let processing = false;

  const onClick = async () => {
    busy.start();

    processing = true;

    try {
      like = {...(await likeDislike({docId: doc.id, like}))};
      countLikes = countLikes + (like?.data.like === true ? 1n : -1n);
    } catch (err) {
      toastsError({
        text: 'Something went wrong while liking the post.',
        detail: err
      });
    }

    processing = false;

    busy.stop();
  };
</script>

{#if interaction !== undefined}
  <button
    class="icon"
    type="button"
    on:click|stopPropagation={async () => await onClick()}
    aria-label={like?.data.like === true ? $i18n.interaction.dislike : $i18n.interaction.like}
    disabled={processing}>
    <IconThumbUp fill={like?.data.like === true} />
    <p>{countLikes}</p>
  </button>
{/if}

<style lang="scss">
  button {
    position: absolute;
    left: 0;

    display: flex;
    align-items: flex-end;

    gap: 0.35rem;
    padding: 0.45rem;

    p {
      font-size: var(--font-size-small);
      margin: 0;
    }
  }
</style>
