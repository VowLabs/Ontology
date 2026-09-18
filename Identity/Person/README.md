# Individual

Canonical code: `I:P`. Definition: [index.json](index.json).

Personal groups one person’s legal and display names, birth details, US Social Security number and profile image. A display name is a presentation choice, while a legal name describes formal identity; neither field verifies the person.

Parent: [Identity](../README.md).

## Record scope

At most one record per subject (`Scalar: true`).

Applicable subjects: [Individual (`I:P`)](index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

This definition also declares a subject type that other records can reference.

## Fields

### Legal name — `I:P:LN`

The field answers: “What is your full legal name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](LegalName.json).

### Display Name — `I:P:DN`

The field answers: “What name should be displayed for this person?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](DisplayName.json).

### Date of birth — `I:P:DOB`

The field answers: “What is your date of birth?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](BirthDate.json).

### Country of birth — `I:P:COB`

The field answers: “In which country were you born?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](BirthCountry.json).

### US Social Security number — `I:P:SSN`

Optional, one current value per person. Formatting does not prove issuance.

The field answers: “What is your US Social Security number?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Required pattern: `^[0-9]{3}-[0-9]{2}-[0-9]{4}$`.

Maximum length: `256`.

[Field definition](SocialSecurityNumber.json).

### Profile image — `I:P:IMG`

The field answers: “What profile image do you use?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Required pattern: `^data:image/jpeg;base64,[a-zA-Z0-9+/=]+$`.

Maximum length: `100000`.

[Field definition](ProfileImage.json).
