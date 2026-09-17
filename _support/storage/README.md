# Classifying application records

[index.json](index.json) inventories record-family mappings for participating
applications. Each table or JSON record family maps to a canonical ontology
code. Applications retain their databases, primary keys, tables, JSON layouts,
user records, and access controls. The ontology server stores none of that data.

## Classification metadata

SQL adapters can use `ontology_code`, `ontology_version`, and `ontology_public`
to classify existing rows and future inserts. JSON adapters can use
`ontologyCode`, `ontologyVersion`, and `ontologyPublic`. Dictionaries of scalar
values may use an application-owned file-level mapping instead of changing each
value's shape.

Merchants are `B:C:M`, merchant lists `B:C:ML`, and merchant offers `B:C:O`.
Products, checkouts, orders, fulfillment, mandates, and support each have separate
record types. Internal challenges, jobs, cursors, and other operational records
also have classifications. Classification never grants disclosure permission.

Sensitive composite records can default to private. Public presentation of
selected fields remains an application-owned projection governed by that
application's access controls.

## Application adapters

Record-level classification does not replace an application's internal field
schema. Existing columns, embedded payloads, and signed protocol messages retain
their meaning. Field-level sharing adapters should map fields explicitly to
canonical definitions and preserve their existing access checks.

Adding a classified table requires an inventory entry and a corresponding
application-owned migration. Migrations should preserve record identities,
history, and existing fields, and should be safe to repeat. Publication and
visibility policies remain separate from schema classification.

## Validation

Validate the canonical definitions and API from the workspace root:

```sh
npm --prefix VowLabs/Ontology run validate
npm --prefix VowLabs/Ontology test
```

Workspace integration tools in `../tools/` can additionally check the inventory
against participating applications' schemas and exercise additive SQL migrations
in disposable PostgreSQL databases. These checks depend on the relevant
application checkouts, generated catalogues, and database tooling; they are not
requirements for running the standalone ontology API.

The storage migration test uses `ONTOLOGY_TEST_POSTGRES_URL` or
`postgresql://localhost/postgres`. It creates and removes disposable databases,
checking existing-row backfill, new-insert defaults, and repeat migration without
opening an application database.

## Deployment ownership

Each application owns its migration, backup, restart, and deployment procedure.
Keep executable rollout instructions with that application. Publishing a new
ontology version does not migrate application databases, publish private values,
or rebuild consuming clients automatically.

## Indexed application families

The storage inventory declares version `2.0.0`. This is the inventory’s own recorded version; it is not automatically rewritten when the ontology vocabulary expands. Tables and file patterns below classify record families, not new ontology subclasses.

### PriceEdge

Tables mapped by this inventory:

- `addresses` → Wallet accounts (`F:AC`, historical application schema).
- `consumer_onboarding_profiles` → [Onboarding (`B:C:ON`)](../../Business/Commerce/Onboarding/index.json).
- `contact_requests` → [Support request (`B:C:SU`)](../../Business/Commerce/SupportRequest/index.json).
- `customer_profiles` → [Customer profile (`B:C:CP`)](../../Business/Commerce/CustomerProfile/index.json).
- `funding_accounts` → [Bank account (`F:BA`)](../../Finance/BankAccount/index.json).
- `invoices` → [Invoice (`F:INV`)](../../Finance/Invoice/index.json).
- `memberships` → [Membership (`B:C:MB`)](../../Business/Commerce/Membership/index.json).
- `merchants` → [Merchant (`B:C:M`)](../../Business/Commerce/Merchant/index.json).
- `meta` → [Application configuration (`S:I:D:OP:CFG`)](../../Science/Information/Data/Operations/Configuration/index.json).
- `recruiter_assignments` → [Recruiter assignment (`B:C:RA`)](../../Business/Commerce/RecruiterAssignment/index.json).
- `recruiters` → [Recruiter (`B:C:RC`)](../../Business/Commerce/Recruiter/index.json).
- `signup_challenges` → [Authentication challenge (`S:I:D:OP:AU`)](../../Science/Information/Data/Operations/Authentication/index.json).
- `unit_webhook_events` → [Processed event (`S:I:D:OP:EV`)](../../Science/Information/Data/Operations/Event/index.json).

### PriceEdgeShop

Tables mapped by this inventory:

- `vendors` → [Merchant (`B:C:M`)](../../Business/Commerce/Merchant/index.json).
- `vendor_order_fulfillments` → [Fulfillment (`B:C:FU`)](../../Business/Commerce/Fulfillment/index.json).
- `vendor_order_emails` → [Outbound message (`S:I:D:OP:MSG`)](../../Science/Information/Data/Operations/Message/index.json).
- `products` → [Product (`B:C:P`)](../../Business/Commerce/Product/index.json).
- `newsletter_subscribers` → [Newsletter subscription (`B:C:NS`)](../../Business/Commerce/NewsletterSubscription/index.json).
- `support_requests` → [Support request (`B:C:SU`)](../../Business/Commerce/SupportRequest/index.json).
- `orders` → [Order (`B:C:OR`)](../../Business/Commerce/Order/index.json).
- `checkout_sessions` → [Checkout (`B:C:CK`)](../../Business/Commerce/Checkout/index.json).
- `terminal_orders` → [Checkout (`B:C:CK`)](../../Business/Commerce/Checkout/index.json).
- `customer_profiles` → [Customer profile (`B:C:CP`)](../../Business/Commerce/CustomerProfile/index.json).
- `wishlists` → [Wishlist (`B:C:WL`)](../../Business/Commerce/Wishlist/index.json).
- `shop_settings` → [Application configuration (`S:I:D:OP:CFG`)](../../Science/Information/Data/Operations/Configuration/index.json).

### VowCorp

Tables mapped by this inventory:

- `merchant_enrollments` → [Merchant enrollment (`B:C:ME`)](../../Business/Commerce/MerchantEnrollment/index.json).
- `sale_intents` → [Sale intent (`B:C:SI`)](../../Business/Commerce/SaleIntent/index.json).
- `purchase_mandates` → [Purchase mandate (`B:C:PM`)](../../Business/Commerce/PurchaseMandate/index.json).
- `mandate_uses` → [Mandate use (`B:C:MU`)](../../Business/Commerce/MandateUse/index.json).
- `offers` → [Offer (`B:C:O`)](../../Business/Commerce/Offer/index.json).
- `checkout_sessions` → [Checkout (`B:C:CK`)](../../Business/Commerce/Checkout/index.json).
- `checkout_lines` → [Order line (`B:C:OL`)](../../Business/Commerce/OrderLine/index.json).
- `mandate_reservations` → [Mandate reservation (`B:C:MR`)](../../Business/Commerce/MandateReservation/index.json).
- `orders` → [Order (`B:C:OR`)](../../Business/Commerce/Order/index.json).
- `order_events` → [Order event (`B:C:OE`)](../../Business/Commerce/OrderEvent/index.json).
- `settlement_proofs` → [Settlement proof (`F:SP`)](../../Finance/SettlementProof/index.json).
- `fulfillments` → [Fulfillment (`B:C:FU`)](../../Business/Commerce/Fulfillment/index.json).
- `refunds` → [Refund (`F:RF`)](../../Finance/Refund/index.json).
- `idempotency_keys` → [Idempotency record (`S:I:D:OP:ID`)](../../Science/Information/Data/Operations/Idempotency/index.json).
- `outbox_jobs` → [Background job (`S:I:D:OP:JOB`)](../../Science/Information/Data/Operations/Job/index.json).
- `webhook_endpoints` → [Webhook endpoint (`S:I:D:OP:WH`)](../../Science/Information/Data/Operations/Webhook/index.json).
- `webhook_deliveries` → [Webhook delivery (`S:I:D:OP:WD`)](../../Science/Information/Data/Operations/WebhookDelivery/index.json).
- `chain_cursors` → [Processing cursor (`S:I:D:OP:CUR`)](../../Science/Information/Data/Operations/Cursor/index.json).
- `schema_migrations` → [Application configuration (`S:I:D:OP:CFG`)](../../Science/Information/Data/Operations/Configuration/index.json).

### NokNok/www

Files mapped by this inventory:

- `offers.json` → [Offer (`B:C:O`)](../../Business/Commerce/Offer/index.json).
- `offers-state.json` → [Offer response (`B:C:OA`)](../../Business/Commerce/OfferResponse/index.json).
- `merchant-registrations.json` → [Merchant list (`B:C:ML`)](../../Business/Commerce/MerchantList/index.json).
- `support-requests.json` → [Support request (`B:C:SU`)](../../Business/Commerce/SupportRequest/index.json).
- `project-merchant-enrollments.json` → [Merchant enrollment (`B:C:ME`)](../../Business/Commerce/MerchantEnrollment/index.json).
- `sale-satisfaction-intents.json` → [Sale intent (`B:C:SI`)](../../Business/Commerce/SaleIntent/index.json).
- `fedach-routing-names.json` → [Application configuration (`S:I:D:OP:CFG`)](../../Science/Information/Data/Operations/Configuration/index.json).
- `../menu/*.json` → [Menu (`B:C:MN`)](../../Business/Commerce/Menu/index.json).
- `../vendors.json` → [Merchant (`B:C:M`)](../../Business/Commerce/Merchant/index.json).
- `menu-state.json#vendors` → [Merchant (`B:C:M`)](../../Business/Commerce/Merchant/index.json).
- `menu-state.json#terminalOrders` → [Checkout (`B:C:CK`)](../../Business/Commerce/Checkout/index.json).
- `menu-types.json` → [Merchant category (`B:C:MT`)](../../Business/Commerce/MerchantCategory/index.json).

### Public-code metadata

The inventory’s `PublicCodes` list contains `F:AC`, `B:C:O`, `B:C:P`, `B:C:MN`, `B:C:MT`. This is storage metadata, not a disclosure grant. In particular, the F:AC definition requires private handling; consumers must apply definition-level restrictions and their own access controls rather than treating this list as permission to publish entire records.

The version 2 storage mappings above remain historical contracts. Retired application
codes validate against the archived schema, not the active definition tree.
`field-mappings.json` preserves historic `SourceKey` annotations outside definitions.
