# Derivative

Canonical code: `F:P:IN:DR`. Definition: [index.json](index.json).

Contracts whose value depends on an underlying asset, rate, index or event. Underlier and trading venue are separate characteristics.

The branches describe contract structures. Interest rates, currencies, equities, credit events and commodities are possible underliers, not parallel child branches in this version.

Parent: [Investment](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Option — `F:P:IN:DR:OP`

Contract granting a right, without an obligation, to transact or settle on specified terms.

Example: a call or put option over a share. Call/put direction, exercise style, expiry and strike are contract characteristics; the holder’s right is distinct from the underlying share itself.

No finer subclasses are currently defined.

[Detailed classification guide](Option/README.md) · [Definition](Option/index.json).

### Future — `F:P:IN:DR:FU`

Standardized futures contract for future delivery or settlement.

Example: a standardized exchange-traded commodity future. The contract is classified here rather than as physical ownership of its deliverable commodity.

No finer subclasses are currently defined.

[Detailed classification guide](Future/README.md) · [Definition](Future/index.json).

### Forward — `F:P:IN:DR:FW`

Bilateral contract for future delivery or settlement on agreed terms.

Example: a bilateral agreement to exchange currencies at a future date on agreed terms. Currency pair, settlement method and maturity describe the contract.

No finer subclasses are currently defined.

[Detailed classification guide](Forward/README.md) · [Definition](Forward/index.json).

### Swap — `F:P:IN:DR:SW`

Contract exchanging cash flows or exposures, including interest-rate, currency and credit-default swaps.

Examples include fixed-for-floating interest-rate swaps, currency swaps and credit-default swaps. The exposure being exchanged distinguishes arrangements within this broad contract category.

No finer subclasses are currently defined.

[Detailed classification guide](Swap/README.md) · [Definition](Swap/index.json).

### Contract for difference — `F:P:IN:DR:CF`

Contract settling differences in the value of an underlying reference.

Example: a contract settling the change in a referenced share price. The contract provides reference exposure without being classified as the underlying share.

No finer subclasses are currently defined.

[Detailed classification guide](ContractForDifference/README.md) · [Definition](ContractForDifference/index.json).

### Warrant — `F:P:IN:DR:WA`

Issued instrument granting a right to acquire or dispose of an underlying asset on specified terms.

Example: an issued warrant granting a right to buy shares on stated terms. Issuer, exercise price, maturity and underlying asset describe the warrant; it is not itself a stock holding.

No finer subclasses are currently defined.

[Detailed classification guide](Warrant/README.md) · [Definition](Warrant/index.json).
