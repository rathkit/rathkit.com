---
title: Free and paid
description: What Rathkit RTE will always include for free, what may cost money, and the rules we hold ourselves to.
---

RTE is open source with paid options. This page says in advance where that line
sits, so nothing you rely on can later move behind a paywall.

:::caution[Beta]
RTE and Pack are in beta. The free packages are published and there are no paid products.
This page is a statement of intent that we will keep stable. There are no prices here
because none have been set.
:::

## Free forever

Everything in the `@rathkit/*` packages is free and licensed under
[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0). That includes:

- the editor core and its document model
- the wrappers for each supported framework
- the standard plugins: text formatting, headings, lists (including task lists),
  links, images, tables, paste handling, undo and redo, and accessibility support
- typed shortcuts: `# ` for headings, `> ` for a quote, three backticks for a code
  block, `**bold**`, `*italic*`, `~~strike~~` and `` `code` `` formatting, and web
  addresses that become links, each kind switchable off
- table sorting by column, row heights, per-side cell borders and dragging to select
  a block of cells
- images you can select, resize by dragging a corner or in a properties dialog, place
  beside text or centered, and caption
- find and replace, an HTML source view, text direction, indent, a symbols menu, and a
  status line with word and character counts
- paste handling that turns the standard HTML on the clipboard into correct,
  safe content, including cleaning up what Word, Google Docs and similar apps add,
  so lists, links, headings and tables come through intact
- the reference server package, `rte-server`
- the license verifier, `rte-license`, so you can read exactly what it checks
- security, correctness and accessibility fixes in the current release, for every
  user
- provenance, checksums and an SBOM on every release

If a capability is on this list, or ships in a free package, it stays free. We will
not move an existing free feature into a paid package.

## What may be paid

Paid options will be separate `@rathkit-pro/*` packages. We do not run a hosted
service for RTE and have no plans to, so nothing paid depends on one. Everything
runs in your app or on servers you control. We will only charge for things that
cost us ongoing effort or that mainly serve larger organizations:

- premium plugins that run in your app or on your own servers, including paste
  extras that recover what standard clipboard HTML does not carry, such as
  spreadsheet formatting and typed cell values
- support with response-time commitments, and long-term-support branches
- delivery and compliance extras for enterprise teams, such as offline bundles and
  security questionnaires

Which of these exist, how they are packaged and what they cost are not decided.
When they are, they will be listed on this site with their terms.

## Rules we hold ourselves to

1. **The free core never depends on paid code.** No free package imports a paid
   one.
2. **Paid plugins use the public plugin API.** They get no private hooks, so you or
   anyone else can write an equivalent plugin.
3. **Safety is not for sale.** Security, correctness and accessibility fixes are
   never limited to a paid tier.
4. **Nothing disappears on you.** If a paid license lapses, software you already
   deployed keeps working. Only newer paid releases stop being covered, and the
   free editor keeps working throughout.
5. **No phoning home.** License checks run offline in your own environment. Telemetry
   is a separate package that is off unless you install and configure it.
6. **Changes are announced.** If we ever change this page, we say what changed and
   why, here on this site, and releases already published keep their license.

## What this page is not

It is not a contract. The license text in each repository governs the code, and any
paid product will have its own written terms. If you need a commitment in writing
for your organization, contact us at
[hello@rathkit.com](mailto:hello@rathkit.com).
