# 0.0.14 (2022-09-01)

### Features

- support to publish blog posts in different languages

### Style

- break-word for any elements in the post

### Fix

- publish regex allow dash
- agent-js Safari desktop blocked login
- generate social image card if user used an uploaded images as first paragraphs
- mime type for `png` in input of the profile

# 0.0.13 (2022-08-25)

### Hot fix 🔥

- new user sign-in blocked because dapp tries incorrectly to save (empty) user data in indexeddb (workaround: hit browser refresh)

### Features

- prepare support for languages in publish

### Fix

- publish timestamps that is sometimes not updated leading to backend rejecting updates

# 0.0.12 (2022-08-25)

### Features

- prevent data overwrite and timestamps (proposal [#47](https://github.com/papyrs/papyrs/discussions/47))
- upgrade agent-js `v0.13.2` to save the delegation in IndexedDB instead of localstorage
- introduces log levels to better display errors

### Styles

- improve spinner display on sign in screen

# 0.0.11 (2022-08-06)

### Features

- japanese translation
- add social share to DSCVR

### Styles

- fix modal height on Chrome v104
- prevent overflow - can happen e.g. if a link is copied as text

# 0.0.10 (2022-07-29)

### Features

- support for sublist ("Tab" and "Shitkey+Tab")
- keyboard shortcuts to style text (control or command-{b, i, u, k} for bold, italic, underline & insert hyperlink)
- add social share to OpenChat
- remove social share to Whatsapp
- native share only on mobile devices

### Fix

- social images generated for published articles with Safari

# 0.0.9 (2022-07-22)

### Features

- optionally submit blog posts to Papyrs to promote these on our various social channels (Twitter, Discord, etc.) and to make these available to any developers through our "Feed" canister smart contract
- add information on "Settings - Profile" page to make more obvious that the information, if provided, are displayed publicly on the users' blogs
- keep track of code options - e.g. if you select "TypeScript", then next block of code you create is automatically set up with "TypeScript"

### Refactor

- save tenor anonymized id in local storage instead of idb (idb = user edited data, local storage = editor options)

### Fix

- apply selected language at startup

# 0.0.8 (2022-07-15)

### Features

- filter and select plugin to apply with keyboard
- default code option line numbers set to off
- ordered list

### Fix

- backtick support not only compatible with Swiss-french keyboards

### Build

- bump SvelteKit

# 0.0.7 (2022-07-08)

### Features

- extend session duration to 4 hours
- do not clear local edited data on automatic sign out if delegation (session) expires
- add plugin for ordered list

### Style

- smaller code `font-size` on mobile devices

### Fix

- update info for publish: dash are not supported in titles when publishing
- display "Made with Papyrs" on iOS

### Build

- bump Stylo minor improvements
- fetch monaco-editor at runtime from cdn

# 0.0.6 (2022-07-02)

### Features

- session duration bump to one hour (instead of 10 minutes)
- publish social links (Twitter etc.) to blog landing page
- generate a social card only if no image is used in first or second paragraph
- deprecate dev and medium url options

### Fix

- update `index.html` of blog with current list of published article if an article is deleted by the user

### Build

- bump all dependencies
- fetch excalidraw at runtime from cdn

# 0.0.5 (2022-06-23)

### Features

- extend session length to one hour
- allow indexing (`robots.txt`)

### Fix

- export file extension on firefox and brave
- mobile detection for Stylo improved in case of devices using stylus
- text leaves detection reset target in Stylo to prevent browser to create text node at the root

### Style

- fix links overflow

### Build

- skip i18n job on prod build to use the Fleek Svelte docker image that use an outdated npm version

# 0.0.4 (2022-06-12)

### Features

- sketching hand-draw like diagrams with Excalidraw

# 0.0.3-1 (2022-06-05)

### Build

- bump dependencies and Stylo v0.0.28

# 0.0.3 (2022-06-05)

### Features

- display a modal that summarizes what is Internet Identity

### Fix

- minor improvements at selecting the placeholders
- various Stylo patches
- lazy load all offline images
- style sign-in screen size on iOS

# 0.0.2 (2022-05-23)

### Features

- add rss feed and sitemap to blogs
- display app version in UI
- display a message when trying to delete current post (because it cannot be deleted)
- prevent paste of images from other domains and iframes as well
- delete images and code paragraphs

### Fix

- keep original publish date when publishing again a blog post
- zero width space in doc title when publishing
- various Stylo patches (listener, placeholder, display of "+" if code selected)
- offline image syncing with case sensitive
- weird unsplash display in grid

### Docs

- add markdown plugin to README
- update local deploy guide
