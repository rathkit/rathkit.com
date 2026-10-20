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

## Planned packages

| Package | Purpose |
| --- | --- |
| `@rathkit/rte-core` | Document model, commands, view layer and plugin API |
| `@rathkit/rte-react` | React wrapper |
| `@rathkit/rte-vue` | Vue wrapper |
| `@rathkit/rte-angular` | Angular wrapper |
| `@rathkit/rte-svelte` | Svelte wrapper |
| `@rathkit/rte-plugin-<name>` | One package per plugin |

Open-source packages live under the `@rathkit` scope on npm. Premium packages
use a separate scope and are delivered from a private registry.
