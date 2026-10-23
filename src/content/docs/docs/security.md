---
title: Security
description: What Rathkit commits to for its software and this site, what we do not claim, and how to report a vulnerability.
---

RTE is pre-release. This page separates what is true of this site today from what
the libraries are being built to. We will update it when packages ship, and we only
list claims you can check.

## The libraries: commitments

These are release gates for every Rathkit package, not features you can install yet.

- **No runtime dependencies.** `npm ls --omit=dev` is empty. Wrapper packages may
  declare the host framework as an optional peer.
- **No install scripts.** Installing a package runs none of our code.
- **Nothing stored or sent by default.** The editor does not use `localStorage`,
  cookies or IndexedDB, and makes no network requests. A feature that needs the
  network is a plugin you add, pointed at your own endpoints.
- **Content stays with you.** Editor content is never sent to Rathkit.
- **Telemetry is a separate package.** If it exists, you install it on purpose, it is
  off until you configure it, and no other package imports it.
- **Safety fixes ship to everyone.** Correctness, accessibility and security fixes
  are never limited to a paid tier.
- **Verifiable releases.** Packages are published from CI with provenance, with
  checksums and an SBOM attached to each release. The SBOM lists zero runtime
  components.

Zero runtime dependencies shrinks supply-chain exposure. It does not remove it:
build tooling, CI and accounts remain attack surface, which is why the release gates
above exist.

## This site

You can check these from your browser's developer tools.

- Served over HTTPS only. HTTP and `www` redirect to `https://rathkit.com`, and the
  site sends `Strict-Transport-Security`.
- An enforced `Content-Security-Policy` allows only our own origin for scripts,
  styles, fonts, images and connections. The few inline scripts are allowed by
  hash.
- `X-Content-Type-Options: nosniff`, a `Referrer-Policy`, and a restrictive
  `Permissions-Policy` (no camera, microphone or location).
- No analytics, no third-party requests, no cookies. The only thing stored in your
  browser is your light or dark theme choice.
- Fonts are served from this site, not a font CDN.
- The site is static files built from a repository and deployed from
  CI. Build tooling is pinned and installed with lifecycle scripts disabled.

## What we do not claim

- We do not claim SOC 2 or FedRAMP status. Neither is held today. If that changes,
  the claim will name the report, the systems it covers and the date. SOC 2 is a
  report about an organization's systems, not a certificate on a library, and
  FedRAMP applies to cloud services, not client-side software.
- We do not claim zero risk.

## Reporting a vulnerability

Once the repositories are public, use GitHub's private vulnerability reporting
(the **Report a vulnerability** button under the **Security** tab of the affected
repository in the [rathkit organization](https://github.com/rathkit)). It reaches the
maintainers privately and keeps the report, the discussion and any advisory in one
place.

If a repository does not show that button, email
[github@rathkit.com](mailto:github@rathkit.com) with the subject
`Security: <repository name>`. The same instructions are in the organization's
[security policy](https://github.com/rathkit/.github/blob/main/SECURITY.md), which
applies to every Rathkit repository, including Pack.

Until then there is no software to report against. Please do not post suspected
vulnerabilities in public issues.
