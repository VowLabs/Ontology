# Commerce

Canonical code: `B:C`. Definition: [index.json](index.json).

Commerce separates catalogue objects, proposals, transaction lifecycle records, customer relationships and delegated purchasing. A product describes what is offered; an offer is a proposal, a checkout a proposed transaction and an order a resulting order record. Fulfillment, order events and financial settlement are separate concepts.

Parent: [Business](../README.md).

## Subclassifications

### Merchant — `B:C:M`

A person or organization acting as a seller. Membership in a directory does not attest legal identity.

Record fields: Record identifier (`B:C:M:ID`), Status (`B:C:M:ST`), Business name (`B:C:M:N`), Wallet address (`B:C:M:W`), Website (`B:C:M:U`).

[Detailed classification guide](Merchant/README.md) · [Definition](Merchant/index.json).

### Merchant list — `B:C:ML`

A directory or owner-maintained collection of merchant references.

Record fields: List identifier (`B:C:ML:ID`), List name (`B:C:ML:N`).

[Detailed classification guide](MerchantList/README.md) · [Definition](MerchantList/index.json).

### Offer — `B:C:O`

A merchant proposal to supply goods or services; separate from the underlying product.

Record fields: Record identifier (`B:C:O:ID`), Status (`B:C:O:ST`), Merchant identifier (`B:C:O:M`), Title (`B:C:O:T`), Description (`B:C:O:D`), Acceptance URL (`B:C:O:U`), Image URL (`B:C:O:I`).

[Detailed classification guide](Offer/README.md) · [Definition](Offer/index.json).

### Order — `B:C:OR`

An order for goods or services.

Record fields: Record identifier (`B:C:OR:ID`), Status (`B:C:OR:ST`).

[Detailed classification guide](Order/README.md) · [Definition](Order/index.json).

### Order line — `B:C:OL`

One line of an order or checkout.

Record fields: Record identifier (`B:C:OL:ID`), Status (`B:C:OL:ST`).

[Detailed classification guide](OrderLine/README.md) · [Definition](OrderLine/index.json).

### Product — `B:C:P`

A catalogued good or service.

Record fields: Record identifier (`B:C:P:ID`), Status (`B:C:P:ST`), Name (`B:C:P:N`).

[Detailed classification guide](Product/README.md) · [Definition](Product/index.json).

### Checkout — `B:C:CK`

A checkout session and its proposed transaction.

Record fields: Record identifier (`B:C:CK:ID`), Status (`B:C:CK:ST`).

[Detailed classification guide](Checkout/README.md) · [Definition](Checkout/index.json).

### Fulfillment — `B:C:FU`

Delivery or fulfillment of an order.

Record fields: Record identifier (`B:C:FU:ID`), Status (`B:C:FU:ST`).

[Detailed classification guide](Fulfillment/README.md) · [Definition](Fulfillment/index.json).

### Wishlist — `B:C:WL`

A collection of desired products.

Record fields: Record identifier (`B:C:WL:ID`), Status (`B:C:WL:ST`).

[Detailed classification guide](Wishlist/README.md) · [Definition](Wishlist/index.json).

### Sale intent — `B:C:SI`

A proposed sale and its satisfaction conditions.

Record fields: Record identifier (`B:C:SI:ID`), Status (`B:C:SI:ST`).

[Detailed classification guide](SaleIntent/README.md) · [Definition](SaleIntent/index.json).

### Offer response — `B:C:OA`

Acceptance or decline of an offer by a user.

Record fields: Record identifier (`B:C:OA:ID`), Status (`B:C:OA:ST`).

[Detailed classification guide](OfferResponse/README.md) · [Definition](OfferResponse/index.json).

### Merchant enrollment — `B:C:ME`

Enrollment of a merchant in a project or program.

Record fields: Record identifier (`B:C:ME:ID`), Status (`B:C:ME:ST`).

[Detailed classification guide](MerchantEnrollment/README.md) · [Definition](MerchantEnrollment/index.json).

### Customer profile — `B:C:CP`

Customer information maintained for a commerce relationship.

Record fields: Record identifier (`B:C:CP:ID`), Status (`B:C:CP:ST`).

[Detailed classification guide](CustomerProfile/README.md) · [Definition](CustomerProfile/index.json).

### Onboarding — `B:C:ON`

An application or onboarding workflow.

Record fields: Record identifier (`B:C:ON:ID`), Status (`B:C:ON:ST`).

[Detailed classification guide](Onboarding/README.md) · [Definition](Onboarding/index.json).

### Membership — `B:C:MB`

Membership in a commercial program.

Record fields: Record identifier (`B:C:MB:ID`), Status (`B:C:MB:ST`).

[Detailed classification guide](Membership/README.md) · [Definition](Membership/index.json).

### Support request — `B:C:SU`

An inquiry or request for support.

Record fields: Record identifier (`B:C:SU:ID`), Status (`B:C:SU:ST`).

[Detailed classification guide](SupportRequest/README.md) · [Definition](SupportRequest/index.json).

### Newsletter subscription — `B:C:NS`

Consent and delivery details for a newsletter.

Record fields: Record identifier (`B:C:NS:ID`), Status (`B:C:NS:ST`).

[Detailed classification guide](NewsletterSubscription/README.md) · [Definition](NewsletterSubscription/index.json).

### Recruiter — `B:C:RC`

A recruiter participating in merchant acquisition.

Record fields: Record identifier (`B:C:RC:ID`), Status (`B:C:RC:ST`).

[Detailed classification guide](Recruiter/README.md) · [Definition](Recruiter/index.json).

### Recruiter assignment — `B:C:RA`

Assignment of a merchant to a recruiter.

Record fields: Record identifier (`B:C:RA:ID`), Status (`B:C:RA:ST`).

[Detailed classification guide](RecruiterAssignment/README.md) · [Definition](RecruiterAssignment/index.json).

### Menu — `B:C:MN`

An ordered collection of products offered by a merchant.

Record fields: Record identifier (`B:C:MN:ID`), Status (`B:C:MN:ST`).

[Detailed classification guide](Menu/README.md) · [Definition](Menu/index.json).

### Merchant category — `B:C:MT`

A classification of merchant business activity.

Record fields: Record identifier (`B:C:MT:ID`), Status (`B:C:MT:ST`).

[Detailed classification guide](MerchantCategory/README.md) · [Definition](MerchantCategory/index.json).

### Purchase mandate — `B:C:PM`

Delegated purchase authority. Classification does not grant authority.

Record fields: Record identifier (`B:C:PM:ID`), Status (`B:C:PM:ST`).

[Detailed classification guide](PurchaseMandate/README.md) · [Definition](PurchaseMandate/index.json).

### Mandate use — `B:C:MU`

A recorded exercise of delegated purchase authority.

Record fields: Record identifier (`B:C:MU:ID`), Status (`B:C:MU:ST`).

[Detailed classification guide](MandateUse/README.md) · [Definition](MandateUse/index.json).

### Mandate reservation — `B:C:MR`

A reservation against a purchase mandate.

Record fields: Record identifier (`B:C:MR:ID`), Status (`B:C:MR:ST`).

[Detailed classification guide](MandateReservation/README.md) · [Definition](MandateReservation/index.json).

### Order event — `B:C:OE`

An event in an order lifecycle.

Record fields: Record identifier (`B:C:OE:ID`), Status (`B:C:OE:ST`).

[Detailed classification guide](OrderEvent/README.md) · [Definition](OrderEvent/index.json).
