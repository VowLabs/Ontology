# Native digital asset

Canonical code: `F:P:DA`. Definition: [index.json](index.json).

Natively digital instruments not better described by another product category. A tokenized share, bond, deposit or fund keeps its economic product classification; tokenization is a representation characteristic.

This branch covers native instruments that are not better described by another economic product type. Tokenization alone does not create a separate asset class: a tokenized bond is still a bond.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Unbacked cryptoasset — `F:P:DA:CR`

Native cryptoasset without a contractual claim on a reserve asset or issuer, such as bitcoin.

Bitcoin is an example of the intended category. A digital representation of an issuer-backed share, deposit or debt claim should instead retain that underlying classification.

No finer subclasses are currently defined.

[Detailed classification guide](Cryptoasset/README.md) · [Definition](Cryptoasset/index.json).

### Stablecoin — `F:P:DA:ST`

Digital token designed to track a reference value. Reserve structure, redemption rights and legal classification depend on the instrument.

Use for a token designed to track a reference value. Peg target, reserve assets, redemption rights and stabilization mechanism distinguish products within the category; the name does not guarantee stability or deposit status.

No finer subclasses are currently defined.

[Detailed classification guide](Stablecoin/README.md) · [Definition](Stablecoin/index.json).
