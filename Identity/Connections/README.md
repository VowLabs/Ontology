# Connect contacts

Canonical code: `I:CN`. Definition: [index.json](index.json).

Connect contacts pair a username and preferred display name with a wallet address and witness flag. Witness status is stored application metadata; the classification itself does not validate an attestation.

Parent: [Identity](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../Person/index.json), [Organization identity (`I:O`)](../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

Application management: Connect contacts. The declared instance key is `walletAddress`.

## Fields

### Username — `I:CN:U`

The field answers: “What is this username?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `username`.

[Field definition](Username.json).

### Preferred name — `I:CN:PN`

The field answers: “What is this preferred name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `displayName`.

[Field definition](PreferredName.json).

### Wallet address — `I:CN:A`

The field answers: “What is this wallet address?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `walletAddress`.

[Field definition](Address.json).

### Witness status — `I:CN:W`

The field answers: “What is this witness status?”

Value type: [Boolean (`S:I:D:T:B`)](../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

SourceKey: `isWitness`.

[Field definition](Witness.json).
