# External definition sources

[index.json](index.json) is the provider manifest. It is supporting metadata,
not an ontology node. Definitions remain local and usable offline. Each provider
has a repository, an immutable revision, a license, a local snapshot directory
and SHA-256 checksums for the files used by definitions.

## geo

The `geo` provider is [ekkis/geo](https://github.com/ekkis/geo), pinned to
`f7e2f4aa4f8333c7d09682f0b323673225e02011`. Its 250 `data/country/XX.json` files
supply the country/territory identities. The imported license is retained at
[geo/LICENSE](geo/LICENSE).

A country definition declares `Source.Provider`, `Source.Path` and `Source.Fields`.
Fields maps local metadata names to JSON pointers in the source document:
Name → `/data/name/common`, OfficialName → `/data/name/official`, and ISO3 →
`/data/iso3`. ISO2 comes from the source filename. `Source.Pointer` records the
parent data object for provenance. The loader verifies each source file’s hash
and every declared field projection against the materialized local definition.
A mismatch is an error, not permission to silently substitute remote content.

This structure supports further providers and JSON-pointer projections without
executing their libraries. Each provider needs a reviewed import adapter and a
pinned local snapshot. Structural ontology links remain local `$ref` references;
this release does not implement live network `$ref` resolution or delegate
meaning to a moving remote branch.

## Reproduce or refresh

From the Vow workspace, obtain the recorded source revision without installing
or executing its package:

```sh
git clone https://github.com/ekkis/geo.git /tmp/vow-geo-import
git -C /tmp/vow-geo-import checkout --detach f7e2f4aa4f8333c7d09682f0b323673225e02011
node VowLabs/Ontology/_support/tools/import-geo.mjs --checkout /tmp/vow-geo-import --check
```

To rematerialize the pinned definitions and READMEs from that clean checkout:

```sh
node VowLabs/Ontology/_support/tools/import-geo.mjs --checkout /tmp/vow-geo-import
npm --prefix VowLabs/Ontology run validate
npm --prefix VowLabs/Ontology test
```

For a reviewed upstream update, check out its full commit SHA and supply that
same SHA through `--revision`. The importer rejects dirty source files, validates
all identities before writing, and refuses removal of previously published
country codes. Review the diff, update the ontology version and migration policy
as required, and keep the source and country README counts current. It does not
publish, commit, deploy or restart applications. Historical migration maps and
signed statements must not be regenerated to adopt new meanings.
