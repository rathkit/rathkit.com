# rathkit.com

Marketing site and documentation for Rathkit, built with Astro and Starlight.
Static output only, served from shared hosting at https://rathkit.com.

## Develop

    pnpm install
    pnpm dev        # http://localhost:4321
    pnpm build      # writes dist/ and dist/.htaccess
    pnpm check      # validates dist/ (run after build)
    pnpm preview

Node 26 and pnpm 12. Dependencies are build-time only and pinned exactly, and
install scripts stay blocked (`--ignore-scripts`). The site ships almost no
client-side JavaScript: the theme toggle, and search on the docs.

`pnpm check` reads the built pages and fails on a missing title, description or
canonical, anything other than one `h1`, an image without `alt`, a broken
internal link or anchor, and brand text colors below 4.5:1 contrast in either
theme.

## Layout

- `src/pages/` marketing pages
- `src/layouts/Site.astro` marketing layout, header and footer
- `src/content/docs/docs/` documentation, served at `/docs/`. Pages appear in the
  sidebar automatically
- `src/styles/` brand tokens (`--rk-*`) and their mapping onto Starlight's theme
- `public/` fonts (self-hosted, see `public/fonts/README.txt`), icons, social image,
  `robots.txt`
- `scripts/postbuild.mjs` writes `dist/.htaccess` from `deploy/htaccess.tpl`
- `scripts/check.mjs` the build check above

## Deploy

A push to `main` runs `.github/workflows/deploy.yml`: build, then upload `dist/` over
explicit FTPS with `lftp` into the document root of rathkit.com. Run the workflow by
hand for a dry run (the default) before changing it.

- Secrets: `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`. The account is scoped to that one
  folder. `FTP_HOST` must be the host name on the server's certificate.
- The upload mirrors with `--delete`, so files removed from the build are removed from
  the host. The host's own files (`.well-known/`, `cgi-bin/` and similar) are excluded.
- Never print raw `lftp` output. The workflow redacts credentials from it, and any
  change must keep that filter.
- Actions are pinned by commit SHA.

## Headers and redirects

`deploy/htaccess.tpl` carries the security headers, an enforced
`Content-Security-Policy`, HTTPS and `www` redirects, and the 404 handling. The host
serves a parent `.htaccess` from `public_html` that this folder inherits, which is why
the template answers unknown paths with 404 before those rules run.

`scripts/postbuild.mjs` hashes every inline script into the CSP. If you add an inline
script, rebuild and the hash follows. If you add a third-party origin, you have changed
a published claim on the Security page, so update that page too.

## Content rules

- Claims must be checkable: no invented APIs, prices or numbers, and no compliance
  claims we do not hold.
- Pages about RTE describe planned behavior as planned until it ships.
- Do not name or compare with other products.

## License

Apache-2.0 (see `LICENSE`) for the code and written content. The Rathkit name, logo and
artwork are excluded; see `TRADEMARKS.md`.

## Brand assets

The brand source files are kept outside this repository. This repo holds only the
copies the site serves, in `public/`.
