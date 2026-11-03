---
title: Pack quick start
description: Install Pack, bundle a TypeScript file, build a page, run the development server and call it from JavaScript.
sidebar:
  label: Quick start
  order: 2
---

:::caution[Alpha]
These steps were run against the published `{{pack.tested}}` package on Linux, and the served
page was checked in Chromium. The package is alpha, so options will change.
:::

## Install

```sh
npm install --save-dev @rathkit/pack@next
```

The first releases are alpha and are published to the `next` tag only, so install with
`@next`. The package gives you the `rkp` command and a JavaScript API. Your package manager
installs only the platform package that fits your machine.

If you have Rust and would rather build the program from source, install the crate instead.
It has no dependencies, so the build fetches nothing else:

```sh
cargo install rathkit-pack --version {{pack}} --locked
```

This gives you the `rkp` command but not the JavaScript API, which comes from the npm package.

## Bundle a file

```ts
// src/greet.ts
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

```ts
// src/main.ts
import { greet } from './greet';

console.log(greet('Rathkit'));
```

```sh
npx rkp bundle src/main.ts --outfile dist/app.mjs --minify
node dist/app.mjs
```

This prints `Hello, Rathkit!`. Add `--sourcemap` for a source map next to the file. To use it
from `package.json`, set `"build": "rkp bundle src/main.ts --outfile dist/app.mjs"`.

## Build a page

Point `rkp` at an HTML page and it builds what the page names:

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Demo</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <h1 id="title"></h1>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```sh
npx rkp bundle index.html --outdir dist
```

The module scripts and style sheets the page names are built into `dist`, the page is written
again to point at them, and images and media it names are copied.

## Develop with a server

```sh
npx rkp serve index.html --port 5173
```

The server prints its address, builds the page and rebuilds when a file the build read
changes, and the open page reloads. Add `--hmr` to replace changed modules without a reload.

## Call it from JavaScript

```js
// build.mjs
import { build } from '@rathkit/pack';

const result = await build({
  entries: 'src/main.ts',
  outfile: 'dist/api.mjs',
  minify: true,
  sourcemap: true,
});
console.log(result.files); // the files written
```

`build(options)` resolves with the files written and any warnings, and rejects with a
`BuildError` if the build fails. `serve(options)` starts the development server and resolves
once it listens. The options are the command's flags, and the package ships types for them.

## Plugins

Plugins written for other bundlers run too, through a config file or the `plugins` option.
They run in a Node process, which needs Node.js 24 or later. The
[README](https://github.com/rathkit/pack#readme) lists which plugins are covered by tests.

## Next

To check what you installed, see [Verify a release](/docs/verify/). Options and behavior in
full are in the [README](https://github.com/rathkit/pack#readme), and changes between
alphas are in the [changelog](https://github.com/rathkit/pack/blob/main/CHANGELOG.md).
