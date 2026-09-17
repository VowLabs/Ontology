# Contributing definitions, data and services

Contributions can provide ontology definitions, typed reference data, or a service
that serves a delegated branch. These are separate concerns: defining Profession
belongs in the ontology; a list of professions is data; a URL for Geography
identifies the service responsible for resolving that branch.

The [contribution format v1](_support/contributions/README.md) specifies both
**snapshot** and **service** delivery. See its
[manifest schema](_support/contributions/manifest.schema.json),
[Geo service example](_support/contributions/geo.example.json) and
[snapshot example](_support/contributions/snapshot.example.json).

## Geography delegation

The designated maintainer for **Science / Geography (`S:G`)** is
[`ekkis/Geo`](https://github.com/ekkis/Geo). The proposed delivery mode is a
**delegated service**: VowLabs publishes a routing descriptor with Geo's URL;
callers follow it to fetch Geography and its children. Geo also serves the
separate `countries` and `states` datasets, whose records declare the ontology
definition that types them. VowLabs can continue serving other typed datasets,
such as professions, locally.

VowLabs retains the `S` parent, the `G` child assignment, shared primitive types
and the delegation registry. Geo maintains the definitions and data beneath its
assigned scope. A code identifies a concept; its service URL identifies where
to fetch it. Changing the URL does not rename the concept.

Status: **contract prepared; runtime service delegation not implemented**. The
example uses `https://geo.example/v1/`, an illustrative URL, not a deployed
endpoint. Existing definitions and data remain locally served. The current Geo
importer imports country and state snapshots only.

Activation requires:

1. Geo exposes the node, children, choices and dataset endpoints in the contract,
   with a real public HTTPS base URL, stable identifiers and versioned responses.
2. VowLabs registers Geo's URL and its explicit `S:G`, `countries` and `states`
   scope, publishes discovery descriptors, and implements the redirect behavior.
3. Consumers follow delegation and pagination links, preserve ontology/data types,
   handle remote unavailability, and stop assuming that the local catalogue
   contains every delegated descendant. Test Chrome, Mobile and Telegram clients.
4. Verify Geo responses and existing record compatibility before activating the
   route. If definitions change, coordinate ontology migrations and preserve
   historical signed facts. Endpoint activation alone must not change codes.

The guide and schema can be published with the Ontology repository and linked by
Geo contributors. Adding these local files does not publish them remotely,
register a live URL, or enable an HTTP schema endpoint.

See [governance](_support/GOVERNANCE.md) and the
[full contract](_support/contributions/README.md).
