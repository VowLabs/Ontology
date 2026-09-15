# Using ontology references in application protocols

VL Ontology supplies canonical definitions and reference data. Applications own
the protocols that request, disclose, transport, and attest to user data. The
read-only [ontology API](../../API.md) does not receive disclosure payloads,
authenticate users, collect consent, or verify application signatures.

## Referencing a definition

An application message can identify a field using its ontology version and
canonical code. For example, this fragment identifies a vehicle year:

```json
{
  "ontologyVersion": "2.0.0",
  "code": "F:A:V:Y",
  "reference": "urn:vl:ontology:2.0.0:F:A:V:Y"
}
```

This is a reference example, not a prescribed request or signature envelope.
Resolve the code through `GET /v1/definitions/F:A:V:Y`. For reproducible
interpretation, retain the catalogue revision and the corresponding snapshot.
The API serves the currently loaded ontology; it does not provide historical
snapshot lookup.

## Requests and disclosures

Applications implementing selective disclosure should define:

- The request's identifier, audience, purpose, expiry, and replay protection.
- The applicable subject type and explicit field codes.
- Stable subject and record identifiers for repeated objects.
- How users review and approve individual values and records.
- How recipients validate a disclosure against the original request.

Collections provide convenient groups of field definitions. Expanding a
collection into explicit codes does not authorize access to those fields.
Required fields can constrain a submitted disclosure, but cannot remove a user's
ability to decline. Keep fields from each repeated record together: one
vehicle's make must not be combined with another vehicle's year.

Requester labels alone do not authenticate an origin. Authentication, transport
security, access control, and replay protection belong to the application.
Previously disclosed data cannot be made inaccessible merely by changing an
ontology definition or a local consent setting.

## Attestations

An application may attach an attestation to a fact identified by canonical code.
Its protocol must specify the exact statement schema, signing domain, byte
serialization, signature algorithm, issuer identification, and verification
rules. VL Ontology does not prescribe a signing envelope or signing prefix.

Keep signed statements byte-for-byte intact. Mapping an old code to a current
code for display must not rewrite the signed statement. A change to the value,
subject, instance, or timestamp may invalidate the applicability of a previous
attestation under the application's rules.

A valid signature establishes key control and statement integrity; it does not
by itself establish factual accuracy, identity, qualifications, or authority.
Applications define issuer trust, expiry, revocation, and disclosure policies.

## Compatibility

Applications must distinguish their protocol version from the ontology version.
Reject unsupported semantics rather than guessing. Historical migration maps
are available through `GET /v1/migrations`; applying them to application records
requires the consuming application's compatibility and migration policy.
