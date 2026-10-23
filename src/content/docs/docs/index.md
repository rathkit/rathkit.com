---
title: Rathkit RTE documentation
description: Documentation for RTE, the Rathkit rich text editor. In development.
sidebar:
  label: Overview
---

RTE is the first Rathkit library: a rich text editor with no runtime
dependencies and first-party wrappers for the major frameworks.

:::caution[Pre-release]
RTE is in development and nothing is published yet. These pages describe the
design goals. Installation and API reference will be written from the released
packages.
:::

## Packages in development

None of these is published yet, and their APIs will change.

| Package | Purpose |
| --- | --- |
| `@rathkit/rte-core` | Document model, HTML import and export, commands, plugin API, view layer, and the free standard plugins |
| `@rathkit/rte-headless` | How toolbars, menus and dialogs behave for keyboard and assistive technology, with no markup or CSS |
| `@rathkit/rte-element` | The editor as a custom element, `<rk-editor>`, with a matching `<rk-toolbar>` |
| `@rathkit/rte-ui` | A styled toolbar and dialogs, themeable with tokens, presets, icons and messages |
| `@rathkit/rte-themes` | Preset themes as plain CSS design tokens |
| `@rathkit/rte-icons` | The interface icons, one SVG string each |
| `@rathkit/rte-react` | React component and hooks |
| `@rathkit/rte-vue` | Vue component and composables |
| `@rathkit/rte-svelte` | Svelte stores and an action |
| `@rathkit/rte-jquery` | `$(el).rkEditor(options)` over the custom element |

Still to come: an Angular wrapper and the reference server package, `rte-server`.

Open-source packages live under the `@rathkit` scope on npm. Premium packages
use a separate scope and are delivered from a private registry.
