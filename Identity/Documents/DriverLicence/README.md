# Driver licence

Canonical code: `I:DOC:DL`. Definition: [index.json](index.json).

One record per issued document, including renewals. Document numbers are text and scoped to their issuer. No universal number pattern is assumed.

A driver licence record captures an issued document, not an abstract licence category. Classes and restrictions are text taken from that document; country and issuing region supply context for interpreting them.

Parent: [Documents](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../Person/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

Records are private by default (`Public: false`); schema metadata remains publicly readable.

## Fields

### Document number — `I:DOC:DL:N`

The field answers: “What is the document number?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Number.json).

### Issuing country — `I:DOC:DL:CO`

The field answers: “Which country issued this document?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Country.json).

### Issuing authority — `I:DOC:DL:IS`

The field answers: “Which authority issued this document?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Issuer.json).

### Issue date — `I:DOC:DL:ISS`

The field answers: “When was this document issued?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Issued.json).

### Expiry date — `I:DOC:DL:EXP`

The field answers: “When does this document expire?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Expiry.json).

### Issuing region — `I:DOC:DL:RE`

The field answers: “Which state, province or region issued this licence?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Region.json).

### Licence classes — `I:DOC:DL:CL`

The field answers: “Which licence classes are recorded?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Classes.json).

### Restrictions and endorsements — `I:DOC:DL:RS`

The field answers: “Which restrictions or endorsements are recorded?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Restrictions.json).
