# Value types

Canonical code: `S:I:D:T`. Definition: [index.json](index.json).

Value types are reusable primitive definitions referenced by answer properties. They are not answer records themselves. Integer and Number are numeric values; Identifier remains text so leading zeros survive. Specialized text types add format or pattern constraints.

Parent: [Data](../README.md).

## Primitive definitions

### String — `S:I:D:T:S`

Stored as `string`.

MaxLength: `2000`.

[Type definition](String.json).

### Integer — `S:I:D:T:I`

Stored as `integer`.

[Type definition](Integer.json).

### Number — `S:I:D:T:N`

Stored as `number`.

[Type definition](Number.json).

### Boolean — `S:I:D:T:B`

Stored as `boolean`.

[Type definition](Boolean.json).

### Calendar date — `S:I:D:T:DT`

Stored as `string`.

Format: `date`.

[Type definition](Date.json).

### Email address — `S:I:D:T:EM`

Stored as `string`.

Format: `email`.

MaxLength: `254`.

[Type definition](Email.json).

### International phone number — `S:I:D:T:PH`

Stored as `string`.

Pattern: `^\+[1-9][0-9]{1,14}$`.

[Type definition](Phone.json).

### Identifier — `S:I:D:T:ID`

Text preserves leading zeros. Pair external identifiers with a scheme and issuer.

Stored as `string`.

MaxLength: `256`.

[Type definition](Identifier.json).

### Web address — `S:I:D:T:URL`

Stored as `string`.

Format: `url`.

MaxLength: `2000`.

[Type definition](URL.json).
