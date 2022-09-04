import {browser} from '$app/environment';

export const importStudio = async () => {
  if (!browser) {
    return;
  }

  await Promise.all([importStylo(), importDeckGoStudio(), importDeckGoIndicator(), setPrismCDN()]);
};

const importStylo = async () => {
  const {defineCustomElements} = await import(/* @vite-ignore */ '@papyrs/stylo/dist/loader');
  await defineCustomElements();
};

const importDeckGoStudio = async () => {
  const {defineCustomElements} = await import(/* @vite-ignore */ '@deckdeckgo/studio/dist/loader');
  await defineCustomElements();
};

const importDeckGoIndicator = async () => {
  const {defineCustomElements} = await import(/* @vite-ignore */ '@deckdeckgo/studio/dist/loader');
  await defineCustomElements();
};

const setPrismCDN = async () =>
  ((window as unknown as {prismjs_cdn: string | undefined}).prismjs_cdn = import.meta.env
    .VITE_PRISMJS_CDN as string);

export const importDeckGoSocialImg = async () => {
  const {DeckgoSocialImg} = await import(
    /* @vite-ignore */
    '@deckdeckgo/social-img/dist/components/deckgo-social-img'
  );
  customElements.get('deckgo-social-img') ||
    customElements.define('deckgo-social-img', DeckgoSocialImg);
};

export const importWebSocialShare = async () => {
  const {defineCustomElement} = await import(
    /* @vite-ignore */ 'web-social-share/dist/components/web-social-share'
  );
  defineCustomElement();
};

export const importDeckGoMonacoEditor = async () => {
  const cdn: string = import.meta.env.VITE_MONACO_EDITOR_CDN as string;
  return import(cdn);
};

export const importDeckGoExcalidraw = async () => {
  const cdn: string = import.meta.env.VITE_EXCALIDRAW_CDN as string;
  return import(cdn);
};
