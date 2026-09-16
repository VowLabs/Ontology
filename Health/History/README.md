# Medical history

Canonical code: `H:HX`. Definition: [index.json](index.json).

A medical-history record groups a reported condition, diagnosis date if known and notes. The absence of a date does not establish that no diagnosis occurred, and the record is not clinical verification.

Parent: [Health](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Condition — `H:HX:C`

The field answers: “What condition would you like to record?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Condition.json).

### Diagnosis date — `H:HX:D`

The field answers: “When was this condition diagnosed, if known?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Date.json).

### Notes — `H:HX:N`

The field answers: “What else should a practitioner know about this condition?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Notes.json).
