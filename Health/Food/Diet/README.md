# Dietary restriction

Canonical code: `H:D:D`. Definition: [index.json](index.json).

A dietary restriction pairs the restriction with preparation instructions. This can express requirements that are not allergies; applications should not infer a diagnosis from them.

Parent: [Food](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../../Identity/Person/index.json), [Organization (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Restriction — `H:D:D:N`

The field answers: “What dietary restriction should a provider observe?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

### Instructions — `H:D:D:I`

The field answers: “What preparation instructions should a provider follow?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Instructions.json).
