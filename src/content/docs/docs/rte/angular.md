---
title: RTE for Angular
description: Use the Rathkit rich text editor in Angular with a standalone directive, signals and a forms value accessor.
sidebar:
  label: Angular
  order: 7
---

:::caution[Alpha]
These steps were run against the published `{{rte.tested}}` packages with Angular 20.3.35,
21.2.26 and 22.2.3 in Chromium, Firefox and WebKit. The packages are alpha, so APIs will change.
:::

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

Checked against Angular 22.2.3 in Chromium, Firefox and WebKit: just-in-time, ahead-of-time
(Angular's compiler with strict templates, plus its linker) and, once, a production build with
the Angular CLI. The README example is built and run as written, and reactive and `ngModel`
forms are tested. The whole wrapper check also ran against Angular 21.2.26 and Angular 20.3.35,
the oldest major version the package allows. On Angular 20 it ran twice, with zone.js and
without it, because Angular 20 needs one or the other. Not tested: other Angular versions,
server-side rendering, real devices and screen readers.

If you would rather not use the wrapper, the custom element works in Angular too. Add
`CUSTOM_ELEMENTS_SCHEMA` to the component, import `@rathkit/rte-element/define` once, and bind
the element's `value` property and `rk-change` event.

To check what you installed, see [Verify a release](/docs/verify/).
