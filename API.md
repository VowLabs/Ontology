# VL Ontology API

VL Ontology owns canonical definitions, codes, collections, service records, and
service icons. Consuming applications own user values, account identifiers,
encrypted records, public profiles, and attestations. This API has no user
database, user authentication, user lookup, or write endpoints.

## Run

Node.js 22 or later is required. No dependency installation is needed.
From the Vow workspace:

```sh
npm --prefix VowLabs/Ontology start
```

Or from a standalone clone: `npm start`. Development binds to `0.0.0.0:24108`;
`NODE_ENV=production` binds to `127.0.0.1:24108`. Explicit development example:

```sh
HOST=0.0.0.0 PORT=24108 npm --prefix VowLabs/Ontology start
```

Use your deployment's HTTPS reverse proxy for public access. Configure apps with
that public origin. All paths below are relative to the origin; icon paths are
relative to the ontology origin, not the consuming application's origin.

The server validates local definitions and delegation assignments on startup.
Foreign requests fetch the assigned service at request time. After changing local
ontology sources, assignments or icons, stop the process and rerun the same start command.
`GET /health` reports availability and the loaded version/revision. The service
handles SIGTERM/SIGINT. It runs independently of any consuming application.

## Endpoints

All resources support GET and HEAD. OPTIONS supports browser preflight; public
CORS permits any origin without credentials. `/openapi.json` serves the OpenAPI
3.1 specification. `/v1` lists entry points.

| Path | Result |
| --- | --- |
| `/v1/ontology` | Root definition and top-level codes |
| `/v1/definitions` | Searchable, paginated definitions |
| `/v1/definitions/{code}` | Complete definition, including types, validation rules, references and children |
| `/v1/definitions/{code}/children` | Immediate child definitions |
| `/v1/definitions/{code}/choices` | Allowed choices for a field |
| `/v1/definitions/{code}/records` | Compatibility alias for service data (`S:T:SV` only) |
| `/v1/definitions/{code}/records/{id}` | One service data record (`S:T:SV` only) |
| `/v1/services` | Service records; alias for `/v1/datasets/services/records` |
| `/v1/services/{id}` | One service, e.g. `telegram` |
| `/v1/services/{id}/icon.svg` | Service SVG icon |
| `/v1/collections` | Named collections of fields |
| `/v1/collections/{id}` | Collection plus resolved field definitions |
| `/v1/catalogue` | Complete catalogue for offline use |
| `/v1/migrations` | Historical code migration maps |

Codes are case-sensitive colon-delimited identifiers, e.g. `I:P:LN`. URL-encoding
colons is supported. Original definition property names (`Code`, `Name`, `Type`,
`Reference`, `Children`, etc.) are preserved. `Reference` is a schema link to
another definition; lowercase `reference` is the API's canonical resource URN.
Definitions other than delegated type references include boolean `Collection` (repeatable/vector) and `Composite`
(constituent datapoints entered together). Email is repeatable but non-composite;
a US address is both. Children alone do not imply either flag. `/v1/collections`
continues to describe explicit disclosure-request field sets, not cardinality.
`I:C:AD` is a typed reference to Geo (`Type: S:G:AD`): follow the referenced
definition for its structure. It deliberately omits both flags; applications
decide how many address records they retain.

Lists support `q` (case-insensitive text search), `limit` (1–200, default 50), and
`offset` (default 0). Definitions additionally support `parent=I:C` for immediate
children and `codes=I:P:LN,I:C:EM` for up to 100 explicit lookups. An empty
`parent` selects root children. Batch lookup fails with 404 if any code is unknown.
When combining filters, explicit codes are filtered by parent and then query.

```sh
curl 'http://127.0.0.1:24108/v1/services?q=telegram'
curl 'http://127.0.0.1:24108/v1/definitions/I:P:LN'
curl 'http://127.0.0.1:24108/v1/definitions?parent=I:C&limit=20'
curl 'http://127.0.0.1:24108/v1/collections/checkout'
```

## Responses and canonical references

Successful JSON responses use `{ "data": ..., "meta": ... }`. Metadata includes
`authority: "VL Ontology"`, `ontologyVersion`, and a SHA-256 `revision` of the
loaded API catalogue. Lists also contain `total`, `limit`, `offset`, and
`nextOffset` (null at the end). SVG responses contain the image bytes.

Definitions carry a canonical reference such as
`urn:vl:ontology:2.0.0:I:P:LN`; registry records carry a reference such as
`urn:vl:data:services:2:telegram`. These are stable identifiers, not
HTTP URLs. Use the configured API origin to resolve them via the endpoint table.
Keep `{ ontologyVersion, code, recordId? }` alongside references in application
storage. User-specific values remain in the consuming application.
Colon-delimited codes resolve to definitions; dataset IDs resolve to reference data
across applications. Applications own any migrations of their stored data.

`v1` versions the HTTP contract. `ontologyVersion` versions the schema;
a dataset metadata `version` versions its records. `revision` detects source content changes
within a version. This server serves only its current snapshot, not historical
snapshots. For exact reproducibility, retain the downloaded catalogue with its
revision; migration maps do not provide historic definition lookup.

Responses include ETags and require revalidation. Send `If-None-Match` to get
304 when unchanged; cache identity includes the full request URL. Changes to
icon bytes change their own ETag. A catalogue contains all definitions, including
schemas marked `Public: false`: that flag governs user values, not whether the
canonical schema is public.

Errors use `{ "error": { "code": ".ontology.not-found", "message": "..." },
"meta": ... }`. Statuses include 400 (invalid parameters), 404 (unknown resource
or unavailable choices/records), 405 (write method), and 500 (internal failure).
Requests never execute filesystem paths supplied by clients.

## Application example

```js
const origin = 'http://127.0.0.1:24108'; // Use the deployed HTTPS origin in production.
const response = await fetch(`${origin}/v1/services?limit=100`);
if (!response.ok) throw new Error(`Ontology unavailable: ${response.status}`);
const { data: services, meta } = await response.json();
const telegram = services.find(service => service.id === 'telegram');
const iconUrl = new URL(telegram.iconUrl, origin).href;
// Store this canonical reference alongside application-owned user data:
const serviceReference = telegram.reference;
// Continue at meta.nextOffset if it is not null.
```

## Application integration

Configure each application with the ontology server's reachable origin. Browser
clients should use the deployed HTTPS origin; server-side clients may use an
internal origin. Use the canonical API endpoints directly, or provide an
application-owned adapter when an existing client contract requires one.

Applications control their caching, retry, and outage behavior. Retaining a
validated catalogue snapshot can support offline operation. Keep user-data reads
and writes independent of ontology availability wherever possible; this server
has no role in storing or synchronizing those records.

## Verification

```sh
npm --prefix VowLabs/Ontology test
npm --prefix VowLabs/Ontology run validate
```

## Tree-backed choices

A definition’s `Choices` can be a literal array of primitive values or a string
referencing an ontology branch. For example, `S:G:AD:US:R` declares
`"Choices": "S:G:AD:RO"`. Clients traverse that node’s `Children` recursively;
only terminal descendants are valid answers. Store the canonical leaf code,
not its label, the referenced branch or an intermediate grouping node.
`S:G:AD:US:CO` instead selects IDs from the countries dataset.

`GET /v1/definitions/S:G:AD:US:R/choices` returns those leaf codes using the
existing paginated response shape. Retrieve their definitions for display names.
Literal arrays retain their existing behavior. Reference trees are resolved
against the API’s loaded version, not against a moving remote source.

Sourced country data records include `Source` provenance. `/v1/catalogue` also
includes provider manifests in `sources` and archived historical definitions in
`legacy`; these do not become current ontology nodes or permitted choices.

## Definitions and datasets (ontology 5)

`/v1/definitions` contains concepts only. Definitions never embed `Records`.
`GET /v1/datasets` discovers independently versioned reference data:

| Dataset | Concept | Short list endpoint |
| --- | --- | --- |
| `services` | `S:T:SV` | `/v1/services` |
| `professions` | `B:PRO` | `/v1/professions` |
| `countries` | `S:G:CO` | `/v1/countries` |

`/v1/datasets/{dataset}` returns `id`, `version`, `definitionCode`, `count` and
`href`. `/v1/datasets/{dataset}/records` supports the existing `q`, `limit` and
`offset` parameters. Append a URL-encoded record ID for a single record. The
short endpoints support the same list parameters and ID lookup. All retain
GET/HEAD, ETag, CORS and the usual response envelope.

Data references use `urn:vl:data:{dataset}:{version}:{encoded-id}`; definitions
use `urn:vl:ontology:{ontology-version}:{code}`. `/v1/catalogue` contains the local
snapshot and delegation boundaries, with separate `nodes` and `datasets` members.
Use `/v1/catalogue?expand=delegations` to fetch a complete offline snapshot. Dataset versions govern
records; `meta.ontologyVersion` governs definitions. `/v1/services/{id}/icon.svg`
continues to work. `/v1/definitions/S:T:SV/records` is a compatibility alias for
service data and returns data references; it does not embed records in a definition.

`Choices: {"Dataset":"countries"}` constrains a field to country dataset IDs.
Country IDs retain `G:CO:XX` for existing answers, but those IDs no longer resolve
through `/v1/definitions` and are not canonical tags. Professions have IDs such
as `LAW`, with `legacyCode` identifying their retired ontology code.
NokNok settings and contact-list schemas are absent from the API; their consumer
owns them. Migration metadata and archived historical schemas preserve older data.

## Political subdivision reference data

`GET /v1/states?q=California` returns the `US-CA` record;
`GET /v1/states/US-CA` retrieves it directly. The standard dataset routes also
work: `/v1/datasets/states` and `/v1/datasets/states/records`. This dataset contains
Geo’s worldwide political subdivisions, including the original 50 US states,
and instantiates `S:G:SD` (Subdivision). State names are reference
data, absent from `/v1/definitions`.

## Foreign services

Geography requests (`S:G` and descendants), country/state metadata and records
are proxied to Geo. Existing Ontology URLs remain valid; clients are not redirected.
Mixed definition batches and collections resolve foreign entries. The default
catalogue is local (`meta.complete: false`); `?expand=delegations` fetches the full
snapshot. Global search reports `scope: local-and-delegation-boundaries`.
Foreign errors retain meaningful HTTP status codes. See the
[proxy contract](docs/contributions/README.md).

Record definitions may declare `RequiredFields`, a list of child keys that must
be present together when a record is saved. Endorsement (`R:EN`) requires both
`T` (free text) and `R` (integer rating, 1–3).
