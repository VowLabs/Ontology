# Account

Canonical code: `F:P:AC`. Definition: [index.json](index.json).

Account products for holding deposits, investments or assets. Credit facilities are classified under Credit; tax and retirement wrappers under Retirement.

Classify the account separately from what it holds. A brokerage account can contain stocks and funds without becoming either product type. Retirement-specific wrappers are grouped under Retirement.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Bank account — `F:P:AC:BA`

Deposit account products. Customer bank details remain at F:BA.

Choose the deposit arrangement: current/checking for transactions, savings for saving, term deposit for an agreed term, or money market deposit account. None of these names alone states deposit-protection eligibility.

Further classifications: Current account (`F:P:AC:BA:CU`), Savings account (`F:P:AC:BA:SA`), Term deposit (`F:P:AC:BA:TD`), Money market deposit account (`F:P:AC:BA:MM`).

[Detailed classification guide](Bank/README.md) · [Definition](Bank/index.json).

### Brokerage account — `F:P:AC:BR`

Account used to hold and transact investments; the investments are classified separately.

Example: an investment account through which a customer buys and holds shares. The stock is classified under Equity:Stock; associated margin borrowing is a Line of credit.

No finer subclasses are currently defined.

[Detailed classification guide](Brokerage/README.md) · [Definition](Brokerage/index.json).

### Custody account — `F:P:AC:CU`

Account for safekeeping and administration of assets on behalf of a customer.

Example: a custodian account holding securities for an investor. Custody describes the safekeeping arrangement, while the securities retain their investment classifications.

No finer subclasses are currently defined.

[Detailed classification guide](Custody/README.md) · [Definition](Custody/index.json).
