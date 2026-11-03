---
title: RTE for Vue
description: Use the Rathkit rich text editor in Vue with a component and composables over the headless layer.
sidebar:
  label: Vue
  order: 4
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages with Vue 3.5.44 in
Chromium, Firefox and WebKit. The packages are alpha, so APIs will change.
:::

`@rathkit/rte-vue` is a component and composables over the headless layer. A ref changes only
when the value it holds does, so typing does not update a Bold button.

## Install

```sh
npm install @rathkit/rte-vue@next @rathkit/rte-core@next @rathkit/rte-headless@next
```

The packages are alpha and are published to the `next` tag only, so install with `@next`.
`vue` (version 3.4 or later) comes from your own project. The wrapper has no dependencies of
its own.

## Use it

```vue
<script setup>
import { shallowRef } from "vue";
import { RteEditor, useCommand } from "@rathkit/rte-vue";

const editor = shallowRef();
const bold = useCommand(editor, "format.bold");
</script>

<template>
  <button :aria-pressed="bold.active" @click="editor?.commands.run('format.bold')">Bold</button>
  <RteEditor label="Body" default-value="<p>Hello</p>" @ready="(e) => (editor = e)" @change="(html) => console.log(html)" />
</template>
```

## What you get

- `label` is required. It names the editing surface for screen readers.
- `default-value` and `options` are read once, when the editor starts. `read-only` can change.
- `change` reports the HTML after each edit that changes it, and `ready` hands you the editor.
  Run commands on it with `editor.commands.run(name)`.
- `useCommand(editor, name)` returns a ref with whether a command can run, whether it is on, and
  its value. It is off and disabled until the editor exists. The editor can be a ref that fills in
  later.
- `useSelector(editor, selector)` follows one value worked out from the editor state, such as a
  word count. The ref changes, and anything reading it re-runs, only when that value changes.
- `useStore(editor, make, empty)` follows any of the headless stores with a ref.

## Checked

The README example is compiled with Vue's own single-file component compiler and run as written
in Chromium, Firefox and WebKit: typing reaches `change`, and the Bold button runs the command
and shows it on. Not tested: other Vue versions, server-side rendering, real devices and screen
readers.

If you would rather not use the wrapper, the [custom element](/docs/quick-start/) works in Vue
too. To check what you installed, see [Verify a release](/docs/verify/).
