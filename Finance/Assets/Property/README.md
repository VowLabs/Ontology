# Property

Canonical code: `F:A:P`. Definition: [index.json](index.json).

Property fields distinguish a display label, address, occupancy and construction year. Occupancy describes how the property is used, not proof of title or the subject’s ownership share.

Parent: [Assets](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../../Identity/Person/index.json), [Organization identity (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Label — `F:A:P:N`

The field answers: “How do you identify this property?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Name.json).

### Address — `F:A:P:AD`

The field answers: “What is the property’s address?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Address.json).

### Occupancy — `F:A:P:O`

The field answers: “How is this property occupied?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `owner-occupied`, `rented`, `vacant`, `other`.

[Field definition](Occupancy.json).

### Year built — `F:A:P:Y`

The field answers: “In what year was this property built?”

Value type: [Integer (`S:I:D:T:I`)](../../../Science/Information/Data/Types/Integer.json); stored as `integer`.

Minimum value: `1`.

Maximum value: `2200`.

[Field definition](YearBuilt.json).
