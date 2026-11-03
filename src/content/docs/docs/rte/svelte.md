---
title: RTE for Svelte
description: Use the Rathkit rich text editor in Svelte with an action and stores over the headless layer.
sidebar:
  label: Svelte
  order: 5
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages with Svelte 5.57.2 in
Chromium, Firefox and WebKit. The packages are alpha, so APIs will change.
:::

`@rathkit/rte-svelte` is an action and stores over the headless layer. Svelte's store contract
is a plain shape, so the package needs nothing from Svelte itself. A store tells its subscribers
only when the value it holds changes.

## Install

```sh
npm install @rathkit/rte-svelte@next @rathkit/rte-core@next @rathkit/rte-headless@next
```

The packages are alpha and are published to the `next` tag only, so install with `@next`. The
wrapper has no dependencies of its own.

## Use it

```svelte
<script>
  import { rteEditor, command } from "@rathkit/rte-svelte";
  let editor;
  $: bold = editor && command(editor, "format.bold");
</script>

<button aria-pressed={$bold?.active} on:click={() => editor.commands.run("format.bold")}>Bold</button>
<div aria-label="Body" use:rteEditor={{ html: "<p>Hello</p>", onReady: (e) => (editor = e), onChange: (html) => console.log(html) }}></div>
```

## What you get

- Put `use:rteEditor` on an element and give that element an `aria-label`. The label names the
  editing surface for screen readers.
- The action takes `html` (the starting document), `readOnly`, `onChange`, `onReady` and the
  editor's other options. `onChange` reports the HTML after each edit that changes it, and
  `onReady` hands you the editor. Run commands on it with `editor.commands.run(name)`.
- `command(editor, name)` is a readable store with whether a command can run, whether it is
  on, and its value.
- `selector(editor, select)` is a readable store of one value worked out from the editor
  state, such as a word count.

## Checked

The README example is compiled with Svelte's own compiler and run as written in Chromium,
Firefox and WebKit: typing reaches `onChange`, and the Bold button runs the command and shows it
on. The wrapper is also checked against a Svelte derived store built on `command`. Not tested: other Svelte versions,
SvelteKit and server-side rendering, real devices and screen readers.

If you would rather not use the wrapper, the [custom element](/docs/quick-start/) works in Svelte
too. To check what you installed, see [Verify a release](/docs/verify/).
