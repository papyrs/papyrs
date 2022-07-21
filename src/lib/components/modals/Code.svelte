<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher, onMount, tick} from 'svelte';
  import {importDeckGoMonacoEditor} from '$lib/utils/import.utils';
  import {emit} from '$lib/utils/events.utils';
  import type {PapyModalCodeDetail} from '$lib/types/modal';
  import type {MonacoEditorOptions} from '@deckdeckgo/monaco-editor';
  import CodeLanguage from '$lib/components/code/CodeLanguage.svelte';
  import type {SaveCode} from '$lib/types/code';
  import Checkbox from '$lib/components/ui/Checkbox.svelte';
  import Spinner from '../ui/Spinner.svelte';
  import {codeOptions, saveCodeOptions} from '../../utils/code.utils';

  // Load workers from unpkg because there is an unresolved issue with Fleek while fetching ts.worker.js
  // Fleek return an error 502 - Internal server error trying to get the file

  /* eslint-disable */
  // @ts-ignore
  self.MonacoEnvironment = self.MonacoEnvironment ?? {
    getWorkerUrl: function (_moduleId, label) {
      if (label === 'json') {
        return workerImportScript(
          'https://cdn.papy.rs/libs/@deckdeckgo/monaco-editor/1.4.1/workers/json.worker.js'
        );
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return workerImportScript(
          'https://cdn.papy.rs/libs/@deckdeckgo/monaco-editor/1.4.1/workers/css.worker.js'
        );
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return workerImportScript(
          'https://cdn.papy.rs/libs/@deckdeckgo/monaco-editor/1.4.1/workers/html.worker.js'
        );
      }
      if (label === 'typescript' || label === 'javascript') {
        return workerImportScript(
          'https://cdn.papy.rs/libs/@deckdeckgo/monaco-editor/1.4.1/workers/ts.worker.js'
        );
      }
      return workerImportScript(
        'https://cdn.papy.rs/libs/@deckdeckgo/monaco-editor/1.4.1/workers/editor.worker.js'
      );
    }
  };
  /* eslint-enable */

  const workerImportScript = (url: string): string =>
    `data:text/javascript;charset=utf-8,${encodeURIComponent(`
	        importScripts('${url}');`)}`;

  let codeEditor: HTMLDeckgoMonacoEditorElement | null;
  let displayEditor = false;
  let loading = true;

  const loadEditor = async () => {
    await importDeckGoMonacoEditor();

    displayEditor = true;
    loading = false;
  };

  export let detail: PapyModalCodeDetail | undefined = undefined;

  let code: string;
  let options: MonacoEditorOptions | undefined;
  let language: string | 'javascript';
  let lineNumbers: boolean;

  onMount(() => {
    code = detail?.code ?? '';
    options = detail?.options ?? codeOptions();
    language = detail?.options?.language ?? options.language;
    lineNumbers = detail?.options?.lineNumbers === 'on' || options.lineNumbers === 'on';
  });

  const save = async () => {
    const code: string | undefined = await codeEditor?.save();

    await closeEditor();
    emitCode({code, language, lineNumbers});
    dispatch('papyClose');
  };

  const emitCode = (detail: SaveCode | undefined) =>
    emit<SaveCode | undefined>({message: 'papySaveCode', detail});

  const closeEditor = async () => {
    displayEditor = false;

    await tick();
  };

  const dispatch = createEventDispatcher();

  const close = async () => {
    await closeEditor();
    emitCode(undefined);
    dispatch('papyClose');
  };

  const updateLanguage = async () => {
    await codeEditor?.updateLanguage(language);

    saveCodeOptions({
      ...(options ?? {}),
      language
    });
  };

  const updateLineNumbers = () => {
    options = {
      ...(options ?? {}),
      lineNumbers: lineNumbers ? 'on' : 'off'
    };

    saveCodeOptions(options);
  };
</script>

<Modal on:papyClose={async () => await close()} on:introend={loadEditor}>
  <span slot="title">{$i18n.editor.code}</span>

  <section>
    {#if displayEditor}
      <deckgo-monaco-editor
        bind:this={codeEditor}
        {options}
        on:editorDidLoad={() => setTimeout(async () => await codeEditor?.setFocus(), 500)}>
        <code>{@html code}</code>
      </deckgo-monaco-editor>

      <div class="options">
        <CodeLanguage bind:language on:papyCodeLanguage={updateLanguage} />

        <Checkbox
          bind:checked={lineNumbers}
          on:papyChecked={updateLineNumbers}
          checkboxId="lineNumbers">
          {$i18n.editor.display_line_number}
        </Checkbox>
      </div>
    {/if}
  </section>

  <button type="button" slot="footer" on:click={save} disabled={!displayEditor}>
    {$i18n.core.save}
  </button>

  {#if loading}
    <Spinner />
  {/if}
</Modal>

<style lang="scss">
  @use '../../themes/mixins/shadow';

  section {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: calc(100% - (2 * 1.45rem) - 80px) 80px;
    grid-gap: 1.45rem;

    height: calc(100% - (2 * 1.45rem));
    max-width: 100%;

    @media (min-width: 768px) {
      --grid-code-width: calc(100% - 1.45rem);
      grid-template-columns: calc(var(--grid-code-width) * 0.8) calc(var(--grid-code-width) * 0.2);
      grid-template-rows: auto;
    }
  }

  deckgo-monaco-editor {
    display: block;

    @include shadow.strong;
  }

  .options {
    display: flex;
    flex-direction: column;
  }
</style>
