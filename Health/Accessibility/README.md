# Accessibility need

Canonical code: `H:AC`. Definition: [index.json](index.json).

Accessibility records describe requested accommodations. They can apply to people or organizations under the schema and do not require a diagnosis or medical explanation.

Parent: [Health](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../Identity/Person/index.json), [Organization (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Need — `H:AC:N`

The field answers: “What accessibility accommodation do you need?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Need.json).
