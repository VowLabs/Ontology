# Social media

Canonical code: `I:C:SM`. Definition: [index.json](index.json).

Social media is a contact method pairing a service ID with the subject’s identifier on that service, including messaging services. It describes how to reach the subject, not a person in their address book. Shared service names, icons and URL templates belong to S:T:SV; usernames and phone identifiers belong to this record.

Parent: [Contact](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Individual (`I:P`)](../../Person/index.json), [Organization (`I:O`)](../../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Service — `I:C:SM:S`

The field answers: “Which service is this account on?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Reference vocabulary: [Service (`S:T:SV`)](../../../Science/Technology/Service/index.json).

[Field definition](Service.json).

### Identifier — `I:C:SM:ID`

The field answers: “What username, phone number or other identifier does this service use?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Handle.json).
