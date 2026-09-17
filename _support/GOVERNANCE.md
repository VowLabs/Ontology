# Contributing definitions

A parent owns its child keys. Make changes in the smallest applicable branch;
adding a leaf changes its file and its immediate parent's reference. Keep
canonical concepts in one place and use collections to bring related questions
together for a workflow. Domain membership is not a disclosure permission.

Every new answer property needs a clear meaning, question, answer type, examples,
and applicability. Distinguish preferences from conditions, absence from unknown,
and formatting validation from factual verification. Do not add executable code,
secrets such as CVVs, or private user examples to the catalogue.

Every new datapoint must also be fully described in a human-readable README.md
in its containing folder. Every folder containing index.json requires a README.
Explain every child classification or field, its canonical code, meaning,
applicability, examples, boundaries, and any types, units, choices or constraints.
State explicitly when no finer subclasses exist. Update the parent README for
new children and keep documentation synchronized with definition changes; JSON
definitions alone do not satisfy this requirement.

Before publishing a domain as authoritative, assign named maintainers and obtain
review by appropriate domain experts. Health, insurance and identifiers need
particular care about wording and jurisdiction. This initial repository does
not claim that such a review or consensus has already occurred.

Definition changes require a root Version change. A meaning change needs a new
canonical path; never repurpose a published code. Cosmetic file moves preserve
parent keys. A path move requires a documented migration; v1 consumers reject
unsupported versions instead of guessing compatibility. Record old codes in
legacy.json, and review migration impact on stored answers and attestations.

Run the validation and API tests described in [the ontology README](../README.md). Include valid and
invalid answer examples in tests when changing constraints. Do not commit the
compiled catalogue. Review changes to shared types for effects on every referring
field. Request collections must list leaves explicitly and must not grant access
to future descendants automatically.

## Definitions, reference data and application state

The definition tree describes things, their properties, types and constraints.
Named reference lists (professions, countries, providers) belong in `data/`, with
independent dataset versions and stable IDs. Serve them through dataset endpoints;
do not embed `Records` or create ontology children for each entry. A field may
select dataset IDs through `Choices: {"Dataset":"countries"}`.

User list membership, UI settings, application-specific account schemas and
persistence keys belong to the owning application. A generic concept such as an
order can be defined here; a particular application's orders or settings cannot.
Review the [boundary audit](BOUNDARIES.md) before adding new branches.

## Delegated branches and services

Parent-assigned prefixes can be maintained and served independently under the
[contribution contract](contributions/README.md). The designated Geography
maintainer is `ekkis/Geo`; see [the handoff status](../CONTRIBUTING.md). VowLabs owns
the parent assignment and routing registry. A contributor manifest cannot grant
scope. Typed datasets may be served locally or delegated independently of where
definitions are maintained. Service delegation publishes a URL and redirects
callers; it does not require importing all remote descendants. Snapshot imports,
when used, must be pinned and validated. Both delivery modes must preserve stable
identifiers, resolve declared types and coordinate version/migration changes.
