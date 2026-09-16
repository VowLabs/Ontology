# Payment instrument reference

Canonical code: `F:PI`. Definition: [index.json](index.json).

Payment instrument references describe an instrument held by a provider using a non-secret reference and optional last four digits. This schema is not a place for full card credentials, CVVs or authentication secrets.

Parent: [Finance](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json), [Organization identity (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Provider — `F:PI:P`

The field answers: “Which provider holds this payment instrument?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Provider.json).

### Reference — `F:PI:R`

The field answers: “What non-secret reference identifies it?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Reference.json).

### Last four digits — `F:PI:L4`

The field answers: “What are its last four digits?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Required pattern: `^[0-9]{4}$`.

Maximum length: `256`.

[Field definition](LastFour.json).
