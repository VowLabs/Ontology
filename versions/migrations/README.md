# Version migrations

Files are keyed by the source ontology version. `To` is the destination version;
`Prefixes` maps canonical code prefixes, `SubjectTypes` maps subject codes, and
optional `Values` maps historical field values. `Legacy` names archived definitions
needed to interpret old facts. Consumers follow the chain to the current version.

The 1.0.0 and 2.0.0 maps preserve identity and domain reorganizations. The 2.1.0
map introduces canonical tags; the 3.0.0 map migrates address records and choices.
See the [protocol guide](../../docs/protocol/README.md) for compatibility details.

4.0.0 → 4.1.0 and 4.1.0 → 4.2.0 are additive vocabulary transitions: their empty
maps preserve codes, values and subjects. Including these steps keeps earlier
address migrations reachable after the Professions vocabulary is added.
No manual database migration is required; historical signed statements remain
unchanged and are interpreted through the migration chain.

## 4.2.0 to 5.0.0: definitions and data

Active definitions no longer include named profession/country entries, embedded
service records, or NokNok-owned schemas (`I:CN`, `I:PR`, `F:AC`, `S:I:D:LEX`).
The migration names the retired prefixes and dataset replacements. Country answer
IDs remain unchanged; profession and country tags move to `legacyTags` without
being discarded. Old signed statements are never rewritten. The 4.2 definitions
are archived for historical validation, not served as current definitions.

NokNok owns its application schemas and preserves existing record IDs, values,
visibility and timestamps. Its bundle keeps these schemas under `application`;
other consumers must implement an explicit policy for any retired application
records they previously stored. Do not silently interpret them as current
ontology definitions. No database-wide destructive migration is required.

## 5.0.0 to 6.0.0: Display Name code

Display Name is `I:P:DN`. The retired `I:P:PN` code maps to it explicitly.
Consumers rename the `PN` answer key to `DN` inside personal records, preserving
value, public/private status, timestamps, record IDs and subjects. Canonical tags
follow the same mapping. Conflicting old/new answer keys must be rejected rather
than silently overwriting either value. Existing signed statements and disclosure
history retain their original codes and validate against archived definitions.
NokNok reads older public profile projections until their next normal save.

## 6.0.0 to 6.1.0: subdivision reference data

Adds the generic Subdivision definition and the US states dataset. Existing codes,
answers and signatures are unchanged. NokNok stores optional reference-data
classifications in `dataTags`, separate from canonical ontology `tags`.

## 6.1.0 → 7.0.0

Geography moves from `G` to `S:G` beneath Science. Definition codes, record tags and address-role choice values migrate. Country and state dataset IDs remain stable; signed historical statements remain unchanged.

## 7.0.0 → 8.0.0

Humanities moves from top-level `U` to `R:U` within Society. Its meaning stays
unchanged. Consumers map definition references and canonical record tags through
this prefix migration; all other codes, values, subject types and dataset IDs
remain unchanged. Humanities has no answer fields or descendants in 7.0.0, so
there are no Humanities field values to transform. Preserve record IDs,
visibility and timestamps. Do not rewrite signed statements or attestations:
validate them against their original version's archived definitions. Consumers
that cannot follow this migration must reject version 8.0.0 rather than treating
`U` as a current code. No destructive database migration is required.

## 8.0.0 → 8.1.0

Geography definitions and datasets become Geo-owned and are resolved through the
Ontology proxy. Existing codes, country IDs, US state IDs, stored answers and
signed bytes are unchanged. Geo's `states` version 2 expands coverage worldwide.
Offline clients explicitly regenerate their foreign snapshot; no database rewrite
is needed. Historical definitions remain archived under their original versions.

## 8.1.0 → 8.2.0

Adds `R:SV` (Society / Services) for individual and household customers and `B:SV`
(Business / Services) for business and organizational customers. Categories
classify the offering, rather than its provider or an incidental payer. Existing codes,
answers, subjects, provider datasets and signed statements are unchanged. The
empty migration preserves them without a database rewrite. This does not move
the online-provider concept `S:T:SV` or its named-provider dataset.

## 8.2.0 → 9.0.0

Every current definition declares repeatability (`Collection`) and grouped-value
semantics (`Composite`). Contact point (`I:C:P`) is
flattened into Contact (`I:C`), so Email is `I:C:EM`. Other Contact child records
retain their codes. The redundant `I:C:P:N` Label answer moves to record metadata
when no label exists and is always archived with its original metadata. Existing
labels and signed statements are never overwritten. Wallet clients migrate on
load. Geography codes and meanings are unchanged; Geo publishes the same 9.0.0
Collection/Composite contract from its own definitions and API.

## 9.0.0 → 10.0.0

Personal is renamed Individual (`I:P`). Calendar booking, Electronic mail and
Social media retain their existing codes. Organization gains type, formation,
headquarters and description properties. Contact Address delegates to Geo.
Emergency-person records (`I:C:EC`) leave the active ontology and remain readable
in NokNok's application-owned historical schema. Tags referencing that retired
branch are archived as legacy tags. Signed statements, record IDs and values
remain unchanged. The Emergency flag on saved contacts requires an explicit
user choice because historical emergency records do not identify wallet accounts.

## 10.1.0 → 10.1.1

Add a display format to composite driver licences. Existing values, codes and signatures are unchanged. Public projections display each licence as one document and omit private or empty fields.

## 10.1.1 → 10.1.2

Label driver licence issuing country and region separately. No answer or code changes.

## 10.1.2 → 10.2.0

Move Geography’s delegation URL and scope into its public boundary definition.
Boundary API responses now return that declaration without querying Geo; child
and descendant proxy endpoints remain compatible. Answer codes and values do
not change. The former private delegation registry is removed.
