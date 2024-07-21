# Web Extension Boilerplate

This is a baseline project for creating cross-browser extensions that produces
separate builds for
[manifest versions 2 and 3](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).
If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
at some point so you have a handle on the different packages in this project and
their purpose.

## Table of contents

- [Getting started](#getting-started)
- [Local development](#local-development)
- [Troubleshooting](#troubleshooting)

## Getting started

### Requirements

- [NodeJS](https://nodejs.org/) version 20 or higher

### Steps

To get started, execute the following commands in order:

```sh
$ npm run init
$ npm install
$ npm run start:3
```

#### Command details

- `npm run init` - Begins a series of prompts where you'll give names to certain
  things like your extension's display name. This is necessary to replace pieces
  of boilerplate code so they reflect your own extension.
- `npm install` - Installs Node dependencies.
- `npm run build 3` - Starts a development server that watches for file changes
  and serves necessary assets.

## Local development

### Development server

For quick feedback, a development server may be started in lieu of running a
build after each change. Using your desired manifest version, run the `start`
command:

```sh
$ npm run start:3
```

This watches for file changes and automatically rebuilds a package when its
contents have changed. Certain changes will require you to go into your
extension settings and click the "Reload extension" button.

## Troubleshooting

### Issue: Failing build

Things to check:

- If you've run the initialization script via `npm run init`, make sure you
  `npm install` again if you haven't already.

### Issue: Invalid manifest version errors

Things to check:

- Make sure you're running a version supported by the browser you're using.
  Version 2 manifests cannot be loaded in Chrome. If you've run
  `npm run start:2` or `npm build 2`, you'll need to re-run them with a target
  version of `3` instead.
