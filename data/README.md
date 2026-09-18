# Reference datasets

This directory contains data offered by the same read-only service as the ontology.
It is outside the definition tree. Entries have dataset-local IDs and independently
versioned datasets; they are never canonical ontology tags or child definitions.

- [Services](services/README.md): named providers and their presentation rules.
- [Professions](professions/README.md): named occupations and trades.
- Countries: Geo-owned country/territory records, proxied through Ontology.

Use `/v1/datasets` for discovery, `/v1/datasets/{id}` for metadata, and
`/v1/datasets/{id}/records` for searchable, paginated records. `/v1/services`,
`/v1/professions`, and `/v1/countries` are convenient aliases. Lookup appends a
URL-encoded record ID. Data references use `urn:vl:data:{dataset}:{version}:{id}`.
The compiled snapshot keeps datasets in `datasets`, separate from `nodes`.

- States: Geo-owned worldwide political subdivisions, preserving the previous US state IDs. Use `/v1/states` or the dataset routes. There are no local country/state data files.
