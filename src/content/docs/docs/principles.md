---
title: Design goals
description: The principles RTE is being built to.
---

These are goals for the first release, not features you can install today.

- **No runtime dependencies.** Each package ships without `dependencies`. The
  host framework is an optional peer in wrapper packages only.
- **A document model with no DOM.** The model and its transforms run in Node
  without a browser, so they can be tested and reused anywhere.
- **Everything is a plugin.** Bold, lists and the rest are plugins on a small
  core, so you ship only what you use.
- **Our own building blocks.** Sanitizer, translations, icons and interface
  pieces are written by us.
- **Standard module formats.** ESM, with types, tree-shakeable.
