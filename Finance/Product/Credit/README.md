# Credit

Canonical code: `F:P:CR`. Definition: [index.json](index.json).

Borrowing and financing products, regardless of whether the provider is a bank.

The branches distinguish card-based credit, loans, reusable credit facilities, asset financing and trade financing. A lender’s institutional type is independent of the product’s function.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Credit card — `F:P:CR:CA`

Card-linked credit facility permitting borrowing for payments. A debit card instead accesses existing funds.

Example: a revolving card facility used for purchases with an available credit limit. The facility is classified here; a customer’s non-secret provider reference can remain in F:PI.

No finer subclasses are currently defined.

[Detailed classification guide](Card/README.md) · [Definition](Card/index.json).

### Charge card — `F:P:CR:CH`

Card facility generally requiring the statement balance to be paid in full each cycle.

Classify a card by its repayment arrangement rather than its appearance or network. A charge-card agreement generally calls for payment of the statement balance in full; individual offerings may include additional financing features.

No finer subclasses are currently defined.

[Detailed classification guide](ChargeCard/README.md) · [Definition](ChargeCard/index.json).

### Loan — `F:P:CR:LN`

Lending products with contractual repayment obligations. Purpose, collateral, interest basis and lender type are additional characteristics.

Mortgage and vehicle loans identify specific financed assets; education identifies a specific purpose. Personal and business loans cover other purposes. Buy-now-pay-later identifies purchase-linked deferred repayment. These navigation groups do not enumerate every combination of collateral and repayment terms.

Further classifications: Mortgage loan (`F:P:CR:LN:MO`), Personal loan (`F:P:CR:LN:PE`), Vehicle loan (`F:P:CR:LN:VE`), Education loan (`F:P:CR:LN:ED`), Business loan (`F:P:CR:LN:BU`), Buy now, pay later (`F:P:CR:LN:BN`).

[Detailed classification guide](Loan/README.md) · [Definition](Loan/index.json).

### Line of credit — `F:P:CR:LC`

Facility allowing borrowing up to an agreed limit, including overdrafts, home-equity lines and margin credit. Card facilities have their own categories.

Examples include an overdraft, home-equity line or margin borrowing facility. The defining feature is borrowing capacity up to a limit; specific card facilities use the Card or Charge card category.

No finer subclasses are currently defined.

[Detailed classification guide](LineOfCredit/README.md) · [Definition](LineOfCredit/index.json).

### Finance lease — `F:P:CR:LE`

Financing arrangement granting use of an asset for payments; distinct from a short-term operating rental.

Example: a financing arrangement for business equipment where payments secure use of the asset. The asset remains separately classifiable; an ordinary short-term rental is outside this product definition.

No finer subclasses are currently defined.

[Detailed classification guide](FinanceLease/README.md) · [Definition](FinanceLease/index.json).

### Trade and receivables finance — `F:P:CR:TF`

Products financing trade or receivables, including factoring, invoice finance and letters of credit.

Factoring and invoice finance concern receivables; letters of credit support trade obligations. They remain examples within one broad category in this release rather than separate canonical children.

No finer subclasses are currently defined.

[Detailed classification guide](TradeFinance/README.md) · [Definition](TradeFinance/index.json).
