# Information system operations

Canonical code: `S:I:D:OP`. Definition: [index.json](index.json).

Information system operations classify application-managed records such as configuration, work queues and delivery tracking. These classifications keep technical state separate from customer identity and commerce data; they do not make operational payloads shareable.

Parent: [Data](../README.md).

## Subclassifications

### Application configuration — `S:I:D:OP:CFG`

Internal operational data; classification does not make it shareable.

Application configuration holds operational settings or metadata. It is distinct from a subject’s personal preferences under I:PR.

Record fields: Record identifier (`S:I:D:OP:CFG:ID`), Status (`S:I:D:OP:CFG:ST`).

[Detailed classification guide](Configuration/README.md) · [Definition](Configuration/index.json).

### Processed event — `S:I:D:OP:EV`

Internal operational data; classification does not make it shareable.

Processed events track events an application has handled. This category differs from domain-specific order events at B:C:OE.

Record fields: Record identifier (`S:I:D:OP:EV:ID`), Status (`S:I:D:OP:EV:ST`).

[Detailed classification guide](Event/README.md) · [Definition](Event/index.json).

### Authentication challenge — `S:I:D:OP:AU`

Internal operational data; classification does not make it shareable.

Authentication challenges track a step in an authentication workflow. An identifier and status are not evidence that authentication succeeded.

Record fields: Record identifier (`S:I:D:OP:AU:ID`), Status (`S:I:D:OP:AU:ST`).

[Detailed classification guide](Authentication/README.md) · [Definition](Authentication/index.json).

### Idempotency record — `S:I:D:OP:ID`

Internal operational data; classification does not make it shareable.

Idempotency records track repeated operations so an application can recognize a previously handled request. They differ from the request’s business record.

Record fields: Record identifier (`S:I:D:OP:ID:ID`), Status (`S:I:D:OP:ID:ST`).

[Detailed classification guide](Idempotency/README.md) · [Definition](Idempotency/index.json).

### Background job — `S:I:D:OP:JOB`

Internal operational data; classification does not make it shareable.

Background jobs track asynchronous work and its application-defined status. They are not the outbound message or webhook delivery produced by that work.

Record fields: Record identifier (`S:I:D:OP:JOB:ID`), Status (`S:I:D:OP:JOB:ST`).

[Detailed classification guide](Job/README.md) · [Definition](Job/index.json).

### Webhook endpoint — `S:I:D:OP:WH`

Internal operational data; classification does not make it shareable.

Webhook endpoints describe configured destinations. Individual delivery attempts belong to Webhook delivery.

Record fields: Record identifier (`S:I:D:OP:WH:ID`), Status (`S:I:D:OP:WH:ST`).

[Detailed classification guide](Webhook/README.md) · [Definition](Webhook/index.json).

### Webhook delivery — `S:I:D:OP:WD`

Internal operational data; classification does not make it shareable.

Webhook deliveries track delivery records for webhook notifications. They are separate from the configured endpoint and from the underlying business event.

Record fields: Record identifier (`S:I:D:OP:WD:ID`), Status (`S:I:D:OP:WD:ST`).

[Detailed classification guide](WebhookDelivery/README.md) · [Definition](WebhookDelivery/index.json).

### Processing cursor — `S:I:D:OP:CUR`

Internal operational data; classification does not make it shareable.

Processing cursors track progress through an ordered stream or chain. A cursor’s position is operational state, not a financial transaction.

Record fields: Record identifier (`S:I:D:OP:CUR:ID`), Status (`S:I:D:OP:CUR:ST`).

[Detailed classification guide](Cursor/README.md) · [Definition](Cursor/index.json).

### Outbound message — `S:I:D:OP:MSG`

Internal operational data; classification does not make it shareable.

Outbound messages track communications prepared or sent by an application. This record classification does not itself authorize sending a message.

Record fields: Record identifier (`S:I:D:OP:MSG:ID`), Status (`S:I:D:OP:MSG:ST`).

[Detailed classification guide](Message/README.md) · [Definition](Message/index.json).
