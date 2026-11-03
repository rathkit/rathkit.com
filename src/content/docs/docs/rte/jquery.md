---
title: RTE for jQuery
description: Use the Rathkit rich text editor from jQuery with $(el).rkEditor(options) over the custom element.
sidebar:
  label: jQuery
  order: 6
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages with jQuery 3.7.1 and
4.0.0 in Chromium, Firefox and WebKit. The packages are alpha, so APIs will change.
:::

`@rathkit/rte-jquery` adds `$(el).rkEditor(options)` over the custom element, and reports edits
as `rk:change` events. It is for pages that already use jQuery and a bundler or an import map.

## Install

```sh
npm install @rathkit/rte-jquery@next @rathkit/rte-core@next @rathkit/rte-element@next
```

The packages are alpha and are published to the `next` tag only, so install with `@next`.
`jquery` comes from your own project. The wrapper has no dependencies of its own.

## Use it

```js
import $ from "jquery";
import "@rathkit/rte-element/define";
import { install } from "@rathkit/rte-jquery";

install($);

// in a page with <div id="editor"></div>
$("#editor").rkEditor({ label: "Body", html: "<p>Hello</p>" });
$("#editor").on("rk:change", (event, html) => console.log(html));
$("#editor").rkEditor("html");               // read it; rkEditor("html", "<p>x</p>") replaces it
```

## What you get

- `install($)` adds the `rkEditor` method to the jQuery you pass it. Importing
  `@rathkit/rte-element/define` registers the elements the method builds on.
- `$(el).rkEditor({ label, html, readOnly, ... })` turns the element into an editor, once.
  `label` is required: it names the editing surface for screen readers.
- `rkEditor("html")` reads the HTML of the first element, and `rkEditor("html", "<p>x</p>")`
  replaces it.
- `rkEditor("editor")` gives the editor of the first element, as a promise, because the editor is
  built when the element connects. Run commands on it with `editor.commands.run(name)`.
- `rkEditor("destroy")` removes the editor.
- Edits arrive as `rk:change` events with the HTML as the second argument to the handler.

## Checked

The README example is bundled with each and run as written in Chromium, Firefox and
WebKit: the editor is built, and typing fires `rk:change` with the HTML. The other calls on this
page (reading and replacing the HTML, getting the editor, and `destroy`) were also run against
the published packages in the same three browsers. The whole wrapper check ran against jQuery 3.7.1 and
4.0.0. Not tested: other jQuery versions, real devices and screen readers.

To check what you installed, see [Verify a release](/docs/verify/).
