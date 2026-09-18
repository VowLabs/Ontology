# Retirement

Canonical code: `F:P:RE`. Definition: [index.json](index.json).

Retirement arrangements and wrappers. Classify underlying funds, stocks, deposits and annuities separately; legal and tax treatment is jurisdiction-specific.

Retirement groups arrangements and wrappers rather than their underlying investments. The same retirement account may hold deposits, shares, funds or annuities, each with a separate economic classification.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Pension arrangement — `F:P:RE:PE`

Retirement benefit arrangement, including defined-benefit and defined-contribution schemes.

Defined-benefit and defined-contribution schemes are examples within this broad category. Benefit rules, sponsors and local scheme types remain arrangement characteristics rather than published children.

No finer subclasses are currently defined.

[Detailed classification guide](Pension/README.md) · [Definition](Pension/index.json).

### Retirement account — `F:P:RE:AC`

Individual or employer-sponsored account with retirement-specific rules; local schemes are jurisdictional variants.

Use for an account with retirement-specific rules. Jurisdictional names and tax treatment are additional characteristics; the investments held inside retain their own product codes.

No finer subclasses are currently defined.

[Detailed classification guide](Account/README.md) · [Definition](Account/index.json).
