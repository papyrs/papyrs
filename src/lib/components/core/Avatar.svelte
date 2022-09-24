<script lang="ts">
  import {user} from '$lib/stores/user.store';
  import {Avatar} from '@papyrs/ui';
  import {i18n} from '$lib/stores/i18n.store';
</script>

<Avatar photoUrl={$user.photoUrl} alt={$i18n.tools.profile_image} />
