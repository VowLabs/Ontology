# Loan

Canonical code: `F:P:CR:LN`. Definition: [index.json](index.json).

Lending products with contractual repayment obligations. Purpose, collateral, interest basis and lender type are additional characteristics.

Mortgage and vehicle loans identify specific financed assets; education identifies a specific purpose. Personal and business loans cover other purposes. Buy-now-pay-later identifies purchase-linked deferred repayment. These navigation groups do not enumerate every combination of collateral and repayment terms.

Parent: [Credit](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../../docs/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Mortgage loan — `F:P:CR:LN:MO`

Loan secured by real property, including residential and commercial mortgages; not restricted to bank lenders.

Examples include a residential home-purchase mortgage or a commercial-property mortgage. Fixed versus floating rates and first versus later security priority are additional terms. A security backed by mortgage loans belongs under Investment:Debt security:Asset-backed security.

No finer subclasses are currently defined.

[Detailed classification guide](Mortgage/README.md) · [Definition](Mortgage/index.json).

### Personal loan — `F:P:CR:LN:PE`

Loan for personal use, excluding the more specific mortgage, vehicle and education categories.

Example: an installment loan for general personal expenses. Use the more specific mortgage, vehicle or education category when appropriate; secured versus unsecured is an additional characteristic.

No finer subclasses are currently defined.

[Detailed classification guide](Personal/README.md) · [Definition](Personal/index.json).

### Vehicle loan — `F:P:CR:LN:VE`

Loan to finance a vehicle purchase.

Example: a loan used to buy a car. The car itself can have a Vehicle asset record at F:A:V, while a finance lease is classified separately under Credit.

No finer subclasses are currently defined.

[Detailed classification guide](Vehicle/README.md) · [Definition](Vehicle/index.json).

### Education loan — `F:P:CR:LN:ED`

Loan to finance education, also called a student loan.

Example: borrowing for tuition or other education costs. Public or private lender, repayment schedule and subsidy arrangements do not create additional child codes here.

No finer subclasses are currently defined.

[Detailed classification guide](Education/README.md) · [Definition](Education/index.json).

### Business loan — `F:P:CR:LN:BU`

Loan for business purposes, excluding loans more specifically classified by collateral or structure.

Example: a business term loan for working capital. A reusable borrowing limit is a Line of credit, and a loan specifically secured by real property can be classified as a Mortgage loan.

No finer subclasses are currently defined.

[Detailed classification guide](Business/README.md) · [Definition](Business/index.json).

### Buy now, pay later — `F:P:CR:LN:BN`

Purchase financing with deferred or installment repayments.

Example: a purchase split into deferred installments at checkout. Fees, interest and number of installments describe the particular agreement rather than defining additional subclasses.

No finer subclasses are currently defined.

[Detailed classification guide](BuyNowPayLater/README.md) · [Definition](BuyNowPayLater/index.json).
