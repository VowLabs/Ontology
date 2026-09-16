# Debt security

Canonical code: `F:P:IN:DE`. Definition: [index.json](index.json).

Transferable debt instruments. Direct borrowing facilities belong under Credit.

Debt securities are distinguished from bilateral loan facilities. Bond, bill and note names follow instrument terms and market usage; the ontology does not impose a universal maturity cutoff. Asset backing and negotiability help separate the more specific categories.

Parent: [Investment](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Bond — `F:P:IN:DE:BO`

Bond instruments; issuer sector, security, convertibility and coupon basis are additional characteristics.

Examples include government and corporate bonds. Issuer sector, fixed or floating coupon, security and convertibility are additional characteristics. A tokenized representation still uses the bond classification.

No finer subclasses are currently defined.

[Detailed classification guide](Bond/README.md) · [Definition](Bond/index.json).

### Bill — `F:P:IN:DE:BI`

Short-term debt security commonly issued at a discount, including treasury bills.

Example: a short-term treasury bill. The instrument’s issuer, term and discount convention describe the individual issue; this branch does not define a universal maximum term.

No finer subclasses are currently defined.

[Detailed classification guide](Bill/README.md) · [Definition](Bill/index.json).

### Note — `F:P:IN:DE:NO`

Debt notes other than products more specifically classified as structured investments.

Use for an instrument issued as a debt note when a more specific category does not fit. The word note in a marketing name is insufficient by itself: a packaged market-linked note is navigated under Structured investment.

No finer subclasses are currently defined.

[Detailed classification guide](Note/README.md) · [Definition](Note/index.json).

### Commercial paper — `F:P:IN:DE:CP`

Short-term corporate debt security.

Example: short-term paper issued to finance corporate working capital. Issuer, maturity and any guarantee belong to the issue’s terms rather than additional children here.

No finer subclasses are currently defined.

[Detailed classification guide](CommercialPaper/README.md) · [Definition](CommercialPaper/index.json).

### Negotiable certificate of deposit — `F:P:IN:DE:CD`

Transferable deposit certificate traded as a debt security; non-negotiable term deposits belong under bank accounts.

Negotiability is the boundary: the certificate is transferable as a debt instrument. A deposit held to an agreed term without such transferability belongs under Account:Bank account:Term deposit.

No finer subclasses are currently defined.

[Detailed classification guide](NegotiableCertificateOfDeposit/README.md) · [Definition](NegotiableCertificateOfDeposit/index.json).

### Asset-backed security — `F:P:IN:DE:AB`

Debt security backed by a pool of assets or receivables, including mortgage-backed securities.

Examples include securities backed by mortgages or other receivables. The security is distinct from the underlying borrower’s loan; asset pool and tranche terms describe the issue.

No finer subclasses are currently defined.

[Detailed classification guide](AssetBacked/README.md) · [Definition](AssetBacked/index.json).
