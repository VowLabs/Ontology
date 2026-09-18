# Organization

Canonical code: `I:O`. Definition: [index.json](index.json).

Organization separates legal name from trading name and pairs registration number with its jurisdiction. The record describes an organization; it does not establish the submitting person’s authority to act for it.

Parent: [Identity](../README.md).

## Record scope

At most one record per subject (`Scalar: true`).

Applicable subjects: [Organization (`I:O`)](index.json).

The answer fields below are optional scalar properties of one record. The Types
branch (`I:O:K`) is the classification vocabulary for Organization type. An unanswered field does not mean false, zero or not applicable.

This definition also declares a subject type that other records can reference.

`Collection: false`, `Composite: false`: each property can be entered separately.
Headquarters references an address record for this Organization subject; its
constituent fields remain Geo-owned. Organization types are classifications,
not contact people.

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

### Organization type — `I:O:T`

String constrained to terminal codes under `I:O:K`. See [the type vocabulary](Types/README.md).
The choices include the merchant-onboarding forms plus Foundation and Corporation.
No finer field subclasses exist.

### Formation year — `I:O:FY`

Integer from 1 through 9999, for example 2020. This describes original formation,
not the date of a later registration. No finer subclasses exist.

### Formation jurisdiction — `I:O:FJ`

String up to 200 characters, for example “Delaware, United States”. Include the
country and any applicable state, province or other legal jurisdiction. This is
separate from Registration jurisdiction (`I:O:J`), which may differ. No finer
subclasses exist.

### Headquarters address — `I:O:HQ`

A record reference to a Geo address under `S:G:AD`, belonging to this organization.
The wallet shows the address label and components, not its internal ID. It is a
single current headquarters reference; Geo addresses themselves are repeatable
composite values. Registered offices and mailing addresses are not necessarily
headquarters. No finer subclasses exist.

### Description — `I:O:D`

String up to 2000 characters describing the organization's activities. This is
not a verified industry classification. No finer subclasses exist.
