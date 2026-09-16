# Insurance policy

Canonical code: `B:IN`. Definition: [index.json](index.json).

Insurance policy records describe an actual policy using type, provider, policy number and expiry date. The policy type choices are the existing broad record vocabulary; the more detailed product taxonomy at F:P:IS does not silently replace them.

Parent: [Business](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json), [Organization identity (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Policy type — `B:IN:T`

The field answers: “What type of insurance is this?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `motor`, `home`, `health`, `life`, `business`, `other`.

[Field definition](Type.json).

### Provider — `B:IN:P`

The field answers: “Who provides this policy?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Provider.json).

### Policy number — `B:IN:N`

The field answers: “What is the policy number?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Number.json).

### Expiry date — `B:IN:END`

The field answers: “When does this policy expire?”

Value type: [Calendar date (`S:I:D:T:DT`)](../../Science/Information/Data/Types/Date.json); stored as `string`.

Format: `date`.

[Field definition](Expiry.json).
