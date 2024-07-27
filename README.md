# Web Extension Boilerplate

This is a baseline project for creating cross-browser extensions. It produces
separate builds for
[manifest versions 2 and 3](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).
If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
so you have a handle on the different packages in this project and their
purpose.

## Table of contents

- [What's included?](#whats-included)
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

## What's included?

### Browser popup window

A toolbar window for your extension built using a handful of simple
[Preact](https://preactjs.com/) components. While Preact should be enough for
most extensions, actual React may be swapped in with little difficulty.

![popup window preview](https://i.imgur.com/3XSvaX4.png)

### Content script

A minimal content script that prints a message to the console. Additionally, it
highlights the cross-package import system provided by
[NPM workspaces](https://docs.npmjs.com/cli/v10/using-npm/workspaces) and
[Typescript paths](https://www.typescriptlang.org/tsconfig/#paths).

### Background script

A very basic background script that prints a message when the extension has been
installed.

### Cross-browser compatibility

Easily manage different `manifest.json` versions directly inside `package.json`.

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

Prepares your project for publishing on extension stores. It generates ZIP files
in a directory named `versions` that may be uploaded directly in the extension
management dashboards.

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

The `background`, `content`, and `popup` packages are all optional. If your
extension doesn't need one of them, simply delete its directory from `packages`.
If you're unsure about deleting it entirely, you may omit a package from the
main build by updating its relative `build` command in `package.json` to
something like:

```json
// packages/popup/package.json

{
  [...]
  "scripts": {
    [...]
    "build": "echo \"Info: no build specified\" && exit 0",
    [...]
  },
  [...]
}
```

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
