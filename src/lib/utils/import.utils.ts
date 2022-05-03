import {browser} from '$app/env';

export const importStudio = async () =>
  await Promise.all([importStylo(), importDeckGoStudio(), importDeckGoIndicator(), setPrismCDN()]);

const importStylo = async () => {
  const {defineCustomElement} = await import(
    /* @vite-ignore */ '@papyrs/stylo/dist/components/stylo-editor'
  );
  defineCustomElement();
};

const importDeckGoStudio = async () => {
  const {defineCustomElement} = await import(
    /* @vite-ignore */ '@deckdeckgo/studio/dist/components/deckgo-studio-doc'
  );
  defineCustomElement();
};

const importDeckGoIndicator = async () => {
  const {defineCustomElement} = await import(
    /* @vite-ignore */ '@deckdeckgo/studio/dist/components/deckgo-doc-indicator'
  );
  defineCustomElement();
};

export const setPrismCDN = async () => {
  if (!browser) {
    return;
  }

  (window as unknown as {prismjs_cdn: string | undefined}).prismjs_cdn = import.meta.env
    .VITE_PRISMJS_CDN as string;
};

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
  const {defineCustomElement} = await import(
    /* @vite-ignore */ '@deckdeckgo/monaco-editor/dist/components/deckgo-monaco-editor'
  );
  defineCustomElement();
};
