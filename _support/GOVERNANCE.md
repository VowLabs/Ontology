# Contributing definitions

A parent owns its child keys. Make changes in the smallest applicable branch;
adding a leaf changes its file and its immediate parent's reference. Keep
canonical concepts in one place and use collections to bring related questions
together for a workflow. Domain membership is not a disclosure permission.

Every new answer property needs a clear meaning, question, answer type, examples,
and applicability. Distinguish preferences from conditions, absence from unknown,
and formatting validation from factual verification. Do not add executable code,
secrets such as CVVs, or private user examples to the catalogue.

Before publishing a domain as authoritative, assign named maintainers and obtain
review by appropriate domain experts. Health, insurance and identifiers need
particular care about wording and jurisdiction. This initial repository does
not claim that such a review or consensus has already occurred.

Definition changes require a root Version change. A meaning change needs a new
canonical path; never repurpose a published code. Cosmetic file moves preserve
parent keys. A path move requires a documented migration; v1 consumers reject
unsupported versions instead of guessing compatibility. Record old codes in
legacy.json, and review migration impact on stored answers and attestations.

Run the compiler and protocol tests described in [the ontology README](../README.md). Include valid and
invalid answer examples in tests when changing constraints. Do not commit the
compiled catalogue. Review changes to shared types for effects on every referring
field. Request collections must list leaves explicitly and must not grant access
to future descendants automatically.
