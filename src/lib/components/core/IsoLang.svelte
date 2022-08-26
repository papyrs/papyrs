<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import {ISO_639_1_LANGUAGES} from '$lib/constants/languages';

  export let selected: Languages;
</script>

<select bind:value={selected} on:change aria-label={$i18n.publish_edit.language}>
  {#each ISO_639_1_LANGUAGES as { name, code }}
    <option value={code}> {name} </option>
  {/each}
</select>
