---
title: Pack documentation
description: Documentation for Pack, the Rathkit JavaScript and TypeScript bundler written in Rust. The first alphas are on npm and crates.io.
sidebar:
  label: Overview
  order: 1
---

Pack is a JavaScript and TypeScript bundler written in Rust, with no dependencies, not even
crates. The command is `rkp`.

:::caution[Alpha]
The alpha, `{{pack}}`, is on npm under the `next` tag, so install with `@next`, and on
crates.io. It is a first look, not something to build on: options, output and plugin support
can change between releases. Start with the [quick start](/docs/pack/quick-start/), and see
[Verify a release](/docs/verify/) to check what you install.
:::

## What it does

- Bundles JavaScript, TypeScript, JSX, JSON and CSS: module graph, tree shaking, code
  splitting, minifying, source maps, `define` and loaders.
- Builds an HTML page: it follows the module scripts and style sheets the page names, copies
  the images and media it points at, and writes the page again with the built files.
- Resolves modules the way Node does, plus `tsconfig.json` `paths`, aliases and the
  `exports` and `imports` maps of packages.
- Serves a project for development, with live reload and module replacement in the open page.
- Writes `.d.ts` files for your entries, using your project's `typescript`.
- Runs plugins written for other bundlers, from a Node process. Plain builds never start
  Node.
- Has a JavaScript API, `build` and `serve`, that takes the command's flags as options.

[Options](/docs/pack/options/) lists every option of `rkp`, and [Plugins](/docs/pack/plugins/)
shows each kind of plugin working. The [repository README](https://github.com/rathkit/pack#readme)
has what is covered by tests and the behavior worth knowing about.

## Packages

All eight are published as alphas.

| Package | Purpose |
| --- | --- |
| `@rathkit/pack` | The `rkp` command and the JavaScript API. It starts the program for your platform |
| `@rathkit/pack-linux-x64-gnu` | The program for Linux on x64 (glibc) |
| `@rathkit/pack-linux-arm64-gnu` | The program for Linux on arm64 (glibc) |
| `@rathkit/pack-linux-x64-musl` | The program for Linux on x64 (musl, so Alpine too) |
| `@rathkit/pack-linux-arm64-musl` | The program for Linux on arm64 (musl) |
| `@rathkit/pack-darwin-arm64` | The program for macOS on Apple silicon |
| `@rathkit/pack-darwin-x64` | The program for macOS on Intel |
| `@rathkit/pack-win32-x64` | The program for Windows on x64 |

You install `@rathkit/pack`. It lists the seven platform packages as optional dependencies,
and your package manager installs only the one that fits your machine. None of the eight has
dependencies or an install script. The program is also on
[crates.io](https://crates.io/crates/rathkit-pack) as `rathkit-pack`, with no dependencies
there either, and release tarballs are on [GitHub](https://github.com/rathkit/pack/releases).

## Requirements

Node.js 24 or later is needed only when a build uses plugins. Without plugins, Pack does not
start Node. The program is not signed with an operating-system key, so macOS and Windows may
warn about it. [Verify a release](/docs/verify/) shows what to rely on instead.

## What to expect from an alpha

Pack follows semantic versioning with the usual 0.x reading: any release may change options,
output and plugin support, and the changelog says what changed. The development server, hot
module replacement and module federation are tested in Chromium, Firefox and WebKit on Linux. See the
[changelog](https://github.com/rathkit/pack/blob/main/CHANGELOG.md).
