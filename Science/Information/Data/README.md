# Data

Canonical code: `S:I:D`. Definition: [index.json](index.json).

Data distinguishes reusable value types, internal information-system operations. A primitive such as String describes a value representation; an operation describes a record family.

Parent: [Information](../README.md).

## Subclassifications

### Value types — `S:I:D:T`

Value types are reusable primitive definitions referenced by answer properties. They are not answer records themselves. Integer and Number are numeric values; Identifier remains text so leading zeros survive. Specialized text types add format or pattern constraints.

Further classifications: String (`S:I:D:T:S`), Integer (`S:I:D:T:I`), Number (`S:I:D:T:N`), Boolean (`S:I:D:T:B`), Calendar date (`S:I:D:T:DT`), Email address (`S:I:D:T:EM`), International phone number (`S:I:D:T:PH`), Identifier (`S:I:D:T:ID`), Web address (`S:I:D:T:URL`).

[Detailed classification guide](Types/README.md) · [Definition](Types/index.json).

### Information system operations — `S:I:D:OP`

Information system operations classify application-managed records such as configuration, work queues and delivery tracking. These classifications keep technical state separate from customer identity and commerce data; they do not make operational payloads shareable.

Further classifications: Application configuration (`S:I:D:OP:CFG`), Processed event (`S:I:D:OP:EV`), Authentication challenge (`S:I:D:OP:AU`), Idempotency record (`S:I:D:OP:ID`), Background job (`S:I:D:OP:JOB`), Webhook endpoint (`S:I:D:OP:WH`), Webhook delivery (`S:I:D:OP:WD`), Processing cursor (`S:I:D:OP:CUR`), Outbound message (`S:I:D:OP:MSG`).

[Detailed classification guide](Operations/README.md) · [Definition](Operations/index.json).
