<script lang="ts">
  import {codeLanguages} from '$lib/utils/code.utils';
  import {i18n} from '$lib/stores/i18n.store';
  import {createEventDispatcher} from 'svelte';
  import type {LanguageCode} from '$lib/types/code';

  const dispatch = createEventDispatcher();

  let languages: LanguageCode[] = codeLanguages();

  export let language: string;
</script>

<label for="language"><small>{$i18n.editor.language}:</small></label>

<select bind:value={language} id="language" on:change={() => dispatch('papyCodeLanguage')}>
  {#each languages as { language, title }}
    <option value={language}> {title} </option>
  {/each}
</select>

<style lang="scss">
  select {
    max-width: 100%;
  }
</style>
