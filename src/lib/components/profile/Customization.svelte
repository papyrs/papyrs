<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import AppLang from '../core/AppLang.svelte';

  let selected = $i18n.lang;
</script>

<h1>{$i18n.profile.customization}</h1>

<AppLang bind:selected on:change={async () => await i18n.switchLang(selected)} />
