# Contributing definitions, data and services

Contributors can own definitions, typed reference data, or a delegated service.
The parent grants scope in the boundary definition’s public `Delegation` object
(for example, [Geography](Science/Geography/index.json));
a contributor manifest cannot grant itself additional codes or dataset IDs.
See [governance](docs/GOVERNANCE.md) and the
[service contract](docs/contributions/README.md).

## Geography

Geo (`ekkis/Geo`) owns `S:G` and descendants, including Address, Country and
Subdivision, and the datasets `countries` and `states`. Its source checkout is
`~/dev/Geo`; the export lives under `ontology/vowlabs/Science/Geography/`.
Ontology keeps only the boundary and assignment, not copies of the active
Geography definitions, datasets or their raw source files.

Runtime delegation is implemented as a server-side proxy. Clients keep using
Ontology URLs. Geo must serve the compatible versioned `{data, meta}` envelope,
canonical `Code` and child codes, and the same field constraints. Unknown remote
resources return 404; an unavailable or incompatible service returns an error.

Local development uses `http://127.0.0.1:24109/v1/`. Production uses the registered
`https://geo-ekkis.vercel.app/v1/`. `GEO_ONTOLOGY_URL` overrides the upstream.
Geo's updated API must be deployed before activating the matching Ontology
release in production. Runtime delegation needs no copies or database migration.

The explicit offline bundle build fetches a validated Geo snapshot. That generated
client artifact is not authoritative source and is never committed to Ontology.
Historical signed definitions remain archived in `_support/legacy.json`.
