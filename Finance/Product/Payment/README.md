# Payment

Canonical code: `F:P:PA`. Definition: [index.json](index.json).

Products providing payment access or stored value. Credit and charge cards are classified under Credit. Customer payment references remain at F:PI.

Debit cards access existing funds, prepaid cards spend prefunded value, and electronic money accounts hold issued payment value. Credit and charge cards are grouped under Credit because their financing arrangement is material.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Debit card — `F:P:PA:DC`

Payment card drawing on available account funds; an associated overdraft is a separate credit facility.

Example: a card used to spend funds in a current account. The card and account are separate products; any attached overdraft is separately classified as credit.

No finer subclasses are currently defined.

[Detailed classification guide](DebitCard/README.md) · [Definition](DebitCard/index.json).

### Prepaid card — `F:P:PA:PC`

Card used to spend prefunded value.

Example: a prefunded payment card. Reloadability and permitted use are offering characteristics; the category does not assert that the value is a bank deposit.

No finer subclasses are currently defined.

[Detailed classification guide](PrepaidCard/README.md) · [Definition](PrepaidCard/index.json).

### Electronic money account — `F:P:PA:EM`

Account holding issued electronic money for payments; not inherently a bank deposit or a cryptoasset.

Example: a payment account holding issued electronic money. The record does not automatically classify that balance as a bank deposit, cryptoasset or investment.

No finer subclasses are currently defined.

[Detailed classification guide](ElectronicMoney/README.md) · [Definition](ElectronicMoney/index.json).
