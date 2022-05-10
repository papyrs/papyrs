<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://papy.rs/">
    <img src="https://github.com/papyrs/papyrs/raw/main/static/icons/icon-256x256.png" width="140px" alt="Papyrs" role="presentation" />
  </a>

  <h3>Papyrs - Blog on web3</h3>

  <br/>

[![GitHub release](https://img.shields.io/github/release/papyrs/papyrs/all?logo=GitHub&style=flat-square)](https://github.com/papyrs/papyrs/releases/latest)
[![Follow Papyrs on Twitter](https://img.shields.io/twitter/follow/papyrsapp.svg?label=follow+papyrs&logo=twitter&style=flat-square)](https://twitter.com/PapyrsApp)
[![Chat on Discord](https://img.shields.io/badge/chat-Discord-lightgrey?logo=Discord&style=flat-square)](https://discord.gg/EV76WqDuZW)

</div>

## Papyrs

[Papyrs] is an open-source, privacy-first, decentralized blogging platform that lives 100% on chain. Papyrs runs on [DFINITY](https://dfinity.org/)'s Internet Computer, the world's first blockchain that runs at web speed and serves content on the web.

### Links & Projects

Here are some useful links:

- See the [HACKING](HACKING.md) document to run locally the app.
- Reach out to us on [Discord](https://discord.gg/EV76WqDuZW).
- Wanna help? Check out the [CONTRIBUTING](CONTRIBUTING.md) guidelines.
- Have a look at the [LICENSE](LICENSE.md) for information about licensing and limitation.

This repo is the web editor of Papyrs. It can be used as a standalone app but uses other projects we are developing to be fully deployed:

- [IC](https://github.com/papyrs/ic): canisters and sign-in providers
- [CDN](https://github.com/papyrs/cdn): libraries and assets we are using accross the platform
- [Unsplash-proxy](https://github.com/papyrs/unsplash-proxy): a proxy we have to use to query Unsplash
- [Stylo](https://github.com/papyrs/stylo): another kind of rich text editor
- [Kit](https://github.com/papyrs/kit): the templates for the blog posts we deploy for the users
- [DeckDeckGo](https://github.com/deckgo/deckdeckgo/): various web components, utilities and the providers for the offline persistence and synchronization of the data

## Architecture overview

All programs on the Internet Computer are Wasm modules, or canisters (canister smart contracts). The Papyrs web editor is deployed on the IC through [Fleek](https://fleek.co).

The web editor persists blog post data in the browser in [indexedDB](https://developer.mozilla.org/fr/docs/Web/API/IndexedDB_API). This means that Papyrs can be used by anyone without any authentication. Blog posts can be loaded from and exported to the file system.

![Architecture with offline data only](/docs/papyrs-architecture-offline.png) <!-- this is an excalidraw.com image, source is docs/papyrs-architecture -->

However, if users are looking to save their data "in the cloud" automatically and looking to share their blog posts online, authentication with [Internet Identity](https://identity.ic0.app/) will be required. Once authenticated each user gets two canisters:

- a private "data" canister that contains raw blog post data, used in the editor, and
- a "storage" canister that holds and publicly serves blog post and asset data (html, images, js, css, etc).

![Architecture with online canisters](/docs/papyrs-architecture-ic.png) <!-- this is an excalidraw.com image, source is docs/papyrs-architecture -->

[papyrs]: https://papy.rs
