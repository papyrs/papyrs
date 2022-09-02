<script lang="ts">
  import type {Doc} from '@deckdeckgo/editor';
  import {share} from '$lib/services/share.services';
  import {i18n} from '$lib/stores/i18n.store';
  import {IconShare} from '@papyrs/ui';

  export let doc: Doc;
</script>

<button
  class="icon"
  type="button"
  on:click|stopPropagation={async () => await share(doc)}
  aria-label={$i18n.editor.share}>
  <IconShare />
</button>
