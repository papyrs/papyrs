# Welcome to the Papyrs contributing guide

Hey there 👋

Are you interested to contribute to our open source project? That would be awesome, we are always looking for contributors 👍

## Table of contents

- [Getting started](#getting-started)
- [Issues](#issues)
- [Translations (i18n)](#translation)

## Getting started

Join the [Discord](https://discord.gg/EV76WqDuZW) channel. If you have questions or feedback, this is the best place to reach the team and other contributors directly.

## Issues

### Create a new issue

If you spot a problem, [search if an issue already exists](https://github.com/papyrs/papyrs/issues). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/papyrs/papyrs/issues/new/choose).

### Solve an issue

Scan through our [existing issues](https://github.com/papyrs/papyrs/issues) to find one that interests you. You can narrow down the search using `labels` as filters. We flags our [issues](https://github.com/papyrs/papyrs/issues) with the labels `good first issue` when we think that the issue is accessible without too much experience and know-how of our project. If you find an issue to work on, you are welcome to open a PR with a fix.

## Translations (i18n)

We would be grateful to get your help to translate our app.

1. Copy [en.json](https://github.com/papyrs/papyrs/blob/main/src/lib/i18n/en.json) to a new filename reflecting the language (such as for example `fr.json` for French)
2. Translate each keys of the newly created file
3. Provide a PR

If you would like to test your translations, either test these by overwriting temporarily [en.json](https://github.com/papyrs/papyrs/blob/main/src/lib/i18n/en.json) or add the new language as following:

1. Add it the to the list of supported languages in [languages.d.ts](https://github.com/papyrs/papyrs/blob/main/src/lib/types/languages.d.ts)
2. Add a related dynamic import in the state management [i18n.store.ts](https://github.com/papyrs/papyrs/blob/main/src/lib/stores/i18n.store.ts)

Translations are handled in JSON files but, as we are consuming these through a store, their representation have to exist as interfaces.
To ease the process we have developed a script which extract the declarations automatically. In case you would add new keys, run `npm run i18n` to generate the interfaces.

[papyrs]: https://papy.rs
