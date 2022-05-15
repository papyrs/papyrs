<script lang="ts">
  import I18n from '$lib/components/ui/I18n.svelte';
  import {i18n} from '$lib/stores/i18n.store';

  export let text: string;
</script>

<section>
  <p><I18n {text} placeholder={`{0}`}><a href="/signin">{$i18n.nav.sign_in}</a></I18n></p>
</section>
