# Employment

Canonical code: `B:EMP`. Definition: [index.json](index.json).

Employment records pair an employer’s name with a role and start date. Separate records can describe multiple employments; this schema does not currently define an end date or employment-status enumeration.

Parent: [Business](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Employer — `B:EMP:O`

The field answers: “What is the employer’s name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Organization.json).

### Role — `B:EMP:R`

The field answers: “What is your role?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Role.json).

### Start date — `B:EMP:S`

The field answers: “When did this employment begin?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](StartDate.json).
