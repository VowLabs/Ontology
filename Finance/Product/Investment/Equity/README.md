# Equity

Canonical code: `F:P:IN:EQ`. Definition: [index.json](index.json).

Ownership interests in an enterprise, including public and private equity.

Stock represents direct company shares, while a depositary receipt represents an interest in underlying shares through a receipt. Public listing and private ownership are additional characteristics, not separate branches.

Parent: [Investment](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Stock — `F:P:IN:EQ:ST`

Company shares, also called stocks. Listing venue and public or private status are additional characteristics.

Common and preferred stock are distinguished by the rights of the share class. The particular issue determines voting, dividend, conversion and priority terms. A fund holding stocks is classified as a fund interest.

Further classifications: Common stock (`F:P:IN:EQ:ST:CO`), Preferred stock (`F:P:IN:EQ:ST:PR`).

[Detailed classification guide](Stock/README.md) · [Definition](Stock/index.json).

### Depositary receipt — `F:P:IN:EQ:DR`

Receipt representing an interest in underlying shares, including ADRs and GDRs.

Examples include American and global depositary receipts. The receipt and its underlying share are related instruments; this category identifies the receipt rather than treating it as the underlying common share.

No finer subclasses are currently defined.

[Detailed classification guide](DepositaryReceipt/README.md) · [Definition](DepositaryReceipt/index.json).
