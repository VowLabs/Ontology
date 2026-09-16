# Bank account

Canonical code: `F:BA`. Definition: [index.json](index.json).

Bank account records identify a particular account using holder, bank, identifier scheme and identifier. The bank’s name is not an identifier scheme. Account product types such as savings and current accounts are classified separately under F:P:AC:BA.

Parent: [Finance](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json), [Organization identity (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Account holder — `F:BA:H`

The field answers: “What is the account holder’s name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Holder.json).

### Bank — `F:BA:B`

The field answers: “What is the bank’s name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Bank.json).

### Identifier scheme — `F:BA:S`

The field answers: “Which account identifier scheme applies?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Scheme.json).

### Account identifier — `F:BA:ID`

The field answers: “What is the account identifier?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Identifier.json).
