---
title: Verify a release
description: How to check that the RTE and Pack packages you install are the ones Rathkit released, with what they claim and nothing else.
---

Every claim on the [Security](/docs/security/) page about the packages can be checked
with commands you run yourself. Nothing here needs an account or a token. The steps below
are for RTE; [Pack](#pack) has its own section at the end.

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

## Pack

Pack is eight packages: `@rathkit/pack` and one program package for each platform. The same
checks apply, with these commands.

### No dependencies, no install scripts

```sh
npm view @rathkit/pack@next dependencies
npm view @rathkit/pack@next scripts
npm view @rathkit/pack@next optionalDependencies
```

The first two print nothing. The third lists the seven platform packages, and your package
manager installs only the one that fits your machine. The same two checks on a platform
package, such as `@rathkit/pack-linux-x64-gnu@next`, also print nothing.

### Provenance

```sh
npm audit signatures
```

Run it in a project that has installed `@rathkit/pack`. Every package published from CI has
a provenance statement that says which repository, workflow and commit built it.

### The files on the release

Each [GitHub release](https://github.com/rathkit/pack/releases) carries one tarball per
platform, a `SHA256SUMS` file, a software bill of materials and a Sigstore signature for each
file, made by the release workflow.

```sh
tag=v0.1.0-alpha.1
gh release download "$tag" -R rathkit/pack
sha256sum --check --ignore-missing SHA256SUMS

cosign verify-blob SHA256SUMS \
  --bundle SHA256SUMS.sigstore.json \
  --certificate-identity-regexp "^https://github.com/rathkit/pack/\.github/workflows/release\.yml@refs/tags/${tag}$" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

`sha256sum` should report every tarball as `OK`, and `cosign` should print `Verified OK`.

### What npm serves is what was released

The program inside the npm package is the binary on the release. On Linux with x64 and
glibc:

```sh
tar -xzOf rathkit-pack-0.1.0-alpha.1-linux-x64-gnu.tar.gz --wildcards '*/rkp' | sha256sum
sha256sum node_modules/@rathkit/pack-linux-x64-gnu/bin/rkp
```

The two values match, and the release's signed `SHA256SUMS` covers the tarball.

### Software bill of materials

```sh
node -e "console.log(require('./rathkit-pack-0.1.0-alpha.1.sbom.cdx.json').components.length)"
```

This prints `0`: the SBOM lists no components.

### crates.io

The crate `rathkit-pack` has no dependencies either, and the source in it is the source of the
tag:

```sh
curl -s https://crates.io/api/v1/crates/rathkit-pack/0.1.0-alpha.1/dependencies
curl -sL https://crates.io/api/v1/crates/rathkit-pack/0.1.0-alpha.1/download -o rathkit-pack.crate
tar -xzf rathkit-pack.crate
git clone --branch v0.1.0-alpha.1 https://github.com/rathkit/pack
diff -r pack/src rathkit-pack-0.1.0-alpha.1/src
```

The first command prints `{"dependencies":[]}` and `diff` prints nothing. For a version
published by the release workflow, crates.io also records which workflow run and commit
published it, in the `trustpub_data` field of
`https://crates.io/api/v1/crates/rathkit-pack/0.1.0-alpha.1`.

### Which versions

Use `0.1.0-alpha.1` or later. `0.1.0-alpha.0` was published by hand and has no provenance,
on npm and on crates.io. The [repository's guide](https://github.com/rathkit/pack/blob/main/docs/verifying.md)
covers the same checks in more detail.
