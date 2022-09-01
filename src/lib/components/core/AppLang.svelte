<script lang="ts">
    import {i18n} from "$lib/stores/i18n.store";

    export let selected: Languages;
</script>

<select bind:value={selected} on:change aria-label={$i18n.editor.language}>
    <option value="de"> Deutsch </option>
    <option value="en"> English </option>
    <option value="es"> Español </option>
    <option value="nl"> Nederlands </option>
    <option value="ja"> 日本語 </option>
</select>
