<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher, onMount, tick} from 'svelte';
  import {importDeckGoExcalidraw} from '$lib/utils/import.utils';
  import {emit} from '$lib/utils/events.utils';
  import Spinner from '../ui/Spinner.svelte';
  import type {SaveExcalidraw} from '../../types/excalidraw';
  import type {PapyModalExcalidrawDetail} from '../../types/modal';
  import type {ExcalidrawScene} from '@deckdeckgo/excalidraw';
  import {toasts} from '../../stores/toasts.store';
  import {exportExcalidraw, loadExcalidrawScene} from '../../utils/exclidraw.utils';

  let excalidraw: HTMLDeckgoExcalidrawElement | null;
  let displayEditor = false;
  let loading = true;

  const loadEditor = async () => {
    await importDeckGoExcalidraw();

    displayEditor = true;
    loading = false;
  };

  export let detail: PapyModalExcalidrawDetail | undefined = undefined;

  let dataFilename: string | undefined = undefined;
  let scene: ExcalidrawScene | undefined = undefined;

  const fetchScene = async (dataSrc: string | undefined) => {
    try {
      scene = await loadExcalidrawScene(dataSrc);
    } catch (err) {
      scene = undefined;

      toasts.error({
        text: 'Excalidraw scene cannot be loaded.'
      });
    }
  };

  onMount(async () => {
    window.EXCALIDRAW_ASSET_PATH = import.meta.env.VITE_EXCALIDRAW_ASSET_PATH as string;

    const dataSrc: string | undefined = detail?.dataSrc;

    dataFilename = dataSrc?.split('/').pop().split('.').shift();

    await fetchScene(dataSrc);
  });

  const save = async () => {
    if (!excalidraw) {
      toasts.error({
        text: 'Excalidraw is not loaded.'
      });

      return;
    }

    const filename = dataFilename ?? `excalidraw-${new Date().getTime()}`;

    try {
      const {imgFile, dataFile} = await exportExcalidraw({excalidraw, filename});

      await closeEditor();
      emitExcalidraw({imgFile, dataFile});
      dispatch('papyClose');
    } catch (err) {
      toasts.error({
        text: 'Excalidraw scene cannot be exported.'
      });
    }
  };

  const emitExcalidraw = (detail: SaveExcalidraw | undefined) =>
    emit<SaveExcalidraw | undefined>({message: 'papySaveExcalidraw', detail});

  const closeEditor = async () => {
    displayEditor = false;

    await tick();
  };

  const dispatch = createEventDispatcher();

  const close = async () => {
    await closeEditor();
    emitExcalidraw(undefined);
    dispatch('papyClose');
  };
</script>

<Modal on:papyClose={async () => await close()} on:introend={loadEditor}>
  <span slot="title">Excalidraw</span>

  {#if displayEditor}
    <deckgo-excalidraw bind:this={excalidraw} {scene} />
  {/if}

  <button slot="footer" type="button" on:click={save} disabled={!displayEditor || !excalidraw}>
    {$i18n.core.save}
  </button>

  {#if loading}
    <Spinner />
  {/if}
</Modal>

<style lang="scss">
  @use '../../themes/mixins/shadow';

  deckgo-excalidraw {
    display: block;

    @include shadow.strong;

    :global(.excalidraw .Island) {
      @include shadow.strong;
    }
  }
</style>
