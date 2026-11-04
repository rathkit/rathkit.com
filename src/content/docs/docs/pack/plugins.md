---
title: Pack plugins
description: The kinds of plugin Pack runs, how to list them in a config file or in JavaScript, and an example of each that was run.
sidebar:
  label: Plugins
  order: 4
---

:::caution[Alpha]
Every command and file on this page was run against the published `{{pack.tested}}` package on
Linux. Plugin support can change between alpha releases, and it is claimed only as far as the
[list of what is tested](https://github.com/rathkit/pack#what-it-does) in the repository goes.
A plugin that is not on that list may work. A bug report with its name is welcome.
:::

Pack runs plugins written for other bundlers. You list them in a config file, and a Node
process runs them, so a build with no config never starts Node. Plugins need **Node.js 24 or
later**.

## Where plugins are listed

| How | What it does |
| --- | --- |
| `--config FILE` | Reads this file |
| `rathkit.config.mjs`, `.js` or `.cjs` | Read when it is next to the project |
| `.parcelrc` | Read when it is next to the project, for Parcel plugins |
| `--no-config` | Ignores all of these |
| `plugins` in the JavaScript API | See [From JavaScript](#from-javascript) |

A config file default-exports an object. `plugins` lists Rollup, Vite and esbuild plugins and
webpack plugins. `module.rules` lists webpack loaders. A webpack config is not found by its
name: give it with `--config webpack.config.mjs`. All of the kinds can be in one build.

## The kinds

### Rollup and Vite plugins

Pack calls the hooks `options`, `buildStart`, `resolveId`, `resolveDynamicImport`, `load`,
`transform` (source maps are chained), `moduleParsed`, `buildEnd`, `renderChunk`,
`generateBundle`, `writeBundle`, `closeBundle`, `watchChange`, `closeWatcher`,
`resolveFileUrl`, `banner`, `footer`, `intro` and `outro`, and the hook filters, `enforce` and
`apply`. For Vite plugins it also calls `config`, `configResolved`, `transformIndexHtml`,
`handleHotUpdate` and `configureServer`. The context has `resolve`, `load`, `emitFile`,
`getFileName`, `getModuleInfo`, `getModuleIds`, `addWatchFile`, `parse`, `warn` and `error`.

A plugin that makes a virtual module:

```js
// rollup.config.mjs
export default {
  plugins: [
    {
      name: 'version',
      resolveId(id) {
        return id === 'virtual:version' ? '\0virtual:version' : null;
      },
      load(id) {
        return id === '\0virtual:version' ? 'export default "1.2.3";' : null;
      },
    },
  ],
};
```

```js
// src/main.js
import version from 'virtual:version';
import motd from './motd.txt';
console.log(version, motd);
```

```sh
rkp bundle src/main.js --config rollup.config.mjs --outfile out/app.mjs --loader .txt=text
node out/app.mjs
```

This prints `1.2.3 hello from a text file`.

### esbuild plugins

A plugin with `setup(build)` can use `onStart`, `onResolve`, `onLoad` and `onEnd`, namespaces,
`pluginData` and `resolveDir`. The same virtual module:

```js
// esbuild.config.mjs
export default {
  plugins: [
    {
      name: 'version',
      setup(build) {
        build.onResolve({ filter: /^virtual:version$/ }, (args) => ({ path: args.path, namespace: 'version' }));
        build.onLoad({ filter: /.*/, namespace: 'version' }, () => ({ contents: 'export default "1.2.3";', loader: 'js' }));
      },
    },
  ],
};
```

```sh
rkp bundle src/main.js --config esbuild.config.mjs --outfile out/app.mjs --loader .txt=text
node out/app.mjs
```

This prints `1.2.3 hello from a text file` as well.

### webpack loaders and plugins

Loaders are listed in `module.rules`. Pack supports pitching loaders, inline requests, `raw`,
async loaders, `this.getOptions`, `this.loadModule`, `this.importModule` and `type: asset/*`.
A plugin written against the compiler gets a `compiler` and a `compilation` with the hooks
webpack runs, in their order, and the assets, modules, chunks and stats it expects. `webpack`
does not need to be installed: `DefinePlugin`, `EnvironmentPlugin`, `ProvidePlugin`,
`BannerPlugin`, `IgnorePlugin`, `NormalModuleReplacementPlugin` and `EntryPlugin` are built in.

A loader that turns a text file into a module with the text in capitals:

```js
// upper-loader.cjs
module.exports = function (source) {
  return `export default ${JSON.stringify(String(source).toUpperCase())};`;
};
```

A config that uses it, with a plugin that writes one more file and the virtual module from
above:

```js
// webpack.config.mjs
import { fileURLToPath } from 'node:url';

class NotePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('NotePlugin', (compilation) => {
      compilation.hooks.processAssets.tap({ name: 'NotePlugin', stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL }, () => {
        compilation.emitAsset('note.txt', new compiler.webpack.sources.RawSource('written by a plugin\n'));
      });
    });
  }
}

export default {
  module: { rules: [{ test: /\.txt$/, use: [{ loader: fileURLToPath(new URL('./upper-loader.cjs', import.meta.url)) }] }] },
  plugins: [
    new NotePlugin(),
    { name: 'version', resolveId: (id) => (id === 'virtual:version' ? '\0virtual:version' : null), load: (id) => (id === '\0virtual:version' ? 'export default "1.2.3";' : null) },
  ],
};
```

```sh
rkp bundle src/main.js --config webpack.config.mjs --outdir out
node out/bundle.js
cat out/note.txt
```

This prints `1.2.3 HELLO FROM A TEXT FILE`, and `note.txt` holds `written by a plugin`. The
Rollup-style plugin and the webpack plugin worked in the same build.

Not supported: webpack plugins that depend on webpack's own module and chunk graph internals
beyond what is listed here, such as `SplitChunksPlugin`.

### Parcel plugins

A `.parcelrc` next to the project (or `parcel` in the config) lists Parcel plugins:
transformers, resolvers, reporters, optimizers, validators, compressors, namers and runtimes.
They run with `@parcel/plugin`, either the real package or a small stand-in when it is not
installed. Parcel's own plugins for JavaScript, CSS, HTML and JSON are not run: Pack does that
work itself. No Parcel command was run for this page. The
[repository README](https://github.com/rathkit/pack#what-it-does) lists the Parcel plugins
that are tested.

## From JavaScript

`build` and `serve` take a `plugins` option, a list of plugin objects with Rollup-style hooks
and Vite's `config`, `configResolved`, `transformIndexHtml`, `handleHotUpdate` and a subset of
`configureServer`.

```js
// api.mjs
import { build } from '@rathkit/pack';

const result = await build({
  entries: 'src/main.js',
  outfile: 'out/api.mjs',
  loader: { '.txt': 'text' },
  plugins: [
    {
      name: 'version',
      resolveId: (id) => (id === 'virtual:version' ? '\0virtual:version' : null),
      load: (id) => (id === '\0virtual:version' ? 'export default "1.2.3";' : null),
    },
  ],
});
console.log(Object.keys(result));
```

```sh
node api.mjs
node out/api.mjs
```

The first command prints the keys of the result (`ok`, `status`, `stdout`, `stderr`,
`errors`, `warnings` and `files`), and the second prints `1.2.3 hello from a text file`.

The plugin objects stay in your process. The program calls their hooks across a local
connection, so what goes in and out is JSON. A plugin that needs more than that, for example
Vite's `server.watcher`, goes in a config file, where it runs in the plugin host itself. A
plugin can also be given as `{ module, export, options }`, to load it from a module.

## Plugins and the development server

With `rkp serve`, Vite plugins take part through `configureServer` (`server.middlewares`,
`server.ws.send` and `server.watcher`), `transformIndexHtml` and `handleHotUpdate`. See
[Options](/docs/pack/options/#the-development-server) for `--hmr`.
