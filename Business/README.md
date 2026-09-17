# Business

Canonical code: `B`. Definition: [index.json](index.json).

Business groups commercial workflows, employment records and insurance policy records. Finance remains separate so the same financial facts can be used in personal and commercial contexts.

Parent: [VowLabs ontology](../README.md).

## Subclassifications

### Insurance policy — `B:IN`

Insurance policy records describe an actual policy using type, provider, policy number and expiry date. The policy type choices are the existing broad record vocabulary; the more detailed product taxonomy at F:P:IS does not silently replace them.

Record fields: Policy type (`B:IN:T`), Provider (`B:IN:P`), Policy number (`B:IN:N`), Expiry date (`B:IN:END`).

[Detailed classification guide](Insurance/README.md) · [Definition](Insurance/index.json).

### Employment — `B:EMP`

Employment records pair an employer’s name with a role and start date. Separate records can describe multiple employments; this schema does not currently define an end date or employment-status enumeration.

Record fields: Employer (`B:EMP:O`), Role (`B:EMP:R`), Start date (`B:EMP:S`).

[Detailed classification guide](Employment/README.md) · [Definition](Employment/index.json).

### Commerce — `B:C`

Commerce separates catalogue objects, proposals, transaction lifecycle records, customer relationships and delegated purchasing. A product describes what is offered; an offer is a proposal, a checkout a proposed transaction and an order a resulting order record. Fulfillment, order events and financial settlement are separate concepts.

Further classifications: Merchant (`B:C:M`), Merchant list (`B:C:ML`), Offer (`B:C:O`), Order (`B:C:OR`), Order line (`B:C:OL`), Product (`B:C:P`), Checkout (`B:C:CK`), Fulfillment (`B:C:FU`), Wishlist (`B:C:WL`), Sale intent (`B:C:SI`), Offer response (`B:C:OA`), Merchant enrollment (`B:C:ME`), Customer profile (`B:C:CP`), Onboarding (`B:C:ON`), Membership (`B:C:MB`), Support request (`B:C:SU`), Newsletter subscription (`B:C:NS`), Recruiter (`B:C:RC`), Recruiter assignment (`B:C:RA`), Menu (`B:C:MN`), Merchant category (`B:C:MT`), Purchase mandate (`B:C:PM`), Mandate use (`B:C:MU`), Mandate reservation (`B:C:MR`), Order event (`B:C:OE`).

[Detailed classification guide](Commerce/README.md) · [Definition](Commerce/index.json).

### Profession — `B:PRO`

A profession is an occupation or skilled trade, separate from employer-specific employment and proof of qualifications. Named professions live in a service-hosted dataset.

[Definition guide](Professions/README.md) · [Dataset](../data/professions/README.md).
