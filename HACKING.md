# Hacking

This document explains how to run locally the application - i.e. this web editor for blog post.

## Prerequisite

Make sure you have a recent version of [Node.js installed](https://nodejs.org/en/) (LTS recommended).

## Clone the repo

First thing first, you need a local copy of the repo. Either clone the repo or a fork and install the dependencies.

```
git clone https://github.com/papyrs/papyrs
cd papyrs
npm ci
```

## Run locally with offline persistence only

If you are not looking to test or develop any features that require the IC, you can start the local dev server.

```
npm run dev
```

Once started, open the application in your browser [http://localhost:3000].

Note: as no cloud will be connected, the editor will display an error in a toast. It can be ignored.

## Run locally with a simulated "cloud"

If you wish to run the full platform locally, several more steps will be required.

### Prerequisite

Make sure you have the [Internet Computer SDK](https://smartcontracts.org/docs/introduction/welcome.html#for-first-timers).

```
sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
```

Once installed, start a local simulated Internet Computer:

```
dfx start
```

### Clone and run locally our backend and providers

Our backend canisters need to be deployed locally and the related providers need to run as well.

```
git clone https://github.com/papyrs/ic
cd ic
npm ci
dfx deploy manager
dfx deploy --argument 'secret' feed
npm run start --workspace=providers/ic
```

In addition, you will also need to deploy [Internet Identity](https://github.com/dfinity/internet-identity/) locally:

```
git clone https://github.com/dfinity/internet-identity
cd internet-identity/demos/using-dev-build
npm ci
dfx deploy --no-wallet --argument '(null)'
```

You might get different canister ids for the "manager", "feed" and the Internet Identity canisters than the default ones configured in the app. Find the actual IDs in related `.dfx/local/canister_ids.json` of each project and adjust it accordingly in the `.env.development` configuration file of the app (keys `VITE_IC_MANAGER_CANISTER_ID`, `VITE_IC_FEED_CANISTER_ID` and `VITE_IC_LOCAL_IDENTITY_CANISTER_ID`).

### Run application

As with the offline persistence, once everything deployed and configured, the application can be run locally.

```
npm run dev
```
