<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';

  let selected = $i18n.lang;
</script>

<h1>{$i18n.settings.customization}</h1>

<p>{$i18n.editor.language}</p>

<select bind:value={selected} on:change={async () => i18n.switchLang(selected)}>
  <option value="de"> Deutsch </option>
  <option value="en"> English </option>
  <option value="es"> Español </option>
  <option value="nl"> Nederlands </option>
</select>

<style lang="scss">
  select {
    margin: 0 0 1.45rem;
  }
</style>
