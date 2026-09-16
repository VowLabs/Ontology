# Processing cursor

Canonical code: `S:I:D:OP:CUR`. Definition: [index.json](index.json).

Internal operational data; classification does not make it shareable.

Processing cursors track progress through an ordered stream or chain. A cursor’s position is operational state, not a financial transaction.

Parent: [Information system operations](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../../../../Identity/Person/index.json), [Organization identity (`I:O`)](../../../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Record identifier — `S:I:D:OP:CUR:ID`

The field answers: “What is the record identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `id`.

The identifier belongs to the application record. It does not by itself assert global uniqueness or authenticate that record.

[Field definition](Id.json).

### Status — `S:I:D:OP:CUR:ST`

The field answers: “What is the status?”

Value type: [String (`S:I:D:T:S`)](../../Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `status`.

This field has no declared lifecycle enumeration. The consuming application defines valid status transitions; the ontology does not infer completion from a record’s presence.

[Field definition](Status.json).

## Operational boundary

The current vocabulary exposes only a record identifier and status. The application owns the operational payload and lifecycle. Related families are documented in the [operations guide](../README.md).
