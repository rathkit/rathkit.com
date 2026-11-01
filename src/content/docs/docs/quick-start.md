---
title: RTE quick start
description: Put an RTE editor on a page with the custom element, in a plain form or any framework.
sidebar:
  label: Quick start
---

:::caution[Alpha]
These steps were run against the published `0.1.0-alpha.3` packages in Chromium, Firefox
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

## Angular

Angular has a wrapper, `@rathkit/rte-angular`: a standalone directive, signals over the
headless layer, and an Angular forms value accessor.

```sh
npm install @rathkit/rte-angular@next @rathkit/rte-core@next @rathkit/rte-headless@next
```

`@angular/core` (version 20 or later) and `@angular/forms` (only for the forms entry) are
optional peer dependencies that come from your own project. The wrapper has no dependencies
of its own.

```ts
import { Component, signal } from '@angular/core';
import { RteEditor, commandState } from '@rathkit/rte-angular';
import type { Editor } from '@rathkit/rte-core/dom';

@Component({
  selector: 'app-root',
  imports: [RteEditor],
  template: `
    <button [attr.aria-pressed]="bold().active" (click)="editor()?.commands.run('format.bold')">Bold</button>
    <div rteEditor label="Body" defaultValue="<p>Hello</p>" (ready)="editor.set($event)" (change)="log($event)"></div>
  `,
})
export class App {
  protected readonly editor = signal<Editor | undefined>(undefined);
  protected readonly bold = commandState(this.editor, 'format.bold');
  protected log(html: string): void { console.log(html); }
}
```

- `label` is required. It names the editing surface for screen readers.
- `defaultValue` and `options` are read once, when the editor starts. `readOnly` can change.
- `change` reports the HTML after each edit, and `ready` hands you the editor.
- The directive is exported as `rteEditor`. `setValue(html)` replaces the document without
  counting as an edit.
- `commandState(editor, name)` and `selected(editor, fn)` are signals that change only when the
  value they hold changes, so typing does not update a Bold button.
- For forms, import `RteValueAccessor` from `@rathkit/rte-angular/forms`. `ngModel`,
  `formControl` and `formControlName` then work on an element with `rteEditor`. The value is the
  HTML, a disabled control makes the editor read-only, and leaving the editor marks it touched.
  Apps that do not use Angular forms never load that entry.
- The editor runs outside Angular's change detection. Only edits and the ready event are
  brought back in, and zoneless apps work.
- It is 1.4 KB gzipped without the forms entry and 1.5 KB with it (unminified, measured by the
  repository's size check).

Checked against Angular 22 in Chromium, Firefox and WebKit: just-in-time, ahead-of-time
(Angular's compiler with strict templates, plus its linker) and, once, a production build with
the Angular CLI. The README example is built and run as written, and reactive and `ngModel`
forms are tested. Not tested: other Angular versions, server-side rendering, real devices and
screen readers.

If you would rather not use the wrapper, the custom element works in Angular too. Add
`CUSTOM_ELEMENTS_SCHEMA` to the component, import `@rathkit/rte-element/define` once, and bind
the element's `value` property and `rk-change` event.

## Next

Framework guides for React, Vue, Svelte and jQuery will follow. To check what you installed, see [Verify a release](/docs/verify/).
