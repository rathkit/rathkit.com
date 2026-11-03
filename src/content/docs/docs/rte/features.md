---
title: What RTE does
description: What the Rathkit rich text editor can do today, from text and lists to tables, images, footnotes and Markdown, and which of it is built in or opt-in.
sidebar:
  label: Features
  order: 2
---

This is what the editor does today, in the alpha. Everything here is free and open source.
"Standard" means the editor made by `createEditor()` from `@rathkit/rte-core/standard`, or the
`<rk-editor>` element, which has the same plugins. Each plugin is also an entry point of
`@rathkit/rte-core`, so a page that builds the editor from parts takes only what it lists.

:::note[Alpha]
APIs will change between alphas. Footnotes and Markdown arrived in `0.1.0-alpha.4`.
:::

## Text and blocks

- Bold, italic, underline, strikethrough, code, superscript and subscript, text and highlight
  colors, and links.
- Headings, paragraphs, block quotes, code blocks and rules.
- Alignment, reading direction (left to right and right to left) and indentation.
- Typed shortcuts such as `# ` for a heading, `> ` for a quote and `**bold**` (standard).
- Find and replace, with case and whole-word options. A replace-all is one undo step (standard).
- An HTML source view, and word and character counts.

Every action is a named command, so a toolbar, a key and a script all go through the same path.

## Lists

Bulleted, numbered and definition lists, nested, with Tab and Shift+Tab to change depth, and
Enter and Backspace that behave the way people expect at the start and end of an item. Task
items with a checked state. A list item can hold more than a line: more paragraphs, code,
quotes and nested lists (standard).

## Tables

Insert a table, add and remove rows and columns, merge and split cells, set column widths, and
turn the first row into a header. Cells can have a background color and borders. Tab and
Shift+Tab move between cells. A document that contains tables loads, shows and saves them even
when the tables plugin is not installed (standard).

## Images

PNG, JPEG, GIF and WebP images are checked by their first bytes, never by the type they claim.
SVG is cleaned to an allow-list and refused when it cannot be read as well-formed XML. You pass
an upload function to store images on your own server, or small images are embedded up to a
limit you set. Remote images are kept as addresses and are not fetched while pasting. Images
can have a caption and can float to one side of the text (standard).

## Footnotes

A numbered reference in the text and its note in a list at the end. Numbers follow the order of
the references and are never stored, so inserting a new reference before the others renumbers
the rest. Deleting a reference removes its note, and one undo brings both back. A note can hold
several paragraphs, lists, code and quotes. Footnotes are read and written in HTML, and in
Markdown when that plugin is on. They are in the standard editor, and `footnotes: false` leaves
them out.

## Markdown

Opt-in: add `markdown()` from `@rathkit/rte-core/markdown`. It reads CommonMark with tables,
task items, strikethrough and footnotes, and writes Markdown from the document. Plain-text
paste that clearly looks like Markdown is read as Markdown, and copy can put Markdown on the
clipboard. When the clipboard also holds HTML, the HTML is used. Raw HTML in Markdown stays text.

## Paste

Paste from word processors and web pages has the vendor markup removed, lists that arrive as
one-item lists are rebuilt into real nested lists, table spans and emphasis are kept, and links
and images go through the same checks as typed content. Anything that has to be inferred from
appearance, such as headings guessed from bold text, is not part of the free editor. See
[Free and paid](/docs/free-and-paid/).

## Plugins

The core is the document model, HTML in and out, the commands and the plugin host. Everything
above it is a plugin written against the same public API that any plugin gets. A plugin can add
commands, keys, paste and copy handling, typed shortcuts, interface parts, and its own code for
the page, and it can repair the document after each edit within the same undo step.

## Where to look next

- [RTE quick start](/docs/quick-start/) to put an editor on a page.
- [RTE overview](/docs/rte/) for the packages.
- The documents in the [repository](https://github.com/rathkit/rte/tree/main/docs) for each
  area in detail: lists, tables, images, Markdown, footnotes, paste and plugins.
