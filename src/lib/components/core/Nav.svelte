<script lang="ts">
  import {IconBack, Button} from '@papyrs/ui';
  import {i18n} from '$lib/stores/i18n.store';
  import {back} from '$lib/utils/nav.utils';
</script>

<nav>
  <Button on:click={async () => await back()}>
    <IconBack slot="icon" />
    {$i18n.core.back}
  </Button>
</nav>
