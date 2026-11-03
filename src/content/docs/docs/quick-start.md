---
title: RTE quick start
description: Put an RTE editor on a page with the custom element, in a plain form or any framework.
sidebar:
  label: Quick start
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages in Chromium, Firefox
and WebKit: the elements register, the value round-trips, `rk-change` fires, and the form
submits, resets and honors `required`. The packages are alpha, so APIs will change.
:::

The fastest way to use RTE is the custom element. It works in a plain page, in a native
form, and in any framework.

## Install

```sh
npm install @rathkit/rte-core@next @rathkit/rte-headless@next @rathkit/rte-element@next
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

The first releases are alpha and are published to the `next` tag only, so install with `@next`.

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

## Frameworks

Each wrapper has its own page with an install line, an example that was run as written, and what
it checks:

- [React](/docs/rte/react/): a component and hooks.
- [Vue](/docs/rte/vue/): a component and composables.
- [Svelte](/docs/rte/svelte/): an action and stores.
- [Angular](/docs/rte/angular/): a standalone directive, signals and a forms value accessor.
- [jQuery](/docs/rte/jquery/): `$(el).rkEditor(options)`.

## Next

See [what RTE does](/docs/rte/features/), and to check what you installed, see
[Verify a release](/docs/verify/).
