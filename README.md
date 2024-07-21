# Web Extension Boilerplate

This is a base project for creating browser extensions that produces separate
builds for
[manifest versions 2 and 3](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).
If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
at some point so you have a handle on the different packages in this project and
their purpose.

## Table of contents

## Getting started

Following are the steps to getting the project up and running. There are three
main components:

- [Content script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) -
  This is the Javascript that will be executed in the context of the user's
  browser page.
- [Background script](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Background_scripts) -
  This gets run in the background and handles various things such as responding
  to your extension being installed for the first time.
- [Popup window](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface) -
  The window that opens when the user clicks your extension's icon in the
  toolbar.

If your extension does not require one of these, simply delete its directory in
the `packages` directory. The `shared` and `types` packages are required
globally so leave those in place.

### Requirements

- [NodeJS](https://nodejs.org/) version 20 or higher

### Steps

#### 1. Initialization

##### Command

```sh
npm run init
```

##### Details

Before doing anything, an [initialization script](./scripts/init.ts) needs to be
run to update certain parts of the boilerplate code. Examples of this are giving
your extension a proper name and defining which name your packages will use when
being referenced in `import` statements.

If you choose to skip the initialization step, the defaults will be saved as
follows:

- Project name: `web-extension-boilerplate`
- Extension name: `Web Extension Boilerplate`
- Package prefix: `wexb`

#### 2. Install dependencies

##### Command

```sh
npm install
```
