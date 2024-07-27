# Web Extension Boilerplate

This is a baseline project for creating cross-browser extensions. It is capable
of targeting
[manifest versions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version)
2 and 3. If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
so you have a handle on the different packages in this project and their
purpose.

To get started quickly,
[clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
and follow the [startup guide](#getting-started) below.

## Table of contents

- [What's included](#whats-included)
  - [Browser popup window](#browser-popup-window)
  - [Content script](#content-script)
  - [Background script](#background-script)
  - [Cross-browser compatibility](#cross-browser-compatibility)
- [Technologies used](#technologies-used)
- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [All commands](#all-commands)
  - [`init`](#init) - Initializes a new project
  - [`start`](#start) - Runs project code and watches for file changes (most
    useful during development)
  - [`build`](#build) - Creates an optimized production build
  - [`package`](#package) - Builds and packages everything to a ZIP file for
    publishing
- [Project structure](#project-structure)
  - [Removing unnecessary packages](#removing-unnecessary-packages)
- [Troubleshooting](#troubleshooting)

## What's included

### Browser popup window

A toolbar popup for your extension built using a handful of simple
[Preact](https://preactjs.com/) components. Any other libraries or frameworks
may be used that produce output compatible with settings available to the
[`action`](https://developer.chrome.com/docs/extensions/reference/api/action)/
[`browser_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)
section of your manifest.

<img alt="popup script preview" src="https://i.imgur.com/35H3kAz.png" width="640" height="360" />

### Content script

A minimal content script that prints a message to the console. Additionally, it
highlights the cross-package import system provided by
[NPM workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) and
[Typescript paths](https://www.typescriptlang.org/tsconfig/#paths).

<img alt="content script preview" src="https://i.imgur.com/X9CFKS2.png" width="640" height="360" />

### Background script

A very basic background script that prints a message when the extension has been
installed.

<img alt="background script preview" src="https://i.imgur.com/BnfqDCv.png" width="640" height="360" />

### Cross-browser compatibility

Easily manage different
[manifest versions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version)
directly inside `package.json`.

<img alt="manifest configuration preview" src="https://i.imgur.com/yM8oIiO.png" width="640" height="360" />

## Technologies used

- [Typescript](https://www.typescriptlang.org/) - Strongly-typed JavaScript
- [Vite](https://vitejs.dev/) - Development server, HMR, bundler and more
- [Preact](https://preactjs.com/) - Lightweight React alternative
- [Lerna](https://lerna.js.org/) - Monorepo package management

## Getting started

### Requirements

- [NodeJS](https://nodejs.org/) version 20 or higher
  - Recommended: [nvm](https://github.com/nvm-sh/nvm) - Run `nvm use` to use the
    required version or `nvm install 20` to install it.

### Steps

1.  To get started, you first need to initialize your project. The boilerplate
    code contains several things that need customizing such as your extension's
    display name ([details](#init)):
    ```sh
    npm run init
    ```
1.  Proceed through the series of initialization prompts and confirm your
    choices at the end to save them. A number of files will be updated and it is
    recommended to inspect the changes to make sure they align with your
    expectations.
1.  Once you're happy with the initialization results, install Node
    dependencies:
    ```
    npm install
    ```
1.  _Optional_: Change the default `manifest.json` settings:
    - Open the file [package.json](./package.json)
    - Find the section `manifestJSON`
    - Notice the two sections `v2` and `v3` for each manifest version
    - Add, modify or delete values based on the versions you intend to support -
      If you change something under `v3` and intend to publish a manifest
      version 2 of your extension, you'll need to make the equivalent change
      under `v2`.
1.  Now you have a choice of using either manifest version 2 or 3, depending on
    which browser you'd like to use. Run the `start` command with your desired
    version ([details](#start)):

    ```sh
    npm run start 3

     # or...

    npm run start 2
    ```

1.  Notice a new `dist` directory has been created which holds the output of
    your `start` command. After all packages have started, you're ready to load
    the unpacked extension from this location in your browser of choice. The
    process for this varies so be sure to look up the latest steps recommended
    by your browser. Here are some instructions for two popular ones:
    - Chrome:
      https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked
    - Firefox:
      https://blog.mozilla.org/addons/2015/12/23/loading-temporary-add-ons/

## All commands

Commands can be found in the root `package.json` under `scripts`. Following are
details about each one and how to run them. Commands are executed using NPM with
the format `npm run <command>` and most require a manifest version as the last
argument (see [start](#start) below). Whenever you see a `3` in a command,
you're specifying manifest version three. If you are targeting version two, use
a `2` instead.

### `init`

Begins a series of prompts where you'll give names to certain things like your
extension's display name. This is necessary to replace pieces of boilerplate
code so they reflect your own extension. This only needs to be run once at the
beginning of any new project.

#### Usage

```sh
npm run init
```

### `start`

Starts the project and watches for file changes. When a change occurs, a new
build is initiated and your extension is updated. Certain actions may still
require refreshing the extension in your browser settings.

#### Sample usage

```sh
npm run start 3
```

### `build`

Creates an optimized build of the project. Builds generated using this command
are minified. This behavior can be changed by modifying a package's
`vite.config.ts` file.

#### Sample usage

```sh
npm run build 3
```

### `package`

Prepares your project for publishing to the extension stores. It generates a ZIP
file, with the given manifest version, that may be uploaded directly in the
extension management dashboards. Output files are placed in the `versions`
directory.

#### Sample usage

```sh
npm run package 3
```

## Project structure

- `dist/` - [Build](#build) and [Start](#start) output directory. This is where
  to load unpacked extensions in your browser settings when testing changes.
- `packages/` -
  [NPM workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces)
  directory that stores individual project packages.
  - `packages/background/` -
    [Background script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts)
    code and tooling.
  - `packages/content/` -
    [Content script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)
    code and public assets directory.
    - `packages/content/public/assets/` - Files placed here are available to
      your extension as
      [web-accessible resources](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/web_accessible_resources).
      This is enabled by the `web_accessible_resources` setting in
      `package.json`. At build time, assets are copied to `dist/assets/` and
      their access URLs may be generated using the `getAssetURL` helper method
      in the `shared` package.
  - `packages/popup/` - The extension's
    [Popup window](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups).
  - `packages/shared/` - Common configurations and helper methods used across
    more than one package.
  - `packages/types/` - All of the project's types.
- `scripts/` - Various scripts defined in the root `package.json`.
- `versions/` - [Package](#package) command output directory.

### Removing unnecessary packages

The `background`, `content`, and `popup` packages are all optional. There are
two methods for removing them:

1. Delete its directory from `packages` - This is permanent and should only be
   done if you're sure you won't need it.
1. Omit it from the main build by updating its relative `build` command in
   `package.json` to something like:
   ```json
   # packages/popup/package.json
   {
     "scripts": {
       "build": "echo \"Info: no build specified\""
     }
   }
   ```

Regardless of the chosen method, the manifest JSON in
[package.json](./package.json) will also need to be updated so it doesn't
reference missing scripts or actions.

## Troubleshooting

### Issue: Failing build

Things to check:

- If you've run the initialization script via `npm run init`, make sure you
  `npm install` again if you haven't already.

### Issue: Invalid manifest version errors

Things to check:

- Make sure you're running a version supported by the browser you're using.
  Version 2 manifests cannot be loaded in Chrome. If you've ran
  `npm run start 2` or `npm run build 2`, you'll need to re-run them with a
  target version of `3` instead.
