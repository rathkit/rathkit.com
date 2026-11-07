---
title: Security
description: What Rathkit commits to for its software and this site, what we do not claim, and how to report a vulnerability.
---

The RTE beta and the Pack alpha are on npm. This page separates what is true
of this site and of the published packages from what we hold ourselves to for
everything we ship, and we only list claims you can check. [Verify a release](/docs/verify/)
shows how.

## The libraries: commitments

These are release gates for every Rathkit package. The RTE beta and the Pack alpha are held to them.

- **No runtime dependencies.** A package's `dependencies` is empty
  (`npm view @rathkit/rte-core dependencies` and `npm view @rathkit/pack dependencies`
  print nothing). RTE packages name the Rathkit packages and the host framework they work
  with as peer dependencies, never as dependencies. Pack's launcher lists the program
  packages for each platform as optional dependencies, so a package manager installs only
  the one that fits.
- **No install scripts.** Installing a package runs none of our code.
- **Nothing stored or sent by default.** The editor does not use `localStorage`,
  cookies or IndexedDB, and makes no network requests. A feature that needs the
  network is a plugin you add, pointed at your own endpoints.
- **Builds need no network.** A Pack build works with no network at all, and the repository
  checks this on every change. Its development server listens on your machine.
- **Content stays with you.** Editor content is never sent to Rathkit.
- **Telemetry is a separate package.** If it exists, you install it on purpose, it is
  off until you configure it, and no other package imports it.
- **Safety fixes ship to everyone.** Correctness, accessibility and security fixes
  are never limited to a paid tier.
- **Verifiable releases.** Packages are published from CI with provenance, with
  checksums, a signature and an SBOM attached to each release. The SBOM lists zero
  runtime components. For RTE this holds from `0.1.0-alpha.3` through the beta, `0.2.0-beta.0`: `0.1.0-alpha.0` was published by
  hand and has no provenance, and `0.1.0-alpha.1` and `0.1.0-alpha.2` were never published to
  npm. For Pack it holds from `0.1.0-alpha.1`: `0.1.0-alpha.0` was published by hand and has
  no provenance.

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

Use GitHub's private vulnerability reporting
(the **Report a vulnerability** button under the **Security** tab of the affected
repository in the [rathkit organization](https://github.com/rathkit)). It reaches the
maintainers privately and keeps the report, the discussion and any advisory in one
place.

If a repository does not show that button, email
[github@rathkit.com](mailto:github@rathkit.com) with the subject
`Security: <repository name>`. The same instructions are in the organization's
[security policy](https://github.com/rathkit/.github/blob/main/SECURITY.md), which
applies to every Rathkit repository, including Pack.

Please do not post suspected vulnerabilities in public issues.
