# Motor insurance policy terms

Canonical code: `B:MP`. A repeatable proposed policy associated with an individual
or organization. It describes motor coverage to procure through underwriting,
including a reverse premium auction. It is distinct from the issued-policy record
`B:IN` and motor product classification `F:P:IS:MO`; neither is replaced. Saving
a draft creates no coverage, escrow or insurer obligation. There are no finer
subclasses; the children below are answer fields.

Fields may be absent in drafts. The exchange binding requires every field and
validates supported asset, precision, deadlines and bounds before materializing
an order. Decimal amounts must remain strings, never floating-point numbers.
The wording must explicitly cover a single claim terminating the policy, even
when denied, and the selected claims authority. Hashes do not establish legal
validity or possession of the underlying documents. Share documents privately
with underwriters and retain the salt needed to verify the vehicle commitment.

| Code | Field | Type | Meaning and constraints |
|---|---|---|---|
| `B:MP:VH` | Vehicle commitment | String | Salted 32-byte commitment identifying the privately disclosed vehicle; never a raw VIN. |
| `B:MP:WD` | Policy wording commitment | String | 32-byte content hash of agreed motor coverage wording, exclusions, jurisdiction, claims authority and single-claim termination terms. |
| `B:MP:AS` | Settlement asset | String | Fully qualified asset identifier, e.g. eip155:1/erc20:0x0000000000000000000000000000000000000001. |
| `B:MP:CV` | Coverage limit | String | Maximum net payout in settlement-asset units after deductible; exact decimal string. |
| `B:MP:DD` | Deductible | String | Loss paid by the holder before coverage applies, in settlement-asset units; exact decimal string. |
| `B:MP:PM` | Maximum premium | String | Maximum premium offered for the entire coverage term, in settlement-asset units; exact decimal string. |
| `B:MP:TM` | Coverage duration | Integer | Elapsed seconds of coverage beginning at auction settlement; at most one ACT/365 year. |
| `B:MP:CL` | Auction closing time | Integer | Unix timestamp in seconds at which underwriting bids close. Execution requires a future deadline within 30 days. |
| `B:MP:RW` | Claim reporting window | Integer | Seconds after coverage expiry during which a covered incident can still be reported; at most one ACT/365 year. |

Example: coverage `10000`, deductible `500`, maximum premium `300`, duration
`31536000`, reporting window `2592000`, and a future closing timestamp. Choose
an explicit settlement asset and nonzero commitments for the vehicle and policy
wording. Coverage and premium must be positive; a deductible can be zero.
The deductible is subtracted from approved gross loss, then payout is capped
at the coverage limit. The contract does not insure incidents before settlement.

This schema is an initial technical definition, not a claim of insurance-domain
or jurisdictional review. Execution rules live in the versioned exchange binding
and contract, not in executable ontology fields.
