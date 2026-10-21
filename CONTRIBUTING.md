# Contributing to rathkit.com

This repository is the Rathkit website and documentation, not the libraries. Each
library has its own repository and its own contribution notes.

## Before you start

- For anything beyond a typo or small fix, open an issue first so we can agree on
  the change.
- Do not report security problems in issues. See the
  [Security page](https://rathkit.com/docs/security/).

## Setup

See `README.md`. You need Node 26 and pnpm 12.

    pnpm install
    pnpm build
    pnpm check

`pnpm check` must pass before you open a pull request.

## What we look for

- **Plain, checkable writing.** Say what is true today. Describe unreleased work as
  planned. Do not invent versions, prices, numbers, APIs or certifications.
- **No other products.** Do not name, compare with or borrow wording from other
  products.
- **No new runtime weight.** The site ships almost no JavaScript. Do not add client
  scripts, analytics, tracking, third-party fonts or third-party requests. The
  Content-Security-Policy blocks them, and the Security page promises none.
- **New dependencies are exceptional.** Build-time dependencies are pinned exactly and
  installed with scripts disabled. Explain why a new one is needed.
- **Accessible by default.** Keep one `h1` per page, give images alt text, and keep
  text contrast at 4.5:1 or better in both themes.
- **Brand tokens, not new colors.** Use the `--rk-*` variables in
  `src/styles/brand.css`.

## Pull requests

- Keep each pull request to one change.
- Describe what changed and why, and say how you checked it.
- Sign your commits.

## License

The license for this repository's content and code has not been set yet. The
Rathkit name, logo and brand artwork are not licensed for reuse. Libraries are
licensed under Apache-2.0 in their own repositories.
