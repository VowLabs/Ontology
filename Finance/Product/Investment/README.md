# Investment

Canonical code: `F:P:IN`. Definition: [index.json](index.json).

Instruments and pooled investment interests. Classify the instrument separately from the account or wrapper holding it.

Choose the instrument or investment interest: equity ownership, transferable debt, a pooled fund interest, a derivative contract or a structured payoff. The account holding it and the investor’s tax wrapper are separate.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Equity — `F:P:IN:EQ`

Ownership interests in an enterprise, including public and private equity.

Stock represents direct company shares, while a depositary receipt represents an interest in underlying shares through a receipt. Public listing and private ownership are additional characteristics, not separate branches.

Further classifications: Stock (`F:P:IN:EQ:ST`), Depositary receipt (`F:P:IN:EQ:DR`).

[Detailed classification guide](Equity/README.md) · [Definition](Equity/index.json).

### Debt security — `F:P:IN:DE`

Transferable debt instruments. Direct borrowing facilities belong under Credit.

Debt securities are distinguished from bilateral loan facilities. Bond, bill and note names follow instrument terms and market usage; the ontology does not impose a universal maturity cutoff. Asset backing and negotiability help separate the more specific categories.

Further classifications: Bond (`F:P:IN:DE:BO`), Bill (`F:P:IN:DE:BI`), Note (`F:P:IN:DE:NO`), Commercial paper (`F:P:IN:DE:CP`), Negotiable certificate of deposit (`F:P:IN:DE:CD`), Asset-backed security (`F:P:IN:DE:AB`).

[Detailed classification guide](DebtSecurity/README.md) · [Definition](DebtSecurity/index.json).

### Fund — `F:P:IN:FU`

Interests in pooled investment vehicles. Strategy, underlying assets and legal form are additional characteristics.

Classify the investor’s fund interest rather than each asset in the portfolio. Exchange-traded, mutual, closed-end and private are navigation categories; strategy such as money market, real estate or private equity is a separate characteristic.

Further classifications: Mutual fund (`F:P:IN:FU:MF`), Exchange-traded fund (`F:P:IN:FU:ET`), Closed-end fund (`F:P:IN:FU:CE`), Private fund (`F:P:IN:FU:PF`).

[Detailed classification guide](Fund/README.md) · [Definition](Fund/index.json).

### Derivative — `F:P:IN:DR`

Contracts whose value depends on an underlying asset, rate, index or event. Underlier and trading venue are separate characteristics.

The branches describe contract structures. Interest rates, currencies, equities, credit events and commodities are possible underliers, not parallel child branches in this version.

Further classifications: Option (`F:P:IN:DR:OP`), Future (`F:P:IN:DR:FU`), Forward (`F:P:IN:DR:FW`), Swap (`F:P:IN:DR:SW`), Contract for difference (`F:P:IN:DR:CF`), Warrant (`F:P:IN:DR:WA`).

[Detailed classification guide](Derivative/README.md) · [Definition](Derivative/index.json).

### Structured investment — `F:P:IN:ST`

Packaged investments with contractually combined payoffs, such as structured notes and market-linked certificates. Record debt, deposit or derivative legal form separately.

Example: a note with a payoff linked to an index and specified protection or participation terms. This category describes the packaged payoff; its legal form and any embedded derivatives remain additional characteristics, and protection depends on the contract.

No finer subclasses are currently defined.

[Detailed classification guide](Structured/README.md) · [Definition](Structured/index.json).
