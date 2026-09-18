# Contribution format v1 and proxy delivery

Definitions describe concepts; datasets describe instances with stable IDs.
A delegation assigns responsibility for a canonical prefix and explicit dataset
IDs to a foreign service. Registry entries belong to the parent, outside the
definition tree. Upstream manifests describe supported scope; they cannot grant
scope. Geo owns `S:G` and descendants, `countries`, and `states`.

## Request contract

Clients use the Ontology service. Ontology queries the assigned foreign service
and relays its `{data, meta}` response. No HTTP redirect is returned. The
assignment boundary contains only a name and description, with no local children.
An omitted `Children` property on that boundary means delegated, not empty.

| Ontology request | Foreign request relative to its registered `/v1/` base |
| --- | --- |
| `/v1/definitions/S:G` | `definitions/S%3AG` |
| `/v1/definitions/S:G/children` | `definitions/S%3AG/children` |
| `/v1/definitions/S:G:AD:US:CO/choices` | `definitions/S%3AG%3AAD%3AUS%3ACO/choices` |
| `/v1/definitions?parent=S:G` | `definitions/S%3AG/children` |
| `/v1/datasets/countries/records` | `datasets/countries/records` |
| `/v1/states/US-CA` | `datasets/states/records/US-CA` |

Dataset metadata and single-record lookups are also proxied. Supported search
and pagination parameters are forwarded. GET and HEAD work through Ontology;
HEAD fetches the representation to provide matching Content-Length and ETag.
Foreign calls carry no client cookies, credentials or authorization headers.
Redirects are rejected, upstream calls time out after five seconds, and payloads
are limited to 8 MiB. Errors are explicit: missing resource 404, invalid request
400, unavailable/incompatible service 502, upstream unavailable 503, timeout 504.

Prefixes match code segments: `S:G` and `S:G:...` belong to Geo; `S:GG` does not.
Mixed `codes` queries and collections resolve each delegated definition through
its authority. Parent listings contain delegation boundary descriptors. Global
search covers local nodes and boundary descriptors only and states this scope.
`/v1/datasets` discovers delegated datasets from authoritative catalogues.
The parent declares no dataset names or descriptors. Each discovered dataset
must reference a definition within its authority’s assigned prefix, and must
not overwrite a local or another authority’s dataset. Discovery requires the
upstream service; an outage is reported rather than hiding its datasets.

## Foreign responses

Responses use `{data, meta}`, with `meta.ontologyVersion` matching the registered
baseline, `meta.authority`, and `meta.revision`. Definition objects contain
canonical `Code`, canonical child codes, `/v1/` links, and explicit boolean
`Collection` and `Composite` flags. Collection means repeatable/vector, while
Composite means constituent datapoints form one value. A US address is both;
its components and organizing branches are neither. Foreign authorities own
these flags at the source; the proxy rejects missing or invalid booleans. Records contain stable
IDs, `definitionCode`, and `urn:vl:data:{dataset}:{version}:{id}` references.
Lists include `total`, `offset`, `limit`, and `nextOffset`; defaults are 50 rows
and the maximum page size is 200. `q` searches names and codes. Support public
CORS, GET/HEAD/OPTIONS, ETag/If-None-Match and X-Ontology-Version. Ontology serves
links and cache validators on its own origin. Errors use the same envelope.

Geo preserves address roles, address field constraints, country IDs such as
`G:CO:US`, and subdivision IDs such as `US-CA`. Do not rename data IDs when a
canonical definition moves. Country and subdivision dataset versions are
independent of the ontology version. The expanded worldwide `states` dataset
uses version 2 and retains the previous US state IDs.

## Offline clients

The default `/v1/catalogue` describes the local tree and delegation boundaries;
`meta.complete` is false. `/v1/catalogue?expand=delegations` explicitly queries
foreign `/v1/catalogue` endpoints and returns an assembled snapshot. Likewise,
`NokNok/scripts/build-ontology.mjs` fetches Geo when generating the shared NokNok offline
bundle. A failure aborts generation; it never substitutes an empty branch.
Snapshots record upstream revision and fetch time. The importer rejects foreign
codes outside their assigned prefix, missing children, conflicting dataset
assignments, invalid records and incompatible versions. This generated offline
artifact is not committed as Ontology source or served as live authority.

## Ownership and compatibility

The `Delegation` object in each canonical boundary definition reserves its
path-derived prefix. Its `url` is directly discoverable by
clients fetching the definition; no separate private registry is required.
`GEO_ONTOLOGY_URL` overrides Geo's URL. Development defaults to the local Geo
service on port 24109; production uses the public HTTPS registry URL. Production
rejects HTTP overrides. Deploy a compatible foreign service before its parent.

The JSON manifest schema and examples remain contribution-discovery documents.
Arbitrary external file installation is not implemented. Definitions retain the
PascalCase format, independent README coverage, and parent-assigned child keys.
Never repurpose published codes or signed bytes. Historical definitions remain
available from legacy archives; semantic changes require versioned migrations.
