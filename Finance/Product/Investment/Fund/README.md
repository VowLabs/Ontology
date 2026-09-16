# Fund

Canonical code: `F:P:IN:FU`. Definition: [index.json](index.json).

Interests in pooled investment vehicles. Strategy, underlying assets and legal form are additional characteristics.

Classify the investor’s fund interest rather than each asset in the portfolio. Exchange-traded, mutual, closed-end and private are navigation categories; strategy such as money market, real estate or private equity is a separate characteristic.

Parent: [Investment](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Mutual fund — `F:P:IN:FU:MF`

Interests in an open-ended pooled investment fund, excluding exchange-traded funds in this navigation taxonomy.

Example: a non-exchange-traded open-ended equity or money market fund. Open-ended structure belongs here, while a fund traded as an ETF uses the Exchange-traded fund branch.

No finer subclasses are currently defined.

[Detailed classification guide](Mutual/README.md) · [Definition](Mutual/index.json).

### Exchange-traded fund — `F:P:IN:FU:ET`

Fund interests traded on an exchange. Exchange trading does not determine the underlying asset class.

Examples include equity, bond or real-estate ETFs. Exchange trading is the navigation criterion; index tracking, active management and asset exposure are additional characteristics.

No finer subclasses are currently defined.

[Detailed classification guide](ExchangeTraded/README.md) · [Definition](ExchangeTraded/index.json).

### Closed-end fund — `F:P:IN:FU:CE`

Interests in a closed-ended investment fund.

Use for interests in a closed-ended investment vehicle. A stock-exchange listing does not by itself make a closed-end fund an ETF; follow the actual product structure.

No finer subclasses are currently defined.

[Detailed classification guide](ClosedEnd/README.md) · [Definition](ClosedEnd/index.json).

### Private fund — `F:P:IN:FU:PF`

Privately offered pooled investment interests, including private equity, venture capital, private credit and hedge funds.

Examples include private equity, venture capital, private credit and hedge funds offered privately. Those strategies are examples rather than distinct child definitions. A directly owned private-company share belongs under Stock.

No finer subclasses are currently defined.

[Detailed classification guide](Private/README.md) · [Definition](Private/index.json).
