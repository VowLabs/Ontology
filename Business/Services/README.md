# Services

Canonical code: `B:SV`. Definition: [index.json](index.json).
Parent: [Business](../README.md).

Business services are service offerings aimed at business and organizational
customers. This includes companies and organizational procurement by public
bodies and nonprofits. The intended customer of the offering determines its
classification, not the provider's legal form, whether it charges money, or the
fact that people ultimately benefit.

## Boundary with Society / Services

[Society / Services (`R:SV`)](../../Society/Services/README.md) contains offerings
aimed at individuals and households. A provider may offer both consumer and
business services: personal banking belongs under Society, while a business
banking offering belongs here. Business training and an individual class are
similarly distinct offerings of the same underlying kind of activity.

Classify the service offering, not the provider or an incidental payer. An
employer reimbursing an employee's ordinary personal medical visit does not
change that consumer offering into a business offering. A health programme
contract offered to employers belongs under Workplace health services here.

Shared facts and artifacts retain their existing homes: Finance describes
financial products and facts; Health describes health information; `B:EMP`
describes employment. `B:C` describes products, offers, orders and fulfilment.
The same Commerce structures can describe a transaction for either branch.
`B:PRO` classifies professions, while named providers belong in reference data.

## Subclassifications

- [Accounting and payroll (`B:SV:AC`)](Accounting/README.md): Maintaining an organization’s accounts, payroll, tax administration and financial reporting. Examples: bookkeeping, payroll processing, accounts preparation and organizational tax compliance.
- [Human resources (`B:SV:HR`)](HumanResources/README.md): Helping an organization recruit, administer and support its workforce. Examples: recruitment, staffing, benefits administration and outsourced HR operations.
- [Marketing and sales support (`B:SV:MK`)](Marketing/README.md): Helping an organization research, reach and serve its market. Examples: advertising, market research, campaign management and outsourced sales operations.
- [IT operations (`B:SV:IT`)](InformationTechnology/README.md): Operating, maintaining or supporting an organization’s information systems. Examples: managed IT, business hosting, help desks and organizational cybersecurity operations.
- [Organizational legal and compliance (`B:SV:LG`)](LegalCompliance/README.md): Supporting an organization’s legal obligations, governance and regulatory compliance. Examples: corporate legal advice, compliance administration and company secretarial support.
- [Office and administrative support (`B:SV:AD`)](Administration/README.md): Performing routine administrative operations on behalf of an organization. Examples: document processing, reception, scheduling and outsourced customer support.
- [Facilities operations (`B:SV:FM`)](Facilities/README.md): Operating and maintaining premises used by an organization. Examples: workplace cleaning, facilities management and commercial building maintenance.
- [Procurement and supply-chain support (`B:SV:SC`)](SupplyChain/README.md): Helping an organization source, store and distribute operational inputs and outputs. Examples: procurement outsourcing, warehousing and distribution coordination.
- [Management and organizational advice (`B:SV:MC`)](Management/README.md): Advising or assisting an organization on its structure, strategy and operating processes. Examples: management consulting, process improvement and organizational change support.
- [Technical and quality assurance (`B:SV:TC`)](TechnicalAssurance/README.md): Specialist work that evaluates or supports the quality and suitability of an organization’s outputs or processes. Examples: product testing, engineering assessment, inspection and certification support.

- [Business financial services (`B:SV:FI`)](BusinessFinance/README.md): Financial service offerings aimed at businesses. Examples: business banking, merchant payment processing, business credit and treasury services.
- [Commercial insurance services (`B:SV:IN`)](CommercialInsurance/README.md): Insurance offerings aimed at business and organizational customers. Examples: commercial coverage, business insurance brokerage and corporate claims administration.
- [Workforce training (`B:SV:ED`)](WorkforceTraining/README.md): Education and training offerings marketed or supplied to businesses for their workforce. Examples: staff training, organizational learning programmes and employer-commissioned skills courses.
- [Workplace health services (`B:SV:HC`)](WorkplaceHealth/README.md): Health-service programmes offered to businesses for their workforce. Examples: occupational health contracts, employer health screening and workplace clinical services.
- [Workplace catering (`B:SV:FD`)](WorkplaceCatering/README.md): Food-service offerings aimed at business and organizational customers. Examples: staff canteen operation, office catering contracts and corporate event catering.

These are broad initial categories, not an exhaustive list of business
service offerings. Each category is currently a leaf without answer fields. Use the most
specific applicable function; classification grants no disclosure permission.
