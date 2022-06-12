<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher, onMount, tick} from 'svelte';
  import {importDeckGoExcalidraw} from '$lib/utils/import.utils';
  import {emit} from '$lib/utils/events.utils';
  import Spinner from '../ui/Spinner.svelte';
  import type {StorageFile} from '@deckdeckgo/editor';
  import {uploadOfflineFile} from '@deckdeckgo/offline';
  import type {SaveExcalidraw} from '../../types/excalidraw';
  import type {PapyModalExcalidrawDetail} from '../../types/modal';
  import {fetchAsset} from '@deckdeckgo/sync';
  import {reviver} from 'excalidraw-cmp';

  let codeEditor: HTMLDeckgoMonacoEditorElement | null;
  let displayEditor = false;
  let loading = true;

  const loadEditor = async () => {
    await importDeckGoExcalidraw();

    displayEditor = true;
    loading = false;
  };

  export let detail: PapyModalExcalidrawDetail | undefined = undefined;

  let dataFilename: string | undefined = undefined;
  let scene;

  onMount(async () => {
    const dataSrc: string | undefined = detail?.dataSrc;

    dataFilename = dataSrc?.split('/').pop().split('.').shift();

    const data: string | undefined = dataSrc !== undefined ? await fetchAsset(dataSrc) : undefined;
    scene = data !== undefined ? JSON.parse(data, reviver) : undefined;
  });

  const blobToFile = ({blob, filename}: {blob: Blob; filename: string}): File => {
    return new File([blob], filename, {lastModified: new Date().getTime(), type: blob.type});
  };

  const save = async () => {
    const filename = dataFilename ?? `excalidraw-${new Date().getTime()}`;

    const blob: Blob = await codeEditor.toBlob();
    const imgFile: StorageFile = await uploadOfflineFile(
      blobToFile({blob, filename: `${filename}.webp`}),
      'images',
      10485760
    );

    const data: Blob = await codeEditor.exportScene();
    const dataFile: StorageFile = await uploadOfflineFile(
      blobToFile({blob: data, filename: `${filename}.json`}),
      'data',
      10485760
    );

    await closeEditor();
    emitExcalidraw({imgFile, dataFile});
    dispatch('papyClose');
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
    <my-component bind:this={codeEditor} {scene} />
  {/if}

  <button slot="footer" type="button" on:click={save} disabled={!displayEditor}>
    {$i18n.core.save}
  </button>

  {#if loading}
    <Spinner />
  {/if}
</Modal>

<style lang="scss">
  @use '../../themes/mixins/shadow';

  my-component {
    display: block;

    @include shadow.strong;

    :global(.excalidraw .Island) {
      @include shadow.strong;
    }
  }

  .actions {
    display: flex;
    justify-content: center;

    @media (min-width: 768px) {
      grid-column: 1 / 3;
    }
  }

  .options {
    display: flex;
    flex-direction: column;
  }
</style>
