# Contact point

Canonical code: `I:C:P`. Definition: [index.json](index.json).

A contact point groups a purpose label with email, international phone and website details. Separate records can represent personal and work contact points without combining their channels.

Parent: [Contact](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Person/index.json), [Organization identity (`I:O`)](../../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Label — `I:C:P:N`

The field answers: “What is this contact point used for?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

### Email — `I:C:P:EM`

The field answers: “What is the email address?”

Value type: [Email address (`S:I:D:T:EM`)](../../../Science/Information/Data/Types/Email.json); stored as `string`.

Format: `email`.

Maximum length: `254`.

[Field definition](Email.json).

### Phone — `I:C:P:PH`

The field answers: “What is the international phone number?”

Value type: [International phone number (`S:I:D:T:PH`)](../../../Science/Information/Data/Types/Phone.json); stored as `string`.

Required pattern: `^\+[1-9][0-9]{1,14}$`.

[Field definition](Phone.json).

### Website — `I:C:P:URL`

The field answers: “What is the website address?”

Value type: [Web address (`S:I:D:T:URL`)](../../../Science/Information/Data/Types/URL.json); stored as `string`.

Format: `url`.

Maximum length: `2000`.

[Field definition](Website.json).
