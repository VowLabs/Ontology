# Vehicle

Canonical code: `F:A:V`. Definition: [index.json](index.json).

Vehicle fields distinguish manufacturer and model, model year, VIN, registration plate and use. VIN and registration plate identify different things and may have different lifetimes; no universal VIN validation rule is declared here.

Parent: [Assets](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../../Identity/Person/index.json), [Organization identity (`I:O`)](../../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Make — `F:A:V:MK`

The field answers: “What is this vehicle’s make?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Make.json).

### Model — `F:A:V:MD`

The field answers: “What is this vehicle’s model?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Model.json).

### Model year — `F:A:V:Y`

The field answers: “What is this vehicle’s model year?”

Value type: [Integer (`S:I:D:T:I`)](../../../Science/Information/Data/Types/Integer.json); stored as `integer`.

Minimum value: `1886`.

Maximum value: `2200`.

[Field definition](Year.json).

### Vehicle identification number — `F:A:V:VIN`

The field answers: “What is this vehicle’s VIN?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](VIN.json).

### Registration plate — `F:A:V:REG`

The field answers: “What is this vehicle’s registration plate?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Registration.json).

### Usage — `F:A:V:USE`

The field answers: “How is this vehicle used?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `personal`, `commuting`, `business`, `mixed`, `other`.

[Field definition](Use.json).
