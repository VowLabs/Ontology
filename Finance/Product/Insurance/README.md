# Insurance

Canonical code: `F:P:IS`. Definition: [index.json](index.json).

Risk coverage contracts. Product types are distinct from customer insurance enquiry records at B:IN.

Coverage groups describe the protection or benefit provided. Motor and travel products can combine several coverages, so these navigation categories need not be mutually exclusive. Customer policy records remain at B:IN.

Parent: [Product](../README.md).

## Classification scope

This is a product-type concept, not an answer-bearing customer record. Provider, jurisdiction, currency, legal terms and tokenization are additional characteristics; this node defines no fields for storing them.

See the [financial product guide](../../../_support/finance-products.md) for cross-category examples and compatibility with existing records.

## Subclassifications

### Life insurance — `F:P:IS:LI`

Coverage paying benefits under specified life or death conditions.

Examples include term life and permanent life policies. Term, savings elements, beneficiaries and payout conditions are policy terms; they are not separate child definitions in this release.

No finer subclasses are currently defined.

[Detailed classification guide](Life/README.md) · [Definition](Life/index.json).

### Health insurance — `F:P:IS:HE`

Coverage of specified healthcare costs or benefits.

Example: coverage reimbursing specified healthcare costs. Covered services, exclusions and provider arrangements describe the policy and are not claims about a person’s health record.

No finer subclasses are currently defined.

[Detailed classification guide](Health/README.md) · [Definition](Health/index.json).

### Disability and income protection — `F:P:IS:DI`

Coverage replacing income or paying benefits for qualifying disability or inability to work.

Example: a policy replacing some income during a qualifying inability to work. Eligibility, waiting periods, benefit duration and the definition of disability belong to policy terms.

No finer subclasses are currently defined.

[Detailed classification guide](Disability/README.md) · [Definition](Disability/index.json).

### Property insurance — `F:P:IS:PR`

Coverage for loss of or damage to property.

Example: coverage for damage to a building or its contents. The insured property can be described separately as an asset; the policy describes protection rather than ownership.

No finer subclasses are currently defined.

[Detailed classification guide](Property/README.md) · [Definition](Property/index.json).

### Liability insurance — `F:P:IS:LA`

Coverage for specified legal liabilities.

Example: public or professional liability coverage. Liability coverage concerns specified claims against the insured and differs from coverage of damage to the insured’s own property.

No finer subclasses are currently defined.

[Detailed classification guide](Liability/README.md) · [Definition](Liability/index.json).

### Motor insurance — `F:P:IS:MO`

Vehicle-related coverage that may combine property and liability protection.

Example: a motor policy combining liability and own-vehicle damage protection. Vehicle details belong to an asset record; the package’s coverage components depend on policy terms.

No finer subclasses are currently defined.

[Detailed classification guide](Motor/README.md) · [Definition](Motor/index.json).

### Travel insurance — `F:P:IS:TR`

Travel-related coverage that may combine medical, cancellation and other protections.

Example: a travel policy combining cancellation, baggage and medical coverage. Trip-specific and annual arrangements remain within this category; coverage details are separate terms.

No finer subclasses are currently defined.

[Detailed classification guide](Travel/README.md) · [Definition](Travel/index.json).

### Annuity — `F:P:IS:AN`

Contract providing payments under specified terms, including lifetime or fixed-period income. Retirement use is an additional characteristic.

Example: a contract paying income for a stated period or a lifetime. Fixed or variable benefits and immediate or deferred payments describe the contract. Retirement use does not turn the annuity into an account wrapper.

No finer subclasses are currently defined.

[Detailed classification guide](Annuity/README.md) · [Definition](Annuity/index.json).
