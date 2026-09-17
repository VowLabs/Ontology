# Contribution format v1

This proposed contract covers definitions, typed reference data and delegated
services. The manifest schema is machine-readable. Service delegation, redirect
handling and external snapshot installation are not implemented by the current
API. Existing local endpoints continue working as before.

## Definition, data and delivery

An ontology definition states what something is. A dataset contains instances
identified by stable IDs. A service URL states where callers fetch definitions
or data. Keep routing metadata in the service registry and API responses, outside
the definition files themselves.

| Contribution | Example | Delivery |
| --- | --- | --- |
| Definition | Profession (`B:PRO`) | A node describing the concept |
| Typed data | A list of professions | Rows with `definitionCode: "B:PRO"` |
| Delegated service | Science / Geography (`S:G`) | URL for the node and descendants |
| Delegated typed data | Countries and states | Dataset endpoints served by Geo |

VowLabs may serve professions locally while redirecting Geography requests to
Geo. Delegation does not require copying the remote branch or its datasets into
the VowLabs repository. An offline snapshot may be supported separately; it is
not the live authority and must identify its revision and age.

## Assignment and manifest

The parent assigns a prefix, repository and permitted dataset IDs. The manifest
requests that scope; it cannot authorize itself or take over siblings. Geo's
assignment is `S:G` and descendants, plus datasets `countries` and `states`.

A service contribution publishes this manifest:

```json
{
  "formatVersion": 1,
  "repository": "https://github.com/ekkis/Geo",
  "prefix": "S:G",
  "version": "1.0.0",
  "license": "MIT",
  "readme": "README.md",
  "requires": {
    "ontologyVersion": "7.0.0",
    "codes": ["I:P", "I:O", "S:I:D:T:S"]
  },
  "delivery": {
    "mode": "service",
    "url": "https://geo.example/v1/"
  },
  "datasets": [
    {"id": "countries", "definitionCode": "S:G:CO"},
    {"id": "states", "definitionCode": "S:G:SD"}
  ]
}
```

`geo.example` is an illustrative hostname. Register a real public HTTPS base URL
before activating delegation. URLs must end in `/`, with no credentials, query or
fragment. `version` identifies the contribution release; `requires.ontologyVersion`
is the exact ontology baseline it supports. `requires.codes` lists references
outside the delegated branch. Service contract changes require a manifest version
update; ontology and dataset revisions are versioned independently.

See [manifest.schema.json](manifest.schema.json),
[geo.example.json](geo.example.json) and
[snapshot.example.json](snapshot.example.json). JSON Schema validates manifest
shape; acceptance must additionally verify ownership, unique dataset IDs,
namespace containment, dependency resolution, URL validity and compatibility.

## Discovery and routing

The parent retains the child assignment `S.Children.G = "S:G"`. Its discovery
response for the delegated node includes the following descriptor (shown inside
the API's existing `data` envelope):

```json
{
  "Code": "S:G",
  "Name": "Geography",
  "href": "https://geo.example/v1/definitions/S%3AG",
  "delegation": {
    "prefix": "S:G",
    "repository": "https://github.com/ekkis/Geo",
    "url": "https://geo.example/v1/",
    "version": "1.0.0",
    "datasets": ["countries", "states"]
  }
}
```

`GET /v1/definitions/S/children` returns this descriptor alongside local children.
The descriptor is a reference, not a complete Geography definition: an omitted
`Children` property does not mean Geography has no children. Fetch `href` for the
complete node, then its `/children` endpoint for immediate children. Remote node
responses use canonical `Code` and `Children` codes and absolute `href` links.
All descendants retain `S:G` codes even though they are fetched from Geo.

Direct requests to VowLabs for a delegated node or endpoint return **HTTP 307**
with a `Location` pointing to the corresponding Geo endpoint. GET and HEAD are
supported. Preserve the supported `q`, `limit` and `offset` query parameters.
Encode each code or dataset ID as one URL path segment. Match prefixes on segment
boundaries: `S:G` and `S:G:...` belong to Geo, but `S:GG` does not.

| Request to VowLabs | Location at the registered Geo service |
| --- | --- |
| `/v1/definitions/S%3AG` | `definitions/S%3AG` |
| `/v1/definitions/S%3AG/children` | `definitions/S%3AG/children` |
| `/v1/definitions/S%3AG%3AAD/children` | `definitions/S%3AG%3AAD/children` |
| `/v1/definitions/S%3AG%3AAD%3AUS%3ACO/choices` | `definitions/S%3AG%3AAD%3AUS%3ACO/choices` |
| `/v1/datasets/countries/records` | `datasets/countries/records` |
| `/v1/datasets/states/records/US-CA` | `datasets/states/records/US-CA` |

Locations in the table are relative to the registered `delivery.url`. Dataset
metadata endpoints redirect too. Existing `/v1/countries` and `/v1/states` aliases
redirect to the corresponding remote dataset record endpoints, preserving any
record ID and supported query parameters.

Dataset discovery remains local: `/v1/datasets` describes each dataset with its
`id`, `definitionCode` and `href`; delegated entries include the same service
routing descriptor. A delegated dataset must not require local rows merely to
appear in discovery.

A single-parent listing (`/v1/definitions?parent=S:G`) redirects to Geo's matching
children endpoint. Mixed `codes` queries return local definitions or delegation
references per requested code; one HTTP response cannot redirect to several
services. Global catalogue/search responses include the boundary descriptors and
must identify that remote descendants were not searched. They must not claim to
be a complete expanded catalogue. A client seeking remote matches queries the
advertised services explicitly; cross-service result aggregation is separate
from this basic delegation contract.

## Remote service responses

Use the existing API envelopes: `{ "data": ..., "meta": ... }`. Node reads return
one object; children and records return arrays. `meta` identifies authority,
ontology version and revision. Listings also include `total`, `offset`, `limit`
and `nextOffset`; defaults are 50 rows, maximum 200. `q` filters by names/codes.
`children` means immediate children, not every descendant. Unknown nodes return
404; an unavailable service is an error, not an empty branch.

Geo must implement definition lookup, children, choices, scoped definition search,
dataset descriptions and dataset record lookup/listing. Node objects and dataset
rows retain their canonical identifiers and `reference` URNs. Dataset rows
include `definitionCode`; dataset metadata includes its independent integer
`version`. The baseline ontology version governs type interpretation. Remote
services cannot silently redefine a code within the same ontology version.

Support ETag/If-None-Match, public CORS for GET/HEAD, and explicit response
versions. VowLabs exposes `Location` to clients that inspect redirects. Clients
must bound redirect depth and detect cycles, including nested service delegation;
Geo can delegate only inside its own assigned scope. Do not forward wallet
credentials or authorization headers when following public service URLs.

Historical revisions used to interpret stored records and attestations must
remain resolvable through retained snapshots/archives. Live discovery may change,
but resolving an existing typed fact must not silently substitute new semantics.

## Definition format

Definitions use the existing PascalCase JSON format. Child keys derive codes;
filesystem names and URLs do not. A branch export root mounted at `S:G` can use:

```json
{
  "Name": "Geography",
  "Description": "Places and spatial context.",
  "Children": {
    "CO": {"$ref": "./Country/index.json"},
    "SD": {"$ref": "./Subdivision/index.json"}
  }
}
```

This abbreviated example omits the existing Address branch for brevity; the actual
handoff must preserve it. A field has `Name`, `Question` and a primitive `Type`,
such as `S:I:D:T:S`. Dataset choices use `Choices: {"Dataset":"countries"}`.
Fields belong to answer objects with `Scalar` and `Subjects`, as in the existing
[US address definition](../../Science/Geography/Address/US/index.json).

Do not put instance rows, routing URLs, user-list membership or application storage
keys inside definitions. Each directory with `index.json` requires a README
explaining meaning, code, scope, applicability, examples, boundaries and children.
Describe fields, types and constraints in their containing README, and state when
no finer subclasses exist.

## Typed dataset format

Local and delegated data use the same format. For example, a local professions
response includes a dataset descriptor with `definitionCode: "B:PRO"`, and every
returned profession row also declares that definition code. Geo states use:

```json
{
  "id": "states",
  "name": "US states",
  "definitionCode": "S:G:SD",
  "version": 1,
  "records": [
    {
      "id": "US-CA",
      "name": "California",
      "abbreviation": "CA",
      "country": "G:CO:US"
    }
  ]
}
```

This is an abbreviated dataset file, not the live listing envelope. The listing
API adds `definitionCode: "S:G:SD"` and the data reference URN to each row.
Country IDs such as `G:CO:US` remain stable dataset IDs: do not change them to
`S:G:CO:US`. Definition tags and dataset references remain separate.

Require unique nonempty record IDs and names, positive integer dataset versions,
valid definition codes, documented record fields and valid relationships (a
state's country must exist). Preserve existing IDs and metadata. Changes to
contents increment the dataset version. Document scope, provenance, license and
exclusions independently of the ontology definitions.

## Optional snapshot delivery

A contributor that supplies files rather than a live service uses
`delivery: {"mode":"snapshot","entry":"definitions/index.json"}` and gives each
dataset a `path`. The manifest directory contains `README.md`, the `definitions/`
tree and separate `data/<id>/index.json` files with dataset READMEs. Definitions
are mounted at the assigned prefix; no extra ancestor wrapper is needed.

Paths are relative to the manifest. Reject absolute paths, URL references,
`.`/`..` segments, symlink escapes, cycles, repeated and unreachable definitions.
Child `$ref` paths begin `./` and stay inside the definitions tree. Import only
JSON and Markdown; do not run upstream scripts. Pin accepted files to an exact
upstream commit with SHA-256 hashes in a separate lock record. The importer owns
local `Source` annotations; upstream exports semantic values and provenance.

This mode is useful for locally published typed data. It is not required to route
Geography requests to Geo.

## Compatibility and acceptance

Validate the contribution against its assigned scope and exact baseline. Check
external primitive/subject references, choices, dataset relationships, collection
references and README coverage. Service delivery additionally needs contract tests
for lookup, traversal, pagination, redirects, CORS and unavailable-service behavior.
Snapshot delivery needs containment and checksum checks before atomic installation.

Never reuse released codes or IDs with a new meaning. Coordinate definition
changes with the assembled ontology version and migrations; archive old
definitions and preserve signed bytes. The initial Geo service must resolve the
existing `S:G` branch and datasets compatibly before VowLabs activates routing.

Existing checks for the currently composed repository, from the Vow workspace:

```sh
pnpm -C VowLabs/Ontology validate
pnpm -C VowLabs/Ontology test
node VowLabs/Ontology/_support/tools/build.mjs
node --test NokNok/shared/*.test.cjs NokNok/Relay/test/*.test.mjs
```

These validate the current local composition; they do not yet install contributions
or test a remote delegation. Publishing this document does not activate routing.
