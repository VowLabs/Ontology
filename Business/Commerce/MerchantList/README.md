# Merchant list

Canonical code: `B:C:ML`. Definition: [index.json](index.json).

A directory or owner-maintained collection of merchant references.

Parent: [Commerce](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../../Identity/Person/index.json), [Organization (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### List identifier — `B:C:ML:ID`

The field answers: “What is the list identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

The identifier belongs to the application record. It does not by itself assert global uniqueness or authenticate that record.

[Field definition](Id.json).

### List name — `B:C:ML:N`

The field answers: “What is the list name?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

## Relationship to other commerce records

Use the [Commerce guide](../README.md) to distinguish catalogue entries, proposals, orders, fulfillment and relationship records. Only the fields listed above are defined here; application payloads and workflow rules remain application-owned.
