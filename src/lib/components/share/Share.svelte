<script lang="ts">
  import {getShareText, getShareTwitterText} from '$lib/services/share.services';
  import type {ShareData} from '$lib/types/share';
  import IconTwitter from '$lib/components/icons/IconTwitter.svelte';
  import IconLinkedin from '$lib/components/icons/IconLinkedin.svelte';
  import IconMail from '$lib/components/icons/IconMail.svelte';
  import IconWhatsapp from '$lib/components/icons/IconWhatsapp.svelte';
  import IconCopy from '$lib/components/icons/IconCopy.svelte';
  import IconHackernews from '$lib/components/icons/IconHackernews.svelte';
  import IconTelegram from '$lib/components/icons/IconTelegram.svelte';
  import {importWebSocialShare} from '$lib/utils/import.utils';

  // For simplicity reason we do not add the lib to the project but only fetch it through a script
  /*eslint-disable*/
  interface WebSocialShareHTMLElement extends HTMLElement {
    show: boolean;
    share: any;
  }
  /* eslint-enable */

  let webSocialShareRef: WebSocialShareHTMLElement | undefined;

  let visible = false;

  const shareDesktop = async (data: ShareData) => {
    if (!webSocialShareRef) {
      return;
    }

    const text: string = getShareText(data);
    const twitterText: string = getShareTwitterText(data);
    const {publishedUrl} = data;

    webSocialShareRef.share = {
      displayNames: true,
      config: [
        {
          twitter: {
            socialShareText: twitterText,
            socialShareUrl: publishedUrl,
            socialSharePopupWidth: 300,
            socialSharePopupHeight: 400
          }
        },
        {
          linkedin: {
            socialShareUrl: publishedUrl
          }
        },
        {
          email: {
            socialShareBody: `${text} ${publishedUrl}`
          }
        },
        {
          whatsapp: {
            socialShareUrl: publishedUrl
          }
        },
        {
          copy: {
            socialShareUrl: publishedUrl
          }
        },
        {
          hackernews: {
            socialShareUrl: publishedUrl
          }
        },
        {
          telegram: {
            socialShareUrl: publishedUrl
          }
        }
      ]
    };

    webSocialShareRef.show = true;
  };

  const shareMobile = async (data: ShareData) => {
    const text: string = getShareText(data);
    const {publishedUrl} = data;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await navigator.share({
      text: text,
      url: publishedUrl
    });

    visible = false;
  };

  const openShare = async ({detail}: CustomEvent<ShareData>) => {
    visible = true;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (navigator && navigator.share) {
      await shareMobile(detail);
      return;
    }

    await importWebSocialShare();

    await shareDesktop(detail);
  };
</script>

<svelte:window on:papyShare={openShare} />

<web-social-share
  show={false}
  bind:this={webSocialShareRef}
  class:visible
  on:closed={() => (visible = false)}>
  <div slot="twitter" style="color: #00aced"><IconTwitter /></div>
  <div slot="linkedin" style="color: #0077b5"><IconLinkedin /></div>
  <div slot="email"><IconMail /></div>
  <div slot="whatsapp" style="color: #25D366"><IconWhatsapp /></div>
  <div slot="copy"><IconCopy /></div>
  <div slot="hackernews" style="color: #ff6000"><IconHackernews /></div>
  <div slot="telegram" style="color: #0088cc"><IconTelegram /></div>
</web-social-share>

<style lang="scss">
  @use '../../themes/mixins/share';

  web-social-share {
    @include share.websocialshare;

    :global(div) {
      display: none;
    }

    &.visible {
      :global(div) {
        display: block;
      }
    }
  }
</style>
