# Web Extension Boilerplate

This is a baseline project for creating cross-browser extensions. It produces
separate builds for
[manifest versions 2 and 3](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json).
If you're brand new to extension development, be sure to
[read the basics](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
at some point so you have a handle on the different packages in this project and
their purpose.

## Table of contents

- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Steps](#steps)
  - [All commands](#all-commands)
- [Local development](#local-development)
- [Troubleshooting](#troubleshooting)

## Getting started

### Requirements

- [NodeJS](https://nodejs.org/) version 20 or higher

### Steps

To get started, you first need to initialize your project. The boilerplate code
contains several things that need customizing such as your extension's display
name ([details](#init)):

```sh
npm run init
```

Install Node dependencies:

```
npm install
```

Now you have a choice of using either manifest version 2 or 3, depending on
which browser you'd like to use. Run the `start` command with your desired
version ([details](#start)):

```sh
npm run start 3

# or...

npm run start 2
```

### All commands

Commands can be found in the root `package.json` under `scripts`. Following are
details about each one and how to run them. Commands are executed using NPM with
the format `npm run <command>` and most require specifying a manifest version as
the last argument (see [build](#build) below). Whenever you see a `3` in a
command, you're specifying manifest version three. These commands also accept
`2` to target version two.

#### `init`

Begins a series of prompts where you'll give names to certain things like your
extension's display name. This is necessary to replace pieces of boilerplate
code so they reflect your own extension. This only needs to be run once at the
beginning of any new project.

##### Usage

```sh
npm run init
```

#### `build`

Combines your packages to a single bundle that may be loaded as an
[unpacked extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#trying_it_out)
in your browser of choice. Replace the `3` with a `2` in the sample command if
you'd like to build your project using manifest version 2.

##### Sample usage

```sh
npm run build 3
```

#### `start`

Starts your project and watches for file changes. Certain actions may require
refreshing your extension in your browser settings.

##### Sample usage

```sh
npm run start 3
```

#### `package`

Prepares your project for publishing on the extension stores. It generates ZIP
files that may be uploaded directly in the extension management dashboard.

##### Sample usage

```sh
npm run package 3
```

## Local development

For quick feedback, a development server may be started in lieu of running a
build after each change. Using your desired manifest version, run the `start`
command:

```sh
npm run start 3
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
  Version 2 manifests cannot be loaded in Chrome. If you've ran
  `npm run start 2` or `npm run build 2`, you'll need to re-run them with a
  target version of `3` instead.
