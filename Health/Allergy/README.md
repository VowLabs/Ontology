# Allergy record

Canonical code: `H:AL`. Definition: [index.json](index.json).

An allergy record is scoped to one substance. Reported allergy, suspected, no-known-allergy and unknown are explicit statuses; a missing answer is not a declaration of no allergy. Reaction and notes add context without changing that distinction.

Parent: [Health](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Substance — `H:AL:S`

The field answers: “Which substance does this record concern?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Substance.json).

### Status — `H:AL:ST`

The field answers: “What is your reported allergy status for this substance?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `reported-allergy`, `suspected`, `no-known-allergy`, `unknown`.

[Field definition](Status.json).

### Reaction — `H:AL:R`

The field answers: “What reaction have you experienced, if any?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Reaction.json).

### Notes — `H:AL:N`

The field answers: “What additional information would you like to provide?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Notes.json).
