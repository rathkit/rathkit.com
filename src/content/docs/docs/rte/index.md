---
title: RTE documentation
description: Documentation for RTE, the Rathkit rich text editor with first-party wrappers for the major frameworks. The first alphas are on npm.
sidebar:
  label: Overview
  order: 1
---

RTE is a rich text editor with no runtime dependencies and first-party wrappers for React,
Vue, Svelte, Angular and jQuery, or use the custom element on its own.

:::caution[Alpha]
The current RTE alpha, `{{rte}}`, is on npm under the `next` tag, so install with
`@next`. It is a first look, not something to build on: APIs will change between
releases. There is no API reference yet. Start with the [RTE quick start](/docs/quick-start/),
and see [Verify a release](/docs/verify/) to check what you install.
:::

## Packages

All eleven are published as alphas, and their APIs will change.

| Package | Purpose |
| --- | --- |
| `@rathkit/rte-core` | Document model, HTML import and export, commands, plugin API, view layer, and the free standard plugins |
| `@rathkit/rte-headless` | How toolbars, menus and dialogs behave for keyboard and assistive technology, with no markup or CSS |
| `@rathkit/rte-element` | The editor as a custom element, `<rte-editor>`, with a matching `<rte-toolbar>` |
| `@rathkit/rte-ui` | A styled toolbar and dialogs, themeable with tokens, presets, icons and messages |
| `@rathkit/rte-themes` | Preset themes as plain CSS design tokens |
| `@rathkit/rte-icons` | The interface icons, one SVG string each |
| `@rathkit/rte-react` | React component and hooks |
| `@rathkit/rte-vue` | Vue component and composables |
| `@rathkit/rte-svelte` | Svelte stores and an action |
| `@rathkit/rte-angular` | Angular directive, signals and a forms value accessor |
| `@rathkit/rte-jquery` | `$(el).rteEditor(options)` over the custom element |

Still to come: the reference server package, `rte-server`.

Open-source packages live under the `@rathkit` scope on npm. Premium RTE packages
use a separate scope and are delivered from a private registry.
