# Loan

Canonical code: `B:F:LN`. Definition: [index.json](index.json).

A record of loan terms associated with an individual or organization. These terms
can express a lending offer or borrowing request before a contract is agreed.
Saving, sharing, or attesting this record does not create an order, escrow funds,
or establish an outstanding debt. Execution and subsequent debt state are owned
by the selected marketplace and its contracts.

This answer-bearing record is distinct from `B:F:P:CR:LN`, the unchanged product
classification. Tags may classify a record using that product taxonomy. The
record contains no contract address, ABI, executable code, private key, or price
feed configuration. A separately versioned exchange binding interprets its terms.
There are no finer record subclasses; the children below are answer fields.

Fields can be omitted while drafting. The selected exchange binding must require
all fields needed for execution and reject unsupported rate bases, asset types,
terms, precision, or combinations. Never substitute absent collateral or rates
silently. `S`, `I`, and `B` below refer to String, Integer, and Boolean types under
`S:I:D:T`. All decimal quantities are strings; preserve their exact precision.

| Code | Field | Type | Meaning, units, applicability and constraints |
|---|---|---|---|
| `B:F:LN:SD` | Side | S | The subject’s proposed role. A lending offer supplies currency; a borrowing request supplies collateral. |
| `B:F:LN:AS` | Loan asset | S | Asset identifier, including its network where applicable. EVM execution uses eip155:<chain>/erc20:<address>; other identifiers may describe off-chain loans. |
| `B:F:LN:AM` | Face amount | S | Decimal amount in whole loan-asset units, never binary floating point. For a discount loan this is the maturity obligation, not the smaller initial advance. |
| `B:F:LN:TM` | Term in seconds | I | Elapsed duration, from 1 second to 30 ACT/365 years; a venue may accept only selected terms. One ACT/365 year is 31536000 seconds. |
| `B:F:LN:RB` | Rate basis | S | Discount deducts interest from the initial advance; simple adds interest to principal; compound accrues interest on accrued interest. A venue must explicitly support the selected basis. |
| `B:F:LN:RM` | Rate instruction | S | Limit constrains the annual rate; Market accepts the venue’s rate-discovery rules subject to execution review. This is an instruction, not an observed market price. |
| `B:F:LN:RT` | Annual rate percent | S | Annual nominal percentage with at most two decimal places, e.g. 10.25 means 10.25 percent (1025 basis points). A lender sets a minimum; a borrower sets a maximum. Market orders omit this or use zero. |
| `B:F:LN:CA` | Collateral asset | S | Collateral asset identifier. A borrowing request specifies it. A venue may allow a lender to omit it to accept any supported collateral; omission never means an unsecured borrowing request. |
| `B:F:LN:CQ` | Collateral quantity | S | Decimal quantity in whole collateral-asset units. Borrowers pledge a positive amount; lenders omit it or enter zero. |
| `B:F:LN:LV` | Maximum loan-to-value percent | S | Maximum advance divided by collateral valuation, expressed as a percentage. Execution requires greater than zero and less than 100; valuation authority belongs to the exchange and pricing system. |
| `B:F:LN:RS` | Allow resizing | B | True permits a smaller executable order when the exchange supports collateral-based resizing. It does not authorize an increased amount or changed rate limit. |

For example, a borrowing request can specify face amount `100`, term `31536000`,
Discount basis, Limit rate `10`, collateral quantity `200`, maximum LTV `60`,
and resizing `false`. The loan asset and collateral asset must be fully qualified
identifiers. For that discount convention the initial advance is 90 loan units,
subject to the exchange's rounding and collateral valuation. The definition
neither supplies nor verifies those valuations.

Boundary: an actual loan has counterparties, execution dates, repayments and an
outstanding obligation. This first terms schema does not assert those facts.
Commercial orders at `B:C:OR` and product classifications remain separate concepts.
