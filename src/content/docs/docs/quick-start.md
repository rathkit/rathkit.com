---
title: Quick start
description: Put an RTE editor on a page with the custom element, in a plain form or any framework.
draft: true
---

:::caution[Pre-release]
Nothing is published yet, so these steps cannot be run. This page is built from the
package documentation and will be checked against the released packages before it is
published.
:::

The fastest way to use RTE is the custom element. It works in a plain page, in a native
form, and in any framework.

## Install

```sh
npm install @rathkit/rte-core @rathkit/rte-headless @rathkit/rte-element
```

## Add the editor

```html
<form>
  <rk-toolbar for="body"></rk-toolbar>
  <rk-editor id="body" name="body" label="Body" value="<p>Hello</p>" required></rk-editor>
</form>
<script type="module">
  import '@rathkit/rte-element/define';
</script>
```

Importing the package defines nothing by itself. Importing `@rathkit/rte-element/define`
registers `<rk-editor>` and `<rk-toolbar>`. The page needs a bundler or an import map that
resolves the three packages.

## What you get

- The editor takes part in a native `<form>`: it submits its value as HTML, resets to its
  starting content, and honors `required` and `disabled`.
- Give it a `label`. Without a label, `aria-label` or `aria-labelledby`, a warning is logged.
- Read and set the document with the `value` property. Listen for `rk-change`, whose
  detail is `{ html }`.
- `<rk-toolbar>` is a plain, unstyled toolbar with keyboard and screen reader behavior built
  in. Style it from your page, or use `@rathkit/rte-ui` for a styled interface.

## Next

Framework guides for React, Vue, Svelte and jQuery will follow, with an Angular guide once
that wrapper exists.
