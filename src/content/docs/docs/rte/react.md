---
title: RTE for React
description: Use the Rathkit rich text editor in React with a component and hooks over the headless layer.
sidebar:
  label: React
  order: 3
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages with React 18.3.1 and
19.3.1 in Chromium, Firefox and WebKit. The packages are alpha, so APIs will change.
:::

`@rathkit/rte-react` is a component and hooks over the headless layer. A component re-renders
only when the value it reads changes, so typing does not re-render a Bold button. No editor or
accessibility logic lives in the wrapper.

## Install

```sh
npm install @rathkit/rte-react@next @rathkit/rte-core@next @rathkit/rte-headless@next
```

The packages are alpha and are published to the `next` tag only, so install with `@next`.
`react` (version 18 or later) comes from your own project. The wrapper has no dependencies of
its own.

## Use it

```jsx
import { RteEditor, useCommand } from "@rathkit/rte-react";
import { useState } from "react";

function Bold({ editor }) {
  const bold = useCommand(editor, "format.bold");
  return <button aria-pressed={bold.active} onClick={() => editor.commands.run("format.bold")}>Bold</button>;
}

export function Field() {
  const [editor, setEditor] = useState();
  return (
    <>
      <Bold editor={editor} />
      <RteEditor label="Body" defaultValue="<p>Hello</p>" onReady={setEditor} onChange={(html) => console.log(html)} />
    </>
  );
}
```

## What you get

- `label` is required. It names the editing surface for screen readers.
- `defaultValue` is read once, when the editor starts. Later changes to the prop are ignored; to
  replace the document, call `editor.setHtml`.
- `onChange` reports the HTML after each edit that changes it, and `onReady` hands you the
  editor once it exists. Run commands on it with `editor.commands.run(name)`.
- `readOnly` and the editor's other options (`RteOptions`) are props.
- `useCommand(editor, name)` returns whether a command can run, whether it is on, and its value.
  Before the editor exists it is off and disabled.
- `useSelector(editor, selector)` follows one value worked out from the editor state, such as a
  word count. Give it a selector declared outside the component, or wrapped in `useCallback`.
- `useStore(store)` reads any of the headless stores as React state.
- `useRteEditor(props)` is the hook behind the component, for when you draw the surface
  yourself: give its `ref` to one element.

## Checked

The README example is built and run as written in Chromium, Firefox and WebKit: typing reaches
`onChange`, and the Bold button runs the command and shows it on. The whole wrapper check ran
against React 18.3.1 (the oldest major version the package allows) and 19.3.1. Not tested: other React
versions, server-side rendering, real devices and screen readers.

If you would rather not use the wrapper, the [custom element](/docs/quick-start/) works in React
too. To check what you installed, see [Verify a release](/docs/verify/).
