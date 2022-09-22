<script lang="ts">
  import type {I18n, StyloConfig} from '@papyrs/stylo';
  import {onDestroy, onMount} from 'svelte';
  import type {Components} from '@deckdeckgo/studio';
  import {editorConfig} from '$lib/config/editor';
  import type {Unsubscriber} from 'svelte/store';
  import {i18n} from '$lib/stores/i18n.store';
  import {importStudio} from '$lib/utils/import.utils';
  import {Spinner} from '@papyrs/ui';
  import {DocEvents, loadDoc, resetDoc} from '@deckdeckgo/sync';
  import {cleanCopy} from '../../events/copy.events';
  import Quote from '../ui/Quote.svelte';
  import {cleanPaste} from '../../events/paste.events';
  import {docReadyOnce, studioLoaded} from '../../stores/load.store';

  let studioEditorRef: Components.DeckgoStudioDoc | undefined;

  const initStylo = () => {
    if (!studioEditorRef) {
      return;
    }

    updateEditorConfig();

    studioEditorRef.loadDoc = loadDoc;
    studioEditorRef.resetDoc = resetDoc;
  };

  $: studioEditorRef, initStylo();

  let busy = false;

  onMount(async () => {
    await importStudio();

    studioLoaded.set(true);
  });

  let config: Partial<StyloConfig> = editorConfig;

  const updateEditorConfig = () => {
    config = {
      ...config,
      i18n: {
        lang: $i18n.lang,
        custom: {...$i18n.editor}
      } as unknown as I18n
    };

    if (!studioEditorRef) {
      return;
    }

    studioEditorRef.styloConfig = config;
  };

  const i18nUnsubscribe: Unsubscriber = i18n.subscribe(() => updateEditorConfig());

  const docEvent: DocEvents = DocEvents.getInstance();
  let docReady = false;

  const onDocDidLoad = ({detail: containerRef}: CustomEvent<HTMLElement>) => {
    docEvent.initDomEvents(containerRef);
    docEvent.initDataEvents();
  };

  const onDocReady = ({detail}: CustomEvent<boolean>) => {
    docReady = detail;
    docReadyOnce.set($docReadyOnce || detail);
  };

  const onDocDataEvents = ({detail}: CustomEvent<'destroy' | 'init'>) => {
    if (detail === 'destroy') {
      docEvent.destroyDataEvents();
      return;
    }

    docEvent.initDataEvents();
  };

  const initNewDoc = () => studioEditorRef?.init();

  const onBusy = ({detail: busyDoc}: CustomEvent<boolean>) => (busy = busyDoc);

  onDestroy(i18nUnsubscribe);
</script>

<svelte:window on:papyReloadEditor={initNewDoc} on:ddgBusy={onBusy} on:papySignOut={initNewDoc} />

<main on:copy={cleanCopy} on:paste={cleanPaste}>
  {#if $studioLoaded}
    <deckgo-studio-doc
      bind:this={studioEditorRef}
      on:docDidLoad={onDocDidLoad}
      on:docDataEvents={onDocDataEvents}
      on:docReady={onDocReady} />

    <deckgo-doc-indicator {busy} />
  {/if}

  {#if !$studioLoaded || !docReady}
    <Spinner />

    {#if !$docReadyOnce}
      <Quote />
    {/if}
  {/if}
</main>

<style lang="scss">
  @use "../../../../node_modules/@papyrs/ui/styles/mixins/stylo";
  @use "../../../../node_modules/@papyrs/ui/styles/mixins/doc";

  main {
    --spinner-position: fixed;

    @media (min-width: 768px) {
      --nav-height: 0.95rem;
    }
  }

  :global(deckgo-studio-doc) {
    @include stylo.editor;
  }

  :global(deckgo-studio-doc article.deckgo-doc) {
    @include doc.article;
    @include doc.placeholder;

    :global {
      @include doc.paragraphs;
      @include doc.spacing;
    }
  }
</style>
