# Identity

Canonical code: `I`. Definition: [index.json](index.json).

Identity separates who a subject is from how to contact them, their identifiers, issued documents and contact information. Personal and organizational identity define the subject types used by records elsewhere in the tree.

Parent: [VowLabs ontology](../README.md).

## Subclassifications

### Personal — `I:P`

Personal groups one person’s legal and display names, birth details, US Social Security number and profile image. A display name is a presentation choice, while a legal name describes formal identity; neither field verifies the person.

Record fields: Legal name (`I:P:LN`), Display Name (`I:P:DN`), Date of birth (`I:P:DOB`), Country of birth (`I:P:COB`), US Social Security number (`I:P:SSN`), Profile image (`I:P:IMG`).

[Detailed classification guide](Person/README.md) · [Definition](Person/index.json).

### Organization — `I:O`

Organization separates legal name from trading name and pairs registration number with its jurisdiction. The record describes an organization; it does not establish the submitting person’s authority to act for it.

Record fields: Legal name (`I:O:LN`), Trading name (`I:O:TN`), Registration jurisdiction (`I:O:J`), Registration number (`I:O:RN`).

[Detailed classification guide](Organization/README.md) · [Definition](Organization/index.json).

### External identifier — `I:ID`

An external identifier is interpreted using its scheme and issuer. The same text may identify different things under different issuers, so the value alone should not be treated as globally unique.

Record fields: Scheme (`I:ID:S`), Value (`I:ID:V`), Issuer (`I:ID:IS`).

[Detailed classification guide](Identifiers/README.md) · [Definition](Identifiers/index.json).

### Contact — `I:C`

Contact separates direct communication channels, accounts on named online services and emergency contacts. An emergency contact describes another person to reach; it is not an alternative legal identity for the subject.

Further classifications: Contact point (`I:C:P`), Online account (`I:C:SM`), Emergency contact (`I:C:EC`).

[Detailed classification guide](Contact/README.md) · [Definition](Contact/index.json).



### Documents — `I:DOC`

Documents issued to identify a person or certify an entitlement. Values describe documents; validity and authenticity require separate verification.

Issued documents are separate from the personal subject they describe. Driver licences add driving classes, region and restrictions; passports add passport type and recorded nationality. Each renewal is a distinct document record.

Further classifications: Driver licence (`I:DOC:DL`), Passport (`I:DOC:PP`).

[Detailed classification guide](Documents/README.md) · [Definition](Documents/index.json).
