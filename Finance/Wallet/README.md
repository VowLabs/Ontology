# Wallet address

Canonical code: `F:WA`. Definition: [index.json](index.json).

A wallet address record pairs the network with the address so the address can be interpreted in context. It differs from the managed wallet account record at F:AC, which also carries application account numbering and derivation metadata.

Parent: [Finance](../README.md).

## Record scope

Multiple records are permitted per subject (`Scalar: false`); each instance has its own stable record ID.

Applicable subjects: [Personal (`I:P`)](../../Identity/Person/index.json), [Organization (`I:O`)](../../Identity/Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Network — `F:WA:N`

The field answers: “Which network does this address belong to?”

Value type: [String (`S:I:D:T:S`)](../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

[Field definition](Network.json).

### Address — `F:WA:A`

The field answers: “What is the wallet address?”

Value type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json); stored as `string`.

Maximum length: `256`.

[Field definition](Address.json).
