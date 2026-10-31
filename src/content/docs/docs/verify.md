---
title: Verify a release
description: How to check that the RTE packages you install are the ones Rathkit released, with what they claim and nothing else.
---

Every claim on the [Security](/docs/security/) page about the packages can be checked
with commands you run yourself. Nothing here needs an account or a token.

## No dependencies, no install scripts

```sh
npm view @rathkit/rte-core@next dependencies
npm view @rathkit/rte-core@next scripts
```

The first prints nothing: the package has no `dependencies`. The second lists `test`,
`build` and `typecheck`, which are for people who work on the repository. None of
`preinstall`, `install`, `postinstall` or `prepare` is there, so installing a package runs
none of our code. In an empty project, `npm install --ignore-scripts @rathkit/rte-core@next`
adds only `@rathkit` packages, and `npm ls --all` shows nothing else.

## Provenance

```sh
npm audit signatures
```

Run it in a project that has installed the packages. It checks the registry signature of
every package and, for packages published from CI, the provenance statement that says which
repository, workflow and commit built them. The npm page of each package from
`0.1.0-alpha.3` also shows a provenance badge. `0.1.0-alpha.0` has none: it was published by
hand.

## The files on the release

Each [GitHub release](https://github.com/rathkit/rte/releases) carries the tarballs, a
`SHA256SUMS` file, a software bill of materials for each package, and a Sigstore signature
for `SHA256SUMS` made by the release workflow, with no key to manage.

```sh
tag=v0.1.0-alpha.3
gh release download "$tag" -R rathkit/rte
sha256sum --check --ignore-missing SHA256SUMS

cosign verify-blob SHA256SUMS \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp "^https://github.com/rathkit/rte/\.github/workflows/release\.yml@refs/tags/${tag}$" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

`sha256sum` should report every tarball as `OK`, and `cosign` should print `Verified OK`.
The identity says the signature came from the `release.yml` workflow of `rathkit/rte` on
that tag, and from nothing else.

## What npm serves is what was released

```sh
npm view @rathkit/rte-core@0.1.0-alpha.3 dist.shasum
sha1sum rathkit-rte-core-0.1.0-alpha.3.tgz
```

The two values match. npm publishes the SHA-1 of the tarball; the release's `SHA256SUMS`,
which is signed, covers the same file.

## Software bill of materials

`rathkit-rte-core-0.1.0-alpha.3.cdx.json` and its siblings are CycloneDX files. Each lists
the package and zero runtime components.

## Which versions

Use `0.1.0-alpha.3` or later. `0.1.0-alpha.0` was published by hand and has no provenance.
`0.1.0-alpha.1` and `0.1.0-alpha.2` exist only as GitHub pre-releases and were never on npm.
