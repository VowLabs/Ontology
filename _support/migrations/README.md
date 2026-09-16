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
