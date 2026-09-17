# Organization

Canonical code: `I:O`. Definition: [index.json](index.json).

Organization separates legal name from trading name and pairs registration number with its jurisdiction. The record describes an organization; it does not establish the submitting person’s authority to act for it.

Parent: [Identity](../README.md).

## Record scope

At most one record per subject (`Scalar: true`).

Applicable subjects: [Organization (`I:O`)](index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

This definition also declares a subject type that other records can reference.

## Fields

### Legal name — `I:O:LN`

The field answers: “What is the organization’s legal name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](LegalName.json).

### Trading name — `I:O:TN`

The field answers: “What trading name does the organization use?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](TradingName.json).

### Registration jurisdiction — `I:O:J`

The field answers: “Where is the organization registered?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Jurisdiction.json).

### Registration number — `I:O:RN`

The field answers: “What is the organization’s registration number?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](RegistrationNumber.json).
