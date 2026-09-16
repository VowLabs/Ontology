# Stock

Canonical code: `F:P:IN:EQ:ST`. Definition: [index.json](index.json).

Company shares, also called stocks. Listing venue and public or private status are additional characteristics.

Common and preferred stock are distinguished by the rights of the share class. The particular issue determines voting, dividend, conversion and priority terms. A fund holding stocks is classified as a fund interest.

Parent: [Equity](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Common stock — `F:P:IN:EQ:ST:CO`

Ordinary shares representing equity ownership.

Example: an ordinary share in a listed or privately held company. Voting rights and dividends depend on the issue; the category does not assert a guaranteed dividend or one vote per share.

No finer subclasses are currently defined.

[Detailed classification guide](Common/README.md) · [Definition](Common/index.json).

### Preferred stock — `F:P:IN:EQ:ST:PR`

Preference shares with specified priority or rights; terms vary by issue.

Example: a preference share with specified dividend or liquidation priority. Cumulative, redeemable and convertible features describe the share terms and are not separate child codes.

No finer subclasses are currently defined.

[Detailed classification guide](Preferred/README.md) · [Definition](Preferred/index.json).
