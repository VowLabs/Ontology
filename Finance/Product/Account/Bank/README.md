# Bank account

Canonical code: `F:P:AC:BA`. Definition: [index.json](index.json).

Deposit account products. Customer bank details remain at F:BA.

Choose the deposit arrangement: current/checking for transactions, savings for saving, term deposit for an agreed term, or money market deposit account. None of these names alone states deposit-protection eligibility.

Parent: [Account](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Current account — `F:P:AC:BA:CU`

Transaction deposit account, also called a checking account.

Example: an everyday checking account used for incoming wages and bill payments. An attached debit card is a payment product; an overdraft is a separate line of credit.

No finer subclasses are currently defined.

[Detailed classification guide](Current/README.md) · [Definition](Current/index.json).

### Savings account — `F:P:AC:BA:SA`

Deposit account primarily intended for saving.

Example: an on-demand savings deposit. Rate tiers, notice periods and withdrawal conditions describe individual offerings and are not separate subclasses in this version.

No finer subclasses are currently defined.

[Detailed classification guide](Savings/README.md) · [Definition](Savings/index.json).

### Term deposit — `F:P:AC:BA:TD`

Deposit for an agreed term, including non-negotiable certificates of deposit. Negotiable certificates are debt securities.

Example: a non-negotiable twelve-month deposit. Term length, early-withdrawal rules and interest basis describe the agreement; transferable deposit certificates belong under Debt security.

No finer subclasses are currently defined.

[Detailed classification guide](TermDeposit/README.md) · [Definition](TermDeposit/index.json).

### Money market deposit account — `F:P:AC:BA:MM`

Deposit account; distinct from a money market investment fund.

Use this category for a deposit account, not for fund units. A money market mutual fund belongs under Fund:Mutual even when both products have similar marketing names.

No finer subclasses are currently defined.

[Detailed classification guide](MoneyMarket/README.md) · [Definition](MoneyMarket/index.json).
