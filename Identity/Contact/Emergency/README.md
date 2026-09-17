# Emergency contact

Canonical code: `I:C:EC`. Definition: [index.json](index.json).

An emergency contact groups name, relationship and phone number for a person to contact. It does not grant that contact access to the subject’s other records.

Parent: [Contact](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Name — `I:C:EC:N`

The field answers: “Who should be contacted in an emergency?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

### Relationship — `I:C:EC:R`

The field answers: “What is their relationship to you?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Relationship.json).

### Phone — `I:C:EC:PH`

The field answers: “What is their international phone number?”

Value type: [International phone number (`S:I:D:T:PH`)](../../../Science/Information/Data/Types/Phone.json); stored as `string`.

Required pattern: `^\+[1-9][0-9]{1,14}$`.

[Field definition](Phone.json).
