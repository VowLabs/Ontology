# Passport

Canonical code: `I:DOC:PP`. Definition: [index.json](index.json).

One record per issued document, including renewals. Document numbers are text and scoped to their issuer. No universal number pattern is assumed.

A passport record captures an issued document. Issuing country, issuing authority and recorded nationality have separate fields and should not be inferred from one another. Passport type is free text rather than a globally fixed list.

Parent: [Documents](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

Records are private by default (`Public: false`); schema metadata remains publicly readable.

## Fields

### Document number — `I:DOC:PP:N`

The field answers: “What is the document number?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Number.json).

### Issuing country — `I:DOC:PP:CO`

The field answers: “Which country issued this document?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Country.json).

### Issuing authority — `I:DOC:PP:IS`

The field answers: “Which authority issued this document?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Issuer.json).

### Issue date — `I:DOC:PP:ISS`

The field answers: “When was this document issued?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Issued.json).

### Expiry date — `I:DOC:PP:EXP`

The field answers: “When does this document expire?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Expiry.json).

### Passport type — `I:DOC:PP:TY`

The field answers: “What type of passport is this?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](PassportType.json).

### Nationality — `I:DOC:PP:NA`

The field answers: “What nationality is recorded in this passport?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Nationality.json).
