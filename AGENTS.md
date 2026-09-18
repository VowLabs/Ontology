# Ontology contributor requirements

- Every new datapoint must be fully described for humans in a `README.md` in
  its containing folder. Every folder with an `index.json` must have a README.
- Document the meaning, canonical code, scope, applicability, examples and
  boundaries with related concepts. Explain each child classification or field;
  include types, units, choices and constraints where applicable. Explicitly
  state when no finer subclasses exist. Update the parent README when adding a
  child. JSON alone is not sufficient documentation.
- Keep READMEs synchronized whenever a definition changes. Follow
  [_support/GOVERNANCE.md](docs/GOVERNANCE.md) for stable codes, versioning,
  migration and validation requirements.
- Record `tags` contain only distinct, nonempty canonical codes resolving to
  points in the record's ontology version. Free-text labels, display paths,
  unknown codes and wildcard expressions are not tags. See the
  [protocol guide](docs/protocol/README.md#canonical-record-tags).
- Do not create commits without the user's explicit permission. A request to
  implement, fix, test or finish work does not authorize a commit. Changes to
  this instruction remain uncommitted unless separately authorized.
