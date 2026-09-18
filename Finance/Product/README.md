# Product

Canonical code: `F:P`. Definition: [index.json](index.json).

Financial product types, organized by economic function rather than provider. These are classification concepts, not customer records or statements of ownership. Categories are extensible and do not imply regulatory status or eligibility.

The product tree organizes economic function rather than provider: accounts, credit, investments, payments, insurance, retirement and native digital assets. Classify a mortgage as a credit loan and stock as investment equity even when both are distributed by the same bank.

Parent: [Finance](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Account — `F:P:AC`

Account products for holding deposits, investments or assets. Credit facilities are classified under Credit; tax and retirement wrappers under Retirement.

Classify the account separately from what it holds. A brokerage account can contain stocks and funds without becoming either product type. Retirement-specific wrappers are grouped under Retirement.

Further classifications: Bank account (`F:P:AC:BA`), Brokerage account (`F:P:AC:BR`), Custody account (`F:P:AC:CU`).

[Detailed classification guide](Account/README.md) · [Definition](Account/index.json).

### Credit — `F:P:CR`

Borrowing and financing products, regardless of whether the provider is a bank.

The branches distinguish card-based credit, loans, reusable credit facilities, asset financing and trade financing. A lender’s institutional type is independent of the product’s function.

Further classifications: Credit card (`F:P:CR:CA`), Charge card (`F:P:CR:CH`), Loan (`F:P:CR:LN`), Line of credit (`F:P:CR:LC`), Finance lease (`F:P:CR:LE`), Trade and receivables finance (`F:P:CR:TF`).

[Detailed classification guide](Credit/README.md) · [Definition](Credit/index.json).

### Investment — `F:P:IN`

Instruments and pooled investment interests. Classify the instrument separately from the account or wrapper holding it.

Choose the instrument or investment interest: equity ownership, transferable debt, a pooled fund interest, a derivative contract or a structured payoff. The account holding it and the investor’s tax wrapper are separate.

Further classifications: Equity (`F:P:IN:EQ`), Debt security (`F:P:IN:DE`), Fund (`F:P:IN:FU`), Derivative (`F:P:IN:DR`), Structured investment (`F:P:IN:ST`).

[Detailed classification guide](Investment/README.md) · [Definition](Investment/index.json).

### Payment — `F:P:PA`

Products providing payment access or stored value. Credit and charge cards are classified under Credit. Customer payment references remain at F:PI.

Debit cards access existing funds, prepaid cards spend prefunded value, and electronic money accounts hold issued payment value. Credit and charge cards are grouped under Credit because their financing arrangement is material.

Further classifications: Debit card (`F:P:PA:DC`), Prepaid card (`F:P:PA:PC`), Electronic money account (`F:P:PA:EM`).

[Detailed classification guide](Payment/README.md) · [Definition](Payment/index.json).

### Insurance — `F:P:IS`

Risk coverage contracts. Product types are distinct from customer insurance enquiry records at B:IN.

Coverage groups describe the protection or benefit provided. Motor and travel products can combine several coverages, so these navigation categories need not be mutually exclusive. Customer policy records remain at B:IN.

Further classifications: Life insurance (`F:P:IS:LI`), Health insurance (`F:P:IS:HE`), Disability and income protection (`F:P:IS:DI`), Property insurance (`F:P:IS:PR`), Liability insurance (`F:P:IS:LA`), Motor insurance (`F:P:IS:MO`), Travel insurance (`F:P:IS:TR`), Annuity (`F:P:IS:AN`).

[Detailed classification guide](Insurance/README.md) · [Definition](Insurance/index.json).

### Retirement — `F:P:RE`

Retirement arrangements and wrappers. Classify underlying funds, stocks, deposits and annuities separately; legal and tax treatment is jurisdiction-specific.

Retirement groups arrangements and wrappers rather than their underlying investments. The same retirement account may hold deposits, shares, funds or annuities, each with a separate economic classification.

Further classifications: Pension arrangement (`F:P:RE:PE`), Retirement account (`F:P:RE:AC`).

[Detailed classification guide](Retirement/README.md) · [Definition](Retirement/index.json).

### Native digital asset — `F:P:DA`

Natively digital instruments not better described by another product category. A tokenized share, bond, deposit or fund keeps its economic product classification; tokenization is a representation characteristic.

This branch covers native instruments that are not better described by another economic product type. Tokenization alone does not create a separate asset class: a tokenized bond is still a bond.

Further classifications: Unbacked cryptoasset (`F:P:DA:CR`), Stablecoin (`F:P:DA:ST`).

[Detailed classification guide](DigitalAsset/README.md) · [Definition](DigitalAsset/index.json).
