<script lang="ts">
  import {user} from '$lib/stores/user.store';
  import {IconUser} from '@papyrs/ui';
  import {i18n} from '$lib/stores/i18n.store';
</script>

{#if $user.photoUrl}
  <img loading="lazy" src={$user.photoUrl} alt={$i18n.tools.profile_image} />
{:else}
  <IconUser />
{/if}

<style lang="scss">
  img {
    width: 24px;
    min-height: 24px;
    border: 1px solid black;
  }
</style>
