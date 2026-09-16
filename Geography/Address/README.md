# Address

Canonical code: `G:AD`. [Definition](index.json).

Address is an organizing branch for postal formats and address-use concepts.
It is no longer itself an answer-bearing record. Existing records formerly at
this path move to `G:AD:US` through the version 4.0.0 migration.

## Subclassifications

- [Roles](Roles/README.md) (`G:AD:RO`) defines the ways an address can be used.
  Its leaves are referenced by a Role field’s `Choices`, and are also available
  as generic tag targets. Role is a constrained relationship; tags are general
  relationships to arbitrary ontology points. Tags do not replace Role.
- [US](US/README.md) (`G:AD:US`) contains the former address fields and US-style
  postal display template. It is a repeatable record for people or organizations.
  It refers separately to [United States](../Country/US/README.md) (`G:CO:US`),
  which is the country concept rather than an address format.

Further national formats can become siblings of US without duplicating the
Roles vocabulary. The current tree does not yet define other national formats.
See [Geography](../README.md) and the [migration guide](../../_support/protocol/README.md#address-migration).
