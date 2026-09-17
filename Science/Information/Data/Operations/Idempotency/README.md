# Idempotency record

Canonical code: `S:I:D:OP:ID`. Definition: [index.json](index.json).

Internal operational data; classification does not make it shareable.

Idempotency records track repeated operations so an application can recognize a previously handled request. They differ from the request’s business record.

Parent: [Information system operations](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../../../../Identity/Person/index.json), [Organization (`I:O`)](../../../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Record identifier — `S:I:D:OP:ID:ID`

The field answers: “What is the record identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Types/Identifier.json); stored as `string`.

Maximum length: `256`.

The identifier belongs to the application record. It does not by itself assert global uniqueness or authenticate that record.

[Field definition](Id.json).

### Status — `S:I:D:OP:ID:ST`

The field answers: “What is the status?”

Value type: [String (`S:I:D:T:S`)](../../Types/String.json); stored as `string`.

Maximum length: `2000`.

This field has no declared lifecycle enumeration. The consuming application defines valid status transitions; the ontology does not infer completion from a record’s presence.

[Field definition](Status.json).

## Operational boundary

The current vocabulary exposes only a record identifier and status. The application owns the operational payload and lifecycle. Related families are documented in the [operations guide](../README.md).
