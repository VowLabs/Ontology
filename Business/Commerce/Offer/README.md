# Offer

Canonical code: `B:C:O`. Definition: [index.json](index.json).

A merchant proposal to supply goods or services; separate from the underlying product.

Parent: [Commerce](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../../Identity/Person/index.json), [Organization identity (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Record identifier — `B:C:O:ID`

The field answers: “What is the record identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `id`.

The identifier belongs to the application record. It does not by itself assert global uniqueness or authenticate that record.

[Field definition](Id.json).

### Status — `B:C:O:ST`

The field answers: “What is the status?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `status`.

This field has no declared lifecycle enumeration. The consuming application defines valid status transitions; the ontology does not infer completion from a record’s presence.

[Field definition](Status.json).

### Merchant identifier — `B:C:O:M`

The field answers: “What is the merchant identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `merchantId`.

[Field definition](MerchantId.json).

### Title — `B:C:O:T`

The field answers: “What is the title?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `title`.

[Field definition](Title.json).

### Description — `B:C:O:D`

The field answers: “What is the description?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `text`.

[Field definition](Text.json).

### Acceptance URL — `B:C:O:U`

The field answers: “What is the acceptance url?”

Value type: [Web address (`S:I:D:T:URL`)](../../../Science/Information/Data/Types/URL.json); stored as `string`.

Format: `url`.

Maximum length: `2000`.

SourceKey: `acceptUrl`.

[Field definition](AcceptUrl.json).

### Image URL — `B:C:O:I`

The field answers: “What is the image url?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `imageUrl`.

[Field definition](ImageUrl.json).

## Relationship to other commerce records

Use the [Commerce guide](../README.md) to distinguish catalogue entries, proposals, orders, fulfillment and relationship records. Only the fields listed above are defined here; application payloads and workflow rules remain application-owned.
