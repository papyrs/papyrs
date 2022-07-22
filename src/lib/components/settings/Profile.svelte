<script lang="ts">
  import {i18n} from '$lib/stores/i18n.store';
  import Avatar from '$lib/components/core/Avatar.svelte';
  import SocialInput from '$lib/components/settings/SocialInput.svelte';
  import {user} from '$lib/stores/user.store';
  import {i18nFormat} from '$lib/utils/i18n.utils';
  import {updateProfile} from '$lib/services/settings.services';
  import {busy} from '$lib/stores/busy.store';
  import {toasts} from '$lib/stores/toasts.store';

  const handleSubmit = async ($event: MouseEvent | TouchEvent) => {
    $event.preventDefault();

    saving = true;

    busy.start();

    try {
      await updateProfile({
        name,
        summary,
        twitter: twitter?.value,
        linkedin: linkedin?.value,
        github: github?.value,
        custom: custom?.value,
        file: inputProfilePicture?.files[0]
      });
    } catch (err) {
      toasts.error({
        text: 'Something went wrong while updating the profile.',
        detail: err
      });
    }

    busy.stop();

    saving = false;
  };

  let saving = false;

  let name: string | undefined = $user.user?.data?.name;
  let summary: string | undefined = $user.user?.data?.bio;

  let inputProfilePicture: HTMLInputElement | undefined;

  let twitter: HTMLInputElement | undefined;
  let linkedin: HTMLInputElement | undefined;
  let github: HTMLInputElement | undefined;
  let custom: HTMLInputElement | undefined;
</script>

<h1>{$i18n.settings.profile}</h1>
<p>{$i18n.settings.profile_publish_info}</p>

<form
  on:submit={async ($event) => await handleSubmit($event)}
  on:keypress={($event) => {
    $event.key === 'Enter' && $event.preventDefault();
  }}>
  <input
    bind:value={name}
    aria-label={$i18n.settings.name}
    name="title"
    placeholder={$i18n.settings.name}
    type="text"
    maxlength={64}
    disabled={saving} />

  <Avatar />

  <input
    bind:this={inputProfilePicture}
    type="file"
    multiple={false}
    accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
    disabled={saving} />

  <textarea
    name="summary"
    placeholder={$i18n.settings.bio}
    rows={3}
    bind:value={summary}
    maxlength={192} />

  <SocialInput
    value={$user.social?.twitter}
    bind:input={twitter}
    prefix="https://twitter.com/"
    arialLabel="Twitter"
    {saving} />

  <SocialInput
    value={$user.social?.linkedin}
    bind:input={linkedin}
    prefix="https://www.linkedin.com/in/"
    arialLabel="LinkedIn"
    {saving} />

  <SocialInput
    value={$user.social?.github}
    bind:input={github}
    prefix="https://github.com/"
    arialLabel="GitHub"
    {saving} />

  <SocialInput
    value={$user.social?.custom}
    bind:input={custom}
    custom={`${i18nFormat($i18n.settings.custom_url, [
      {placeholder: '{0}', value: 'https://papy.rs'}
    ])}`}
    arialLabel={$i18n.settings.custom}
    {saving} />

  <button type="submit" disabled={saving}>
    {$i18n.core.submit}
  </button>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
  }

  button {
    margin: 0.75rem 0 0.45rem;
  }

  h1 {
    padding-top: 1rem;
  }
</style>
