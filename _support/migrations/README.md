# Version migrations

Files are keyed by the source ontology version. `To` is the destination version;
`Prefixes` maps canonical code prefixes, `SubjectTypes` maps subject codes, and
optional `Values` maps historical field values. `Legacy` names archived definitions
needed to interpret old facts. Consumers follow the chain to the current version.

The 1.0.0 and 2.0.0 maps preserve identity and domain reorganizations. The 2.1.0
map introduces canonical tags; the 3.0.0 map migrates address records and choices.
See the [protocol guide](../protocol/README.md) for compatibility details.

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
