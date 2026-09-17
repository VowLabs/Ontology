# Medication

Canonical code: `H:MED`. Definition: [index.json](index.json).

A medication record groups the name with a dose including units and a frequency. Dose and frequency are text, allowing the recorded regimen to retain its wording; the ontology does not calculate doses or prescribe treatment.

Parent: [Health](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../Identity/Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Name — `H:MED:N`

The field answers: “What medication do you take?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

### Dose — `H:MED:D`

The field answers: “What dose do you take, including units?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Dose.json).

### Frequency — `H:MED:F`

The field answers: “How often do you take it?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Frequency.json).
