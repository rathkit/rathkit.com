---
title: Pack options
description: Every option of the rkp command, grouped by what it does, with the commands that were run to check them.
sidebar:
  label: Options
  order: 3
---

:::caution[Beta]
Every command on this page was run against the published `{{pack.tested}}` package on Linux.
Options can change between releases. The list is also what `rkp` accepts: a word that
starts with a dash and is not an option is an error (exit code 2), never a file name.
:::

## The commands

```sh
rkp bundle ENTRY... [options]     # build, then stop
rkp serve  ENTRY... [options]     # build and serve for development
rkp --version                     # prints "rkp {{pack.tested}}"
```

An entry is a JavaScript, TypeScript, JSX or TSX file, or an HTML page. A page is built along
with the scripts and style sheets it names. `rkp serve` takes the same options as `rkp bundle`,
and the ones in [The development server](#the-development-server).

Most options that take a value want it as the next word: `--outfile dist/app.mjs`. A few also
accept `=` or `:` in the same word, and the tables say which. The JavaScript API takes the same
options in camel case (`--minify-whitespace` is `minifyWhitespace`); see the
[package README](https://github.com/rathkit/pack/blob/main/npm/pack/README.md).

## Output

| Option | What it does |
| --- | --- |
| `--outfile FILE` | Writes one file. Style sheets the entry imports go beside it, with the extension `.css` |
| `--outdir DIR` | Writes the files into a folder and lists them. A single bundle is `bundle.js` |
| `--splitting` | With `--outdir` and the `esm` format, puts code shared by entries and `import()` targets in their own files |
| `--format esm\|cjs\|iife` | The module format. Default `esm` |
| `--global-name NAME` | For `iife`, the global that holds the entry's exports |
| `--global SPEC=NAME` | For `iife`, the global that stands for an external module: `--external react --global react=React` |
| `--sourcemap[=linked\|inline\|external]` | Writes a source map. Plain `--sourcemap` is `linked`: a `.map` file and a comment that points to it |
| `--no-sources-content` | Leaves the source text out of the map |
| `--metafile=FILE` | Writes JSON that lists the inputs, the outputs and what each imports and exports. The sizes in it are estimates |
| `--entry-names=T` | The names of entry files. `[name]` and `[hash]` are filled in. Default `[name]`. No folders |
| `--chunk-names=T` | The names of the other files. Default `[name]-[hash]`. No folders |
| `--out-extension:.js=.mjs` | The extension of each kind of output file. `.css=` works too |
| `--legal-comments=eof\|none\|linked\|external` | Where comments that say who wrote code and under what terms go. Default `eof`, after the code of the file |
| `--banner:js=TEXT`, `--footer:js=TEXT` | Text put around every JavaScript file. `:css=` does the same for style sheets |

With neither `--outfile` nor `--outdir`, `rkp bundle` prints the result.

```sh
rkp bundle src/main.ts --outfile dist/app.mjs
rkp bundle src/main.ts --outdir dist --splitting
rkp bundle src/main.ts --outfile dist/app.js --format iife --global-name App
rkp bundle src/main.ts --outdir dist --splitting --entry-names=[name]-[hash] --chunk-names=[name]-[hash]
```

## Smaller output

| Option | What it does |
| --- | --- |
| `--minify` | `--minify-whitespace`, `--minify-identifiers` and `--minify-syntax` together |
| `--minify-whitespace` | Removes spaces, line breaks and comments |
| `--minify-identifiers` | Shortens the names of local variables |
| `--minify-syntax` | Rewrites code into shorter forms that do the same |
| `--keep-names`, `--no-keep-names` | Keep the `.name` of functions, classes and variables that name an anonymous function when shortening names, or not. Default: kept when decorators are on, because frameworks read class names at run time |
| `--no-treeshake` | Keeps code nothing uses. Tree shaking is on by default |
| `--drop:console`, `--drop:debugger` | Removes `console.*(...)` calls (arguments included) and `debugger` statements |
| `--pure:NAME` | Calls of `NAME` (a name, or a chain such as `styled.div`) have no side effects, so an unused one is removed |
| `--target=T` | The JavaScript the output may use: `es2015` to `es2025`, or `esnext` (default, rewrites nothing), or engines such as `chrome80,safari13.1,node18` |

Newer syntax than the target is rewritten. For example, with `--target=es2019` the line
`export const f = (a) => a?.b ?? 1;` becomes

```js
var __rk0;
const f = (a) => ((__rk0 = (a == null ? void 0 : a.b) ) != null ? __rk0 :  1);
export { f };
```

## Finding modules

| Option | What it does |
| --- | --- |
| `--external NAME` | Leaves an import out of the bundle. Can be repeated |
| `--packages=external` | Leaves out every import of a package (a name that is not a path) |
| `--alias NAME=PATH` | The name, and anything below it, resolves to the path |
| `--condition NAME` | Adds a condition to follow in the `exports` and `imports` of packages. Can be repeated |
| `--main-field NAME` | A `package.json` field to read an entry from. The first use replaces the default list; repeat it to add more |
| `--resolve-extensions=.ts,.js` | The extensions to try for an import with none |
| `--preserve-symlinks` | Does not follow symbolic links to their real path |
| `--platform-browser` | Builds for a browser: Node's built-in modules that no plugin supplies become empty modules |
| `--original-paths` | Names of files in the output keep their original paths in maps and in `import.meta.url`, and a `require` with a variable looks from the module's original folder |
| `--inject:FILE` | What the file exports stands in for the globals of those names, in every module that uses one |

## Values and files

| Option | What it does |
| --- | --- |
| `--define KEY=VALUE` | Replaces an expression (`__VERSION__`, `process.env.NODE_ENV`) with a constant, a name or an expression. `--define:KEY=VALUE` works too |
| `--loader .ext=NAME` | How to read files with that extension: `text`, `base64`, `dataurl`, `binary`, `file`, `empty`, `css` or `local-css`. `--loader:.ext=NAME` works too |
| `--asset-names T` | The names of copied files. `[name]`, `[hash]` and `[ext]` (no dot) are filled in |
| `--public-path P` | What the addresses of copied files start with |

```sh
rkp bundle src/main.ts --outfile dist/app.mjs --define __VERSION__='"1.0"' --loader .svg=dataurl
rkp bundle src/main.ts --outdir dist --loader .svg=file --asset-names '[name]-[hash]' --public-path /assets/
```

The second command copies `logo.svg` to `dist/logo-gbkgv3lr.svg` and writes its address in the
script as `/assets/logo-gbkgv3lr.svg`.

### Environment variables

`import.meta.env` holds `MODE`, `DEV`, `PROD`, `SSR` and `BASE_URL`, and the variables of the
`.env`, `.env.local`, `.env.[mode]` and `.env.[mode].local` files whose names start with `VITE_`.
The rest of a `.env` file is not put in the output.

| Option | What it does |
| --- | --- |
| `--mode NAME` | The mode. `import.meta.env.MODE`, and which `.env.[mode]` file is read. Default `production`; `development` for `rkp serve` |
| `--env-dir DIR` | Where the `.env` files are. Default: the current folder |
| `--env-prefix P` | A prefix that lets a variable through, in place of `VITE_`. Can be repeated |
| `--no-env-files` | Reads no `.env` files |

With a `.env` file that holds `VITE_A=one`, `APP_B=two` and `SECRET=x`, a script that prints
`import.meta.env.VITE_A`, `import.meta.env.APP_B` and `import.meta.env.SECRET` prints
`undefined two undefined` after `--env-prefix APP_`, and `one undefined undefined` after
`--mode staging`.

## TypeScript and JSX

| Option | What it does |
| --- | --- |
| `--tsconfig FILE`, `--no-tsconfig` | Use this `tsconfig.json`, or none. By default the nearest one is found and `extends` is followed |
| `--tsconfig-raw=JSON` | A tsconfig given as text, used in place of any file |
| `--experimental-decorators` | TypeScript's legacy decorators, in place of the standard ones |
| `--decorator-metadata` | Writes `emitDecoratorMetadata` output |
| `--strict-null-checks` | The same as `strictNullChecks` in a tsconfig |
| `--jsx automatic\|classic` | The JSX transform. Default `automatic` |
| `--jsx-import-source S` | The package that supplies `jsx-runtime`, for `automatic`. Default `react` |
| `--jsx-factory F`, `--jsx-fragment F` | The functions JSX becomes, for `classic`. Defaults `React.createElement` and `React.Fragment` |
| `--jsx-dev` | JSX becomes `jsxDEV`, told where each element is written |
| `--dts` | Writes `.d.ts` files for the entries, next to the output |
| `--dts-dir=DIR` | Writes them to this folder instead |
| `--dts-bundle` | One declaration file per entry |

A `tsconfig.json` supplies `paths`, `baseUrl`, `jsx`, `jsxImportSource`, `jsxFactory`,
`jsxFragmentFactory`, `experimentalDecorators`, `emitDecoratorMetadata` and `strictNullChecks`.

`--dts` and its two companions write the files with your project's own `typescript` package, so
it must be installed, and it needs Node. They were run with TypeScript 5.9.3 and 7.0.2, the
native version, and `--dts` and `--dts-dir` wrote `greet.d.ts` and `main.d.ts` with both.
`--dts-bundle` merges the files with TypeScript's JavaScript API, which version 7 does not
have, so with 7.0.2 it stops with `error: --dts: --dts-bundle merges declarations with the
JavaScript API of typescript, which version 7.0.2 does not have; install typescript 5 or 6 for
it`. With 5.9.3 it wrote one declaration file.

## Plugins and configuration

| Option | What it does |
| --- | --- |
| `--config FILE` | A config file that lists plugins. By default `rathkit.config.mjs`, `.js` or `.cjs`, or a `.parcelrc`, next to the project |
| `--no-config` | Ignores the config file |
| `--watch` | Builds again when a file the build read changes. Ctrl-C ends it |
| `--federation FILE` | Module federation options as JSON: `exposes`, `remotes`, `shared` and the rest. Needs `esm` and `--outdir` |

[Plugins](/docs/pack/plugins/) shows each kind of plugin working. With `--watch`, a change to
`src/greet.ts` printed `changed: src/greet.ts` and `rebuilt in 1 ms`.

A build with `--federation` of `{"name":"shop","exposes":{"./greet":"./src/greet.ts"},"shared":{}}`
wrote `remoteEntry.js`, `mf-manifest.json` and a `@mf-types` folder next to the chunks.

## The development server

```sh
rkp serve index.html --port 5173
```

| Option | What it does |
| --- | --- |
| `--port N` | The port. Default `5173` |
| `--host H` | The address to listen on. Default `localhost` |
| `--hmr` | Replaces changed modules in the open page and keeps its state, in place of reloading it |
| `--react-refresh`, `--no-react-refresh` | React Fast Refresh with `--hmr`. It is on when the project has `react` and `react-refresh` installed. `--react-refresh` asks for it and stops with an error if the package is missing |
| `--https` | Serves over HTTPS with a certificate made for the machine, which the browser asks you to trust once |
| `--https-cert FILE`, `--https-key FILE` | Use your own certificate and key, in PEM |
| `--cors-origin ORIGIN` | Lets another origin load this server's files. Can be repeated |
| `--real-federation-plugin` | Runs the plugin `federation()` from `@module-federation/vite` itself, in place of only reading its options |

Without `--hmr`, an edit to a style sheet is swapped in place and any other edit reloads the
page. A build error shows as an overlay that goes away when the error is fixed.

Each of these started a server that answered with status 200: the defaults, `--port 4567 --host
127.0.0.1`, `--hmr`, `--hmr --no-react-refresh`, `--https`, `--https --https-cert cert.pem
--https-key key.pem`, `--mode staging --platform-browser` and `--cors-origin
http://localhost:9999`.

## Other commands

`rkp` with no arguments lists the commands used to develop Pack itself (`--parse-check`,
`--graph`, `--resolve-dump` and others). They are not part of the options above, and they can
change at any time.
