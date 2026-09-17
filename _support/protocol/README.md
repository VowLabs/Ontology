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

## Canonical record tags

Starting with ontology `3.0.0`, a record's optional `tags` array contains only
canonical ontology codes. Each entry must be a distinct, nonempty code resolving
to a definition in that record's declared ontology version. NokNok permits up
to 32 tags, each at most 64 characters. The anonymous root is not a tag.
Organizing concepts, record definitions and leaf datapoints can all be referenced.

For example, `"tags": ["F:P:IS:MO"]` qualifies an item in terms of motor
insurance. The stored value is the code, while the UI can display its full
human-readable path. `"Insured"`, `"Finance:Product"`, `"F:P:*"`, URLs and
unknown codes are not valid tags. A reference to a field does not assert that
field's value: `S:G:AD:R` means Role, not the Role value Shipping.

Applications must validate tags at persistence and import boundaries, not only
in the picker. A tag is classification metadata; it does not prove ownership,
coverage, consent, or any attested fact. Existing selective-disclosure envelopes
do not automatically include tags, and their presence never grants access.

NokNok migrates snapshots from `1.0.0`, `2.0.0` and `2.1.0` through the published
migration maps. Recognized codes retain their canonical meaning; duplicate codes
are collapsed. Earlier free-text tags are retained verbatim in `legacyTags` for
human review and are excluded from canonical tag matching. No fuzzy matching of
labels to concepts is performed. Current-version snapshots with invalid tags
are rejected rather than silently repaired.

For existing address records, the known Shipping or Billing tag becomes a
`S:G:AD:R` Role answer only if no Role answer already exists. Shipping takes
precedence when both old tags occur, preserving the previous shipping selection.
The added Role retains private handling unless all existing answers are public;
its timestamp uses the latest existing valid answer timestamp, or the Unix epoch
when there are no dated answers. Existing Role values, other answers, attestations
and their signatures are unchanged. The original free-text tags remain archived.
The wire query `Geography:Address?tag=Shipping` remains a compatibility alias;
it now selects the explicit Role value Shipping instead of free-text tags.

Old clients do not support the new snapshot version and must be updated before
editing migrated records. The migration runs on load in updated wallet clients
and is persisted on the next successful save; no separate database migration
command is required.

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

## Address migration

Ontology `4.0.0` turns `S:G:AD` into an organizing branch and moves the prior
answer-bearing address record and its fields to `S:G:AD:US`. The migration uses
longest-prefix matching, including field codes and canonical tags. Earlier
root-prefix migrations still run first. The original record IDs remain stable.

Role’s `Choices` is now the branch reference `S:G:AD:RO`, while Country references
`S:G:CO`. Valid values are the canonical codes of descendant leaves; display
names, parent branches and free-form answers are not current choices. Role is a
constrained relationship and is not replaced by generic tags. A Shipping tag
alone does not supply the Role answer required by shipping-address workflows.

The versioned migration maps recognize earlier role labels and country keys,
three-letter codes and source common/official names. Matching is exact; no fuzzy
country or role inference is performed. Recognized values become leaf codes.
Unmatched answers are retained with their original visibility, timestamp and
ontology version in the record’s `legacyAnswers`, keyed by their old full field
code. Clients show these as previous answers requiring review. They are not
current fields, choice values or automatically disclosed profile information.
No existing non-US country is silently replaced with United States. The retained
record uses the old US-style form until a suitable national format is defined.

The read-only definitions in `legacy.json` support validation of historical
signed facts. Signatures and statements retain their original bytes and version;
matching maps recognized values and paths without rewriting the statement.
An unknown former custom role cannot become an attested canonical role merely
because an archived signature exists. Historical disclosure records keep their
original code/version context.

The shipping wire query remains compatible. Current clients use `S:G:AD:US` and
Role `S:G:AD:RO:SH` internally; the checkout response continues to expose two-letter
country codes for consuming shops. Country names and role names are presentation,
not the stored relationship values.

Migration is automatic on load and is persisted on the next successful save.
Update all clients before sharing migrated snapshots; clients that do not support
4.0.0 must reject it rather than reinterpret it. No manual database migration is
required. The archived old definitions and historical migration maps must remain
stable when external source data is refreshed.

Pending attestation requests for old address fields are projected to their current
canonical codes and known values when listed and checked for acceptance. New
requests record the ontology version. Stored requests and existing signed proofs
retain their original contents; custom answers outside the new choices must be
reviewed and requested again with a permitted value.

## Reference-data tags

Applications may separately attach `dataTags`, an array of `{dataset,id}` references
to records in the loaded datasets, for example `{"dataset":"states","id":"US-CA"}`.
NokNok accepts at most 32 distinct references, rejects unknown datasets/IDs and
extra properties, and preserves them in the encrypted record. They do not become
canonical ontology codes, prove a fact, or grant disclosure permissions. Existing
`tags` retain their canonical-code-only contract.
