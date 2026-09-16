# Documents

Canonical code: `I:DOC`. Definition: [index.json](index.json).

Documents issued to identify a person or certify an entitlement. Values describe documents; validity and authenticity require separate verification.

Issued documents are separate from the personal subject they describe. Driver licences add driving classes, region and restrictions; passports add passport type and recorded nationality. Each renewal is a distinct document record.

Parent: [Identity](../README.md).

## Subclassifications

### Driver licence — `I:DOC:DL`

One record per issued document, including renewals. Document numbers are text and scoped to their issuer. No universal number pattern is assumed.

A driver licence record captures an issued document, not an abstract licence category. Classes and restrictions are text taken from that document; country and issuing region supply context for interpreting them.

Record fields: Document number (`I:DOC:DL:N`), Issuing country (`I:DOC:DL:CO`), Issuing authority (`I:DOC:DL:IS`), Issue date (`I:DOC:DL:ISS`), Expiry date (`I:DOC:DL:EXP`), Issuing region (`I:DOC:DL:RE`), Licence classes (`I:DOC:DL:CL`), Restrictions and endorsements (`I:DOC:DL:RS`).

[Detailed classification guide](DriverLicence/README.md) · [Definition](DriverLicence/index.json).

### Passport — `I:DOC:PP`

One record per issued document, including renewals. Document numbers are text and scoped to their issuer. No universal number pattern is assumed.

A passport record captures an issued document. Issuing country, issuing authority and recorded nationality have separate fields and should not be inferred from one another. Passport type is free text rather than a globally fixed list.

Record fields: Document number (`I:DOC:PP:N`), Issuing country (`I:DOC:PP:CO`), Issuing authority (`I:DOC:PP:IS`), Issue date (`I:DOC:PP:ISS`), Expiry date (`I:DOC:PP:EXP`), Passport type (`I:DOC:PP:TY`), Nationality (`I:DOC:PP:NA`).

[Detailed classification guide](Passport/README.md) · [Definition](Passport/index.json).
