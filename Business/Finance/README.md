# Finance

Canonical code: `B:F`. Definition: [index.json](index.json).

Finance separates customer account and payment references, physical asset records, transaction records and financial product classifications. B:F:P describes product types; it does not replace the existing answer-bearing account records.

Parent: [Business (`B`)](../README.md).

## Subclassifications

### Bank account — `B:F:BA`

Bank account records identify a particular account using holder, bank, identifier scheme and identifier. The bank’s name is not an identifier scheme. Account product types such as savings and current accounts are classified separately under B:F:P:AC:BA.

Record fields: Account holder (`B:F:BA:H`), Bank (`B:F:BA:B`), Identifier scheme (`B:F:BA:S`), Account identifier (`B:F:BA:ID`).

[Detailed classification guide](BankAccount/README.md) · [Definition](BankAccount/index.json).

### Wallet address — `B:F:WA`

A wallet address record pairs the network with the address so the address can be interpreted in context. Managed wallet accounts, application account numbering and derivation metadata belong to consuming applications and are not active ontology definitions.

Record fields: Network (`B:F:WA:N`), Address (`B:F:WA:A`).

[Detailed classification guide](Wallet/README.md) · [Definition](Wallet/index.json).

### Payment instrument reference — `B:F:PI`

Payment instrument references describe an instrument held by a provider using a non-secret reference and optional last four digits. This schema is not a place for full card credentials, CVVs or authentication secrets.

Record fields: Provider (`B:F:PI:P`), Reference (`B:F:PI:R`), Last four digits (`B:F:PI:L4`).

[Detailed classification guide](PaymentInstrument/README.md) · [Definition](PaymentInstrument/index.json).

### Assets — `B:F:A`

Assets currently contain records for vehicles and real property. These describe individual assets rather than investment products; a fund investing in property belongs under B:F:P:IN:FU.

Further classifications: Vehicle (`B:F:A:V`), Property (`B:F:A:P`).

[Detailed classification guide](Assets/README.md) · [Definition](Assets/index.json).


### Invoice — `B:F:INV`

A financial transaction record.

An invoice represents a request or statement of payment due. Its identifier and application status distinguish it from an order, a settlement evidence record and a refund; amounts and line items remain in application-owned schemas.

Record fields: Record identifier (`B:F:INV:ID`), Status (`B:F:INV:ST`).

[Detailed classification guide](Invoice/README.md) · [Definition](Invoice/index.json).

### Settlement proof — `B:F:SP`

A financial transaction record.

A settlement proof record classifies evidence associated with settlement. The current fields identify the record and its application status; classification alone does not verify payment finality or cryptographic evidence.

Record fields: Record identifier (`B:F:SP:ID`), Status (`B:F:SP:ST`).

[Detailed classification guide](SettlementProof/README.md) · [Definition](SettlementProof/index.json).

### Refund — `B:F:RF`

A financial transaction record.

A refund record classifies a return of funds associated with a prior transaction. Its identity and lifecycle are separate from the original invoice or order; monetary details remain application-owned.

Record fields: Record identifier (`B:F:RF:ID`), Status (`B:F:RF:ST`).

[Detailed classification guide](Refund/README.md) · [Definition](Refund/index.json).

### Product — `B:F:P`

Financial product types, organized by economic function rather than provider. These are classification concepts, not customer records or statements of ownership. Categories are extensible and do not imply regulatory status or eligibility.

The product tree organizes economic function rather than provider: accounts, credit, investments, payments, insurance, retirement and native digital assets. Classify a mortgage as a credit loan and stock as investment equity even when both are distributed by the same bank.

Further classifications: Account (`B:F:P:AC`), Credit (`B:F:P:CR`), Investment (`B:F:P:IN`), Payment (`B:F:P:PA`), Insurance (`B:F:P:IS`), Retirement (`B:F:P:RE`), Native digital asset (`B:F:P:DA`).

[Detailed classification guide](Product/README.md) · [Definition](Product/index.json).

### Loan — `B:F:LN`

Editable loan terms for individuals and organizations, including lending offers
and borrowing requests. Separate from the product classification `B:F:P:CR:LN`.
Saving terms neither establishes debt nor submits an order. Fields cover side,
asset, face amount, term, rate basis and instruction, rate, collateral asset and
quantity, maximum LTV, and resizing. See [Loan](Loan/README.md) for all canonical
codes, types, units, examples, and execution boundaries.

### Personal — `B:F:PE`

Classifies individual and household financial affairs, such as budgeting and saving. These contexts reuse the shared financial records and products above; they do not create copies or imply ownership. [Guide](Personal/README.md). No finer subclasses or answer fields are currently defined.

### Corporate — `B:F:CO`

Classifies organizational financial affairs, such as treasury and financing. These contexts reuse the shared financial records and products above; they do not create copies or imply ownership. [Guide](Corporate/README.md). No finer subclasses or answer fields are currently defined.

### Public — `B:F:PU`

Classifies public-sector financial affairs, such as budgets and public debt. These contexts reuse the shared financial records and products above; they do not create copies or imply ownership. [Guide](Public/README.md). No finer subclasses or answer fields are currently defined.
