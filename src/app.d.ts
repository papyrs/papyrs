/// <reference types="@sveltejs/kit" />

/* eslint-disable */

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
  interface Locals {}

  interface Platform {}

  interface Session {}

  interface Stuff {}
}

// eslint window checks for custom events
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onddgLog?: (event: any) => any;
    onddgSignOut?: (event: any) => any;
    onpapyShare?: (event: any) => any;
    onsubmit?: (event: any) => any;
    onpapyPublish?: (event: any) => any;
    onpapyModal?: (event: any) => any;
    onpapyReloadEditor?: (event: any) => any;
    onddgError?: (event: any) => any;
    onddgBusy?: (event: any) => any;
    onpapySignOut?: (event: any) => any;
  }
}

declare interface Window {
  EXCALIDRAW_ASSET_PATH: string;
}

declare const VITE_APP_VERSION: string;
declare const VITE_IC_FEED_CANISTER_SECRET: string;

/* eslint-enable */
