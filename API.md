# VL Ontology API

VL Ontology owns canonical definitions, codes, collections, service records, and
service icons. NokNok owns user values, online-account identifiers, encrypted
Lexicon snapshots, public profiles, and attestations. This API has no database,
wallet authentication, user lookup, or write endpoints.

## Run

Node.js 22 or later is required. No dependency installation is needed.
From the Vow workspace:

```sh
npm --prefix VowLabs/Ontology start
```

Or from a standalone clone: `npm start`. The default address is
`http://127.0.0.1:24106`. To listen on a container or server interface:

```sh
HOST=0.0.0.0 PORT=24106 npm --prefix VowLabs/Ontology start
```

Use your deployment's HTTPS reverse proxy for public access. Configure apps with
that public origin. All paths below are relative to the origin; icon paths are
relative to the ontology origin, not the consuming application's origin.

The server validates and loads one consistent snapshot on startup. After changing
ontology sources or icons, stop the process and rerun the same start command.
`GET /health` reports availability and the loaded version/revision. The service
handles SIGTERM/SIGINT. No NokNok checkout is required to run it.

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
| `/v1/definitions/{code}/records` | Canonical records for any registry node |
| `/v1/definitions/{code}/records/{id}` | One canonical registry record |
| `/v1/services` | Service records; alias for `/v1/definitions/S:T:SV/records` |
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

Lists support `q` (case-insensitive text search), `limit` (1–200, default 50), and
`offset` (default 0). Definitions additionally support `parent=I:C` for immediate
children and `codes=I:P:LN,I:C:P:EM` for up to 100 explicit lookups. An empty
`parent` selects root children. Batch lookup fails with 404 if any code is unknown.
When combining filters, explicit codes are filtered by parent and then query.

```sh
curl 'http://127.0.0.1:24106/v1/services?q=telegram'
curl 'http://127.0.0.1:24106/v1/definitions/I:P:LN'
curl 'http://127.0.0.1:24106/v1/definitions?parent=I:C&limit=20'
curl 'http://127.0.0.1:24106/v1/collections/checkout'
```

## Responses and canonical references

Successful JSON responses use `{ "data": ..., "meta": ... }`. Metadata includes
`authority: "VL Ontology"`, `ontologyVersion`, and a SHA-256 `revision` of the
loaded API catalogue. Lists also contain `total`, `limit`, `offset`, and
`nextOffset` (null at the end). SVG responses contain the image bytes.

Definitions carry a canonical reference such as
`urn:vl:ontology:2.0.0:I:P:LN`; registry records carry a reference such as
`urn:vl:ontology:2.0.0:S:T:SV:record:telegram`. These are stable identifiers, not
HTTP URLs. Use the configured API origin to resolve them via the endpoint table.
Keep `{ ontologyVersion, code, recordId? }` alongside references in application
storage. User-specific values remain in NokNok. Existing NokNok colon-delimited
codes and service IDs continue to refer to these same canonical definitions;
no user-data migration is needed.

`v1` versions the HTTP contract. `ontologyVersion` versions the schema;
`RegistryVersion` versions a registry. `revision` detects source content changes
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
const origin = 'http://127.0.0.1:24106'; // Use the deployed HTTPS origin in production.
const response = await fetch(`${origin}/v1/services?limit=100`);
if (!response.ok) throw new Error(`Ontology unavailable: ${response.status}`);
const { data: services, meta } = await response.json();
const telegram = services.find(service => service.id === 'telegram');
const iconUrl = new URL(telegram.iconUrl, origin).href;
// Store only this canonical reference alongside the user's data in NokNok:
const serviceReference = telegram.reference;
// Continue at meta.nextOffset if it is not null.
```

## NokNok Relay compatibility

The Relay no longer owns service definitions or icons. Its existing
`/api/services` and `/api/services/{id}/icon.svg` routes are compatibility adapters
that fetch VL Ontology. New applications should call this API directly.
The Relay caches the service definition for 60 seconds, times out requests after
5 seconds, and reports 503 if the registry is unavailable. Public-profile reads
still return user fields during an outage, with `services: []` and
`ontologyUnavailable: true`. Lexicon storage and attestations stay in NokNok.

Start VL Ontology before starting/restarting the Relay. For local development,
stop the existing Relay process and run:

```sh
ONTOLOGY_URL=http://127.0.0.1:24106 npm --prefix NokNok/Relay start
```

For deployments, set `ONTOLOGY_URL` to the ontology server's reachable HTTP(S)
origin, without an API path, credentials, or query. The Relay fetches icons
server-side, so this origin may be internal. Existing wallet apps need no rebuild
for these compatibility routes.

## Verification

```sh
npm --prefix VowLabs/Ontology test
npm --prefix VowLabs/Ontology run validate
node NokNok/Relay/test/ontology-client.test.mjs
```

The existing NokNok asset-generation command remains available through the
compatibility symlink. It uses the same validator as the API:

```sh
node NokNok/Ontology/_support/tools/build.mjs
```
