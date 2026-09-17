# Food preference

Canonical code: `H:D:P`. Definition: [index.json](index.json).

A food preference pairs an ingredient, food or cuisine with prefer, avoid or no-preference. Avoidance here is a preference and should not be interpreted as a confirmed allergy.

Parent: [Food](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../../Identity/Person/index.json), [Organization (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Food or ingredient — `H:D:P:I`

The field answers: “Which food, ingredient, or cuisine does this concern?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Item.json).

### Preference — `H:D:P:P`

The field answers: “What is your preference?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `prefer`, `avoid`, `no-preference`.

[Field definition](Preference.json).
