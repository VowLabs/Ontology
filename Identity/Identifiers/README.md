# External identifier

Canonical code: `I:ID`. Definition: [index.json](index.json).

An external identifier is interpreted using its scheme and issuer. The same text may identify different things under different issuers, so the value alone should not be treated as globally unique.

Parent: [Identity](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../Person/index.json), [Organization (`I:O`)](../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Scheme — `I:ID:S`

The field answers: “Which identifier scheme is this?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Scheme.json).

### Value — `I:ID:V`

The field answers: “What is the identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Value.json).

### Issuer — `I:ID:IS`

The field answers: “Who issued this identifier?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Issuer.json).
