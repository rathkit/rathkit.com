# rathkit.com

Marketing site and documentation for Rathkit, built with Astro and Starlight.
Static output only, served from shared hosting.

## Develop

    pnpm install
    pnpm dev        # http://localhost:4321
    pnpm build      # writes dist/
    pnpm preview

Node 26 and pnpm 12. Dependencies are build-time only, pinned exactly, and
install scripts stay blocked. Keep publish credentials off this repository's CI.

## Layout

- `src/pages/` marketing pages
- `src/content/docs/docs/` documentation, served at `/docs/`
- `src/styles/` brand tokens and the Starlight theme mapping
- `public/` fonts (self-hosted, see `public/fonts/README.txt`), icons, social image
