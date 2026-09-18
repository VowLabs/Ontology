# Geography — delegated to Geo

Canonical code: `S:G`. [Boundary definition](index.json).
Parent: [Science](../README.md).

Geo owns Geography's definitions and reference data. This directory contains
only the parent-assigned boundary; it has no local child definitions or rows.
The absence of `Children` does not mean the foreign branch is empty.

The public `Delegation` object in [this boundary definition](index.json)
reserves `S:G` and descendants for Geo. Dataset declarations are obtained from
the authoritative Geo catalogue; none are declared in this boundary. Geography
covers places, addresses, countries and political subdivisions. Address roles
and formats are distinct from the places they identify. Examples include a
shipping-address record and a country reference; they remain separate from
Identity's descriptions of people and organizations.

Clients fetching `Science/Geography/index.json` or `/v1/definitions/S:G` receive
the boundary and its `Delegation.url`, and can follow that URL directly. Boundary
lookup requires no Geo request and remains available during an upstream outage.
For compatibility, `/v1/definitions/S:G/children`, descendant definitions and the
country/state dataset endpoints still proxy Geo, including search and pagination.
The remote classifications retain their existing canonical codes. See the
[delegation contract](../../docs/contributions/README.md).

Authoritative service: [Geo Ontology API](https://geo-ekkis.vercel.app/v1/).
The registered authority remains this public URL when a development proxy uses
a local upstream. Definition responses and expanded catalogues retain
`delegation: "geo"` and `authoritativeUrl` on delegated nodes.

`Delegation` contains the public service `url`, authority `id` and `name`, source
`repository`. The prefix derives from this node’s
canonical path; the compatibility version derives from the ontology root.
The catalogue’s delegation index is generated from these public definitions,
not maintained separately. Expanded offline snapshots preserve this declaration.
