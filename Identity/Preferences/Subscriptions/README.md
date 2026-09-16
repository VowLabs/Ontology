# Account notifications

Canonical code: `I:PR:SUB`. Definition: [index.json](index.json).

Account notification settings pair the wallet account number with an enabled flag and a decimal-text threshold. Disabled and unanswered are distinct. The account reference is an identifier string here, even though F:AC:NO uses an integer.

Parent: [Preferences](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Person/index.json), [Organization identity (`I:O`)](../../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

Application management: Settings account notifications. The declared instance key is `accountNumber`.

## Fields

### Wallet account number — `I:PR:SUB:AC`

The field answers: “Which wallet account are these notifications for?”

Value type: [Identifier (`S:I:D:T:ID`)](../../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `accountNumber`.

[Field definition](Account.json).

### Notifications enabled — `I:PR:SUB:EN`

The field answers: “Should NokNok notify you about this account?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

SourceKey: `enabled`.

[Field definition](Enabled.json).

### Notification threshold — `I:PR:SUB:TH`

The field answers: “What is the balance notification threshold?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Required pattern: `^[0-9]+(?:\.[0-9]+)?$`.

Maximum length: `100`.

SourceKey: `threshold`.

[Field definition](Threshold.json).
