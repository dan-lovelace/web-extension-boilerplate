# Web Extension Boilerplate

This is a baseline project for creating cross-browser extensions. It is capable
of targeting
[manifest versions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/manifest_version)
2 and 3. If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
so you have a handle on the different packages in this project and their
purpose.

To get started,
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
  - [Quick start](#quick-start)
  - [In-depth guide](#in-depth-guide)
- [All commands](#all-commands)
  - [`init`](#init) - Initializes a new project
  - [`start`](#start) - Runs project code and watches for file changes (most
    useful during development)
  - [`build`](#build) - Creates an optimized production build
  - [`package`](#package) - Builds and packages everything to a ZIP file for
    publishing
- [Project structure](#project-structure)
  - [Updating the manifest](#updating-the-manifest)
  - [Removing unnecessary packages](#removing-unnecessary-packages)
- [Troubleshooting](#troubleshooting)

## What's included

### Browser popup window

A toolbar popup for your extension that's built using a handful of simple
[Preact](https://preactjs.com/) components. Any other libraries or frameworks
may be used alongside or in place of Preact. Read about the
[`action`](https://developer.chrome.com/docs/extensions/reference/api/action)/
[`browser_action`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)
section of your manifest to make sure your tools of choice are supported.

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

### Quick start

If you've done this kind of thing before, these commands will get you up and
running quickly:

1. Initialize a new project:
   ```
   npm run init
   ```
1. Targeting manifest version 3, start a development server and watch for file
   changes:
   ```
   npm run start 3
   ```
1. Build output is located in your [dist](./dist/) directory. Take a look at the
   [rest of the commands](#all-commands) and the
   [project structure](#project-structure) to learn more.

### In-depth guide

To get started, you first need to initialize your project. The boilerplate
contains several things that need customizing such as your extension's display
name ([details](#init)). In addition to renaming things, the initialization
script also takes care of installing dependencies. Use the `npm install` command
in the future if your dependencies change.

1.  **Run initialization command**

    ```sh
    npm run init
    ```

1.  **Complete initialization and verify**

    After running `npm run init`, proceed through the series of prompts and
    confirm your choices when you're ready. A number of files will be updated
    and it is recommended to inspect the changes to make sure they align with
    your expectations.

1.  _Optional_: **Update manifest permissions**

    By default, the manifest settings ask for very broad permissions such as
    accessing data on all sites and modifying local storage. While this may be
    okay during early stages of development, you should take time to de-scope
    the parts that say `<all_urls>` and `permissions`. Before publishing, your
    extension's permissions should require only those necessary for it to
    function.

    See the section about [updating the manifest](#updating-the-manifest) for
    instructions.

1.  **Start server**

    Depending on which browser you'd like to use, you now have a choice of
    either manifest version 2 or 3. Run the `start` command with your desired
    version ([details](#start)):

    ```sh
    npm run start 3

     # or...

    npm run start 2
    ```

1.  **Find your build**

    Notice a new `dist` directory has been created which holds the output of
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

- `dist/` - [`build`](#build) and [`start`](#start) output directory. This is
  where to load unpacked extensions in your browser settings when testing
  changes.
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
- `scripts/` - Various scripts defined in the root
  [package.json](./package.json).
- `versions/` - [`package`](#package) command output directory.

### Updating the manifest

Manifest configurations are located in the root-level
[package.json](./package.json) under the key `manifestJSON`. To make changes:

1. Open the file [package.json](./package.json)
1. Find the section `manifestJSON`
1. Notice the two sections `v2` and `v3` for each manifest version
1. Add, modify or delete values based on the features and versions you intend to
   support - If you change something under `v3` and plan to publish a manifest
   version 2 of your extension, you'll need to make the equivalent change under
   `v2`.
1. Changing manifest JSON requires a project re-build using either the
   [`build`](#build) or [`start`](#start) commands

### Removing unnecessary packages

The `background`, `content`, and `popup` packages are individually optional. If
you do not need one or more of them, there are two methods of removal:

1. **Silent (preferred)** - Omit a package from the main build by updating its
   relative `build` command in `package.json` with the following change:

   ```diff
   # Filename:
   #   packages/popup/package.json

   {
     "scripts": {
   -    "build": "tsc && vite build",
   +    "build": "echo \"Info: no build specified\"",
     }
   }
   ```

   In this example, we quietly disable the [popup package](./packages/popup/)
   entirely while maintaining its source code. It is no longer part of our build
   but is ready to be included any time in the future.

1. **Nuclear** - Delete the package's directory from `packages`. This is
   permanent and should only be done if you are certain you won't need it.

## Troubleshooting

### Issue: Failing build

Things to check:

- If you've run the initialization script via `npm run init`, see if running
  `npm install` clears anything up.

### Issue: Invalid manifest version errors

Things to check:

- Make sure you're running a version supported by the browser you're using.
  Version 2 manifests cannot be loaded in Chrome. If you've ran
  `npm run start 2` or `npm run build 2`, you'll need to re-run them with a
  target version of `3` instead.
