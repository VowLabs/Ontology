# Invoice

Canonical code: `F:INV`. Definition: [index.json](index.json).

A financial transaction record.

An invoice represents a request or statement of payment due. Its identifier and application status distinguish it from an order, a settlement evidence record and a refund; amounts and line items remain in application-owned schemas.

Parent: [Finance](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json), [Organization identity (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Record identifier — `F:INV:ID`

The field answers: “What is the record identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `id`.

The identifier belongs to the application record. It does not by itself assert global uniqueness or authenticate that record.

[Field definition](Id.json).

### Status — `F:INV:ST`

The field answers: “What is the status?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `status`.

This field has no declared lifecycle enumeration. The consuming application defines valid status transitions; the ontology does not infer completion from a record’s presence.

[Field definition](Status.json).
