---
title: RTE documentation
description: Documentation for RTE, the Rathkit rich text editor with first-party wrappers for the major frameworks. The beta is on npm.
sidebar:
  label: Overview
  order: 1
---

RTE is a rich text editor with no runtime dependencies and first-party wrappers for React,
Vue, Svelte, Angular and jQuery, or use the custom element on its own.

:::caution[Beta]
The current RTE beta, `{{rte}}`, is on npm under the `next` tag, so install with
`@next`. It is not for production yet: APIs, options, output and plugin support can still
change between releases. There is no API reference yet. Start with the [RTE quick start](/docs/quick-start/),
and see [Verify a release](/docs/verify/) to check what you install.

The beta adds a benchmark suite with a stated method, kept in its own repository,
[rte-bench](https://github.com/rathkit/rte-bench), and size and speed limits that are checked
on every change.
:::

## Packages

All eleven are published as betas, and their APIs can still change.

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
