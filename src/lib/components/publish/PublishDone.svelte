<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import I18n from '$lib/components/ui/I18n.svelte';
  import {share} from '$lib/services/share.services.ts';

  const keywordIndex = Math.floor(Math.random() * 4);

  const keywords: string[] = [
    $i18n.publish_done.hooray,
    $i18n.publish_done.did_it,
    $i18n.publish_done.applause,
    $i18n.publish_done.thumbs_up
  ];
</script>

<h1>{keywords[keywordIndex]}! {$i18n.publish_done.post_published}</h1>

<p>
  <I18n text={$i18n.publish_done.share} placeholder={`{0}`}
    ><a on:click={async () => await share()}>{$i18n.editor.share}</a></I18n>
</p>

<button on:click={async () => await share()} type="button">
  {$i18n.editor.share}
</button>
