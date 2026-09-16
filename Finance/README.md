# Finance

Canonical code: `F`. Definition: [index.json](index.json).

Finance separates customer account and payment references, physical asset records, transaction records and financial product classifications. F:P describes product types; it does not replace the existing answer-bearing account records.

Parent: [NokNok ontology](../README.md).

## Subclassifications

### Bank account — `F:BA`

Bank account records identify a particular account using holder, bank, identifier scheme and identifier. The bank’s name is not an identifier scheme. Account product types such as savings and current accounts are classified separately under F:P:AC:BA.

Record fields: Account holder (`F:BA:H`), Bank (`F:BA:B`), Identifier scheme (`F:BA:S`), Account identifier (`F:BA:ID`).

[Detailed classification guide](BankAccount/README.md) · [Definition](BankAccount/index.json).

### Wallet address — `F:WA`

A wallet address record pairs the network with the address so the address can be interpreted in context. It differs from the managed wallet account record at F:AC, which also carries application account numbering and derivation metadata.

Record fields: Network (`F:WA:N`), Address (`F:WA:A`).

[Detailed classification guide](Wallet/README.md) · [Definition](Wallet/index.json).

### Payment instrument reference — `F:PI`

Payment instrument references describe an instrument held by a provider using a non-secret reference and optional last four digits. This schema is not a place for full card credentials, CVVs or authentication secrets.

Record fields: Provider (`F:PI:P`), Reference (`F:PI:R`), Last four digits (`F:PI:L4`).

[Detailed classification guide](PaymentInstrument/README.md) · [Definition](PaymentInstrument/index.json).

### Assets — `F:A`

Assets currently contain records for vehicles and real property. These describe individual assets rather than investment products; a fund investing in property belongs under F:P:IN:FU.

Further classifications: Vehicle (`F:A:V`), Property (`F:A:P`).

[Detailed classification guide](Assets/README.md) · [Definition](Assets/index.json).

### Wallet accounts — `F:AC`

Managed wallet accounts record an application account number, display name, address, chain ID and derivation path. They are distinct from deposit-account products and from a minimal network/address reference.

Record fields: Account name (`F:AC:N`), Account number (`F:AC:NO`), Wallet address (`F:AC:A`), Chain ID (`F:AC:CH`), Derivation path (`F:AC:DP`).

[Detailed classification guide](Accounts/README.md) · [Definition](Accounts/index.json).

### Invoice — `F:INV`

A financial transaction record.

An invoice represents a request or statement of payment due. Its identifier and application status distinguish it from an order, a settlement evidence record and a refund; amounts and line items remain in application-owned schemas.

Record fields: Record identifier (`F:INV:ID`), Status (`F:INV:ST`).

[Detailed classification guide](Invoice/README.md) · [Definition](Invoice/index.json).

### Settlement proof — `F:SP`

A financial transaction record.

A settlement proof record classifies evidence associated with settlement. The current fields identify the record and its application status; classification alone does not verify payment finality or cryptographic evidence.

Record fields: Record identifier (`F:SP:ID`), Status (`F:SP:ST`).

[Detailed classification guide](SettlementProof/README.md) · [Definition](SettlementProof/index.json).

### Refund — `F:RF`

A financial transaction record.

A refund record classifies a return of funds associated with a prior transaction. Its identity and lifecycle are separate from the original invoice or order; monetary details remain application-owned.

Record fields: Record identifier (`F:RF:ID`), Status (`F:RF:ST`).

[Detailed classification guide](Refund/README.md) · [Definition](Refund/index.json).

### Product — `F:P`

Financial product types, organized by economic function rather than provider. These are classification concepts, not customer records or statements of ownership. Categories are extensible and do not imply regulatory status or eligibility.

The product tree organizes economic function rather than provider: accounts, credit, investments, payments, insurance, retirement and native digital assets. Classify a mortgage as a credit loan and stock as investment equity even when both are distributed by the same bank.

Further classifications: Account (`F:P:AC`), Credit (`F:P:CR`), Investment (`F:P:IN`), Payment (`F:P:PA`), Insurance (`F:P:IS`), Retirement (`F:P:RE`), Native digital asset (`F:P:DA`).

[Detailed classification guide](Product/README.md) · [Definition](Product/index.json).
