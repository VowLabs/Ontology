# Contact

Canonical code: `I:C`. Definition: [index.json](index.json). Parent: [Identity](../README.md).

`Collection: true`, `Composite: false` allows repeatable independent contact channels for a person (`I:P`) or
organization (`I:O`). Choose an individual field, such as Electronic mail. Each channel can have multiple
values; no unrelated contact fields are required in its form. All fields are optional; unanswered does not mean unavailable.
`Scalar: false` permits multiple records, each with its own ID and one record
Label (for example, Home or Work). Label is metadata, not a second answer field.
The former `I:C:P` record maps to `I:C`; its `N` answer is archived and becomes
record.label only if the record did not already have a label. Signed statements
remain unchanged and use historical definitions for verification.

Contact describes communication methods for reaching the subject, not people
with whom the subject is in contact.

## Direct fields

### Electronic mail — `I:C:EM`

The field answers: “What is the email address?”

Value type: [Email address (`S:I:D:T:EM`)](../../Science/Information/Data/Types/Email.json); stored as `string`.

Format: `email`.

Maximum length: `254`.

[Field definition](Email.json).

### Phone — `I:C:PH`

The field answers: “What is the international phone number?”

Value type: [International phone number (`S:I:D:T:PH`)](../../Science/Information/Data/Types/Phone.json); stored as `string`.

Required pattern: `^\+[1-9][0-9]{1,14}$`.

[Field definition](Phone.json).

### Website — `I:C:URL`

The field answers: “What is the website address?”

Value type: [Web address (`S:I:D:T:URL`)](../../Science/Information/Data/Types/URL.json); stored as `string`.

Format: `url`.

Maximum length: `2000`.

[Field definition](Website.json).

### Calendar booking — `I:C:BOOK`

A web page where someone can request or schedule an appointment with the subject,
whether a person (`I:P`) or organization (`I:O`). Examples include a Calendly or
Cal.com booking page, or an organization's own appointment scheduling page such
as `https://example.org/appointments`.

The field answers: “What is the link to your appointment booking page?”

Value type: [Web address (`S:I:D:T:URL`)](../../Science/Information/Data/Types/URL.json); stored as `string`.

Format: `url`.

Maximum length: `2000`.

This optional scalar field contains one booking-page URL per contact.
Separate contact records can represent personal and work booking pages.
General homepages belong in Website (`I:C:URL`); calendar subscription feeds,
individual event links and meeting join links are outside this field's scope.
The URL does not describe availability or confirm a reservation, and formatting
validation does not verify ownership or that the page accepts bookings.
No finer subclasses exist.

[Field definition](Booking.json).

## Related records

### Social media — `I:C:SM`

Social media is a contact method pairing a service ID with the subject’s identifier on that service, including messaging services. It describes how to reach the subject, not a person in their address book. Shared service names, icons and URL templates belong to S:T:SV; usernames and phone identifiers belong to this record.

Record fields: Service (`I:C:SM:S`), Identifier (`I:C:SM:ID`).

[Detailed classification guide](Social/README.md) · [Definition](Social/index.json).

### Address — `I:C:AD`

A typed reference delegated to Geo through `Type: S:G:AD`. It does not redeclare
Collection or Composite; the referenced Geo definition owns the structure, and
applications decide how many records to retain. Choose a
country-specific format; the record is stored under that Geo format's canonical
code. No address fields are duplicated here. Shipping is the canonical tag
`S:G:AD:RO:SH`; it can be selected in Tags and qualifies the address for checkout.

Emergency is a flag on a saved NokNok person contact, not a communication-method
subtype. Earlier emergency-person records are retained as read-only application
history; they are not silently matched to wallet contacts.
