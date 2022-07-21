<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher, onMount} from 'svelte';
  import I18n from '$lib/components/ui/I18n.svelte';
  import {TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH} from '$lib/constants/constants';
  import {validateCanonical, validateDescription, validTitle} from '$lib/utils/input.utils';
  import {importDeckGoSocialImg} from '$lib/utils/import.utils';
  import {doc} from '$lib/stores/doc.store';
  import {toasts} from '$lib/stores/toasts.store';
  import {busy} from '$lib/stores/busy.store';
  import {primaryColor} from '../../utils/theme.utils';
  import PublishSubmitFeed from './PublishSubmitFeed.svelte';
  import {publish} from '../../services/publish.services';

  const dispatch = createEventDispatcher();

  onMount(async () => await importDeckGoSocialImg());

  const handleSubmit = async ($event: MouseEvent | TouchEvent) => {
    $event.preventDefault();

    if (!validTitleInput) {
      return;
    }

    busy.start(true);

    try {
      await publish({
        inputs: {
          name: title,
          description,
          tags: tags?.split(',') || [],
          github: false,
          canonical
        },
        submitFeed
      });

      dispatch('papyPublished');
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while publishing.',
        detail: err
      });
    }

    busy.stop();
  };

  let alreadyPublished = $doc.doc?.data?.meta?.published ?? false;
  let alreadySubmitFeed = $doc.doc?.data?.meta?.feed ?? false;

  let title: string | undefined = $doc.doc?.data?.meta?.title ?? $doc.doc?.data?.name;
  let description: string | undefined = $doc.doc?.data?.meta?.description;
  let canonical: string | undefined = $doc.doc?.data?.meta?.canonical;
  let tags: string | undefined = $doc.doc?.data?.meta?.tags?.join(',');
  let submitFeed = $doc.doc?.data?.meta?.feed ?? false;

  let validTitleInput = false;
  let validCanonicalInput = false;
  let validDescriptionInput = false;

  $: validTitleInput = validTitle(title);
  $: validCanonicalInput = !canonical || canonical.length === 0 || validateCanonical(canonical);
  $: validDescriptionInput = validateDescription(description);

  const color: string = primaryColor();
</script>

<h1>
  {#if alreadyPublished}
    {$i18n.publish_edit.update_published}
  {:else}
    {$i18n.nav.ready_to_share}
  {/if}
</h1>

<form
  on:submit={async ($event) => await handleSubmit($event)}
  on:keypress={($event) => {
    $event.key === 'Enter' && $event.preventDefault();
  }}>
  <deckgo-social-img text={title || ''} rect-color={color} />

  <input
    bind:value={title}
    aria-label={$i18n.publish_edit.title}
    name="title"
    placeholder={$i18n.publish_edit.title}
    type="text"
    maxlength={TITLE_MAX_LENGTH}
    class="title"
    required />

  <p class="title-info" class:invalid={!validTitleInput && title?.length > 0}>
    <I18n text={$i18n.publish_edit.title_max_chars} placeholder={`{0}`}>{TITLE_MAX_LENGTH}</I18n>
  </p>

  <textarea
    class="description"
    name="description"
    placeholder={$i18n.publish_edit.description}
    rows={5}
    bind:value={description}
    maxlength={DESCRIPTION_MAX_LENGTH} />

  <input
    bind:value={canonical}
    aria-label={$i18n.publish_edit.canonical_url}
    name="canonical"
    placeholder={$i18n.publish_edit.canonical_url}
    type="text"
    class="canonical" />

  <input
    bind:value={tags}
    aria-label={$i18n.publish_edit.tags}
    name="tags"
    placeholder={$i18n.publish_edit.tags}
    type="text"
    class="tags" />

  <PublishSubmitFeed bind:submitFeed disabled={alreadyPublished && alreadySubmitFeed} />

  <button
    type="submit"
    disabled={!validTitleInput || !validCanonicalInput || !validDescriptionInput}>
    {#if alreadyPublished}
      {$i18n.publish_edit.update_now}
    {:else}
      {$i18n.publish_edit.publish_now}
    {/if}
  </button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, calc((100% - 0.75rem) / 2));
      grid-column-gap: 0.75rem;
    }
  }

  deckgo-social-img {
    position: fixed;
    left: 100vw;
    --text-font-size: 96px;
  }

  .title {
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .title-info {
    font-size: var(--font-size-very-small);
    grid-column-start: 1;
    grid-column-end: 2;
    padding: 0.45rem;

    &.invalid {
      color: var(--color-error);
    }
  }

  .description {
    grid-row-start: 1;
    grid-column-start: 2;
    grid-row-end: 3;
  }

  .canonical {
    grid-row-start: 3;
    grid-column-start: 2;
  }

  button {
    grid-column-start: 1;
    grid-column-end: 3;
    justify-self: center;
  }
</style>
