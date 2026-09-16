# Wallet accounts

Canonical code: `F:AC`. Definition: [index.json](index.json).

Managed wallet accounts record an application account number, display name, address, chain ID and derivation path. They are distinct from deposit-account products and from a minimal network/address reference.

Parent: [Finance](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal identity (`I:P`)](../../Identity/Person/index.json), [Organization identity (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

Application management: Wallet accounts. The declared instance key is `accountNumber`.

Private handling is required by this definition (`PrivateRequired: true`).

## Fields

### Account name — `F:AC:N`

The field answers: “What is this account name?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `name`.

[Field definition](Name.json).

### Account number — `F:AC:NO`

The field answers: “What is this account number?”

Value type: [Integer (`S:I:D:T:I`)](../../Science/Information/Data/Types/Integer.json); stored as `integer`.

SourceKey: `accountNumber`.

[Field definition](Number.json).

### Wallet address — `F:AC:A`

The field answers: “What is this wallet address?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

SourceKey: `address`.

[Field definition](Address.json).

### Chain ID — `F:AC:CH`

The field answers: “What is this chain id?”

Value type: [Integer (`S:I:D:T:I`)](../../Science/Information/Data/Types/Integer.json); stored as `integer`.

SourceKey: `chainId`.

[Field definition](Chain.json).

### Derivation path — `F:AC:DP`

The field answers: “What is this derivation path?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

SourceKey: `derivationPath`.

[Field definition](DerivationPath.json).
