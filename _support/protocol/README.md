# Data slices protocol v1

Transport-independent JSON messages. The initial wallet UI uses explicit paste,
review and copy; it neither fetches a supplied URL nor sends an HTTP callback.
Requester names and origins are self-declared in this transport. Display them
without implying authenticated origin. The user must establish the intended
recipient independently. No background or ongoing access is granted.

## Request

```json
{
  "type": "noknok.data.request",
  "protocol": 1,
  "ontology": "2.0.0",
  "id": "request123",
  "nonce": "b4d590a393c148d0a1634283d7d0f6ac",
  "requester": { "name": "Example Insurance", "origin": "https://insurance.example" },
  "purpose": "Prepare a motor insurance quotation",
  "subjectType": "I:P",
  "expiresAt": "2026-12-31T00:00:00.000Z",
  "fields": [
    { "code": "F:A:V:MK", "required": true },
    { "code": "F:A:V:Y", "required": true },
    { "code": "F:A:V:VIN", "required": false }
  ]
}
```

Create a fresh cryptographically random ID and nonce per exchange (the built-in
builder generates 128-bit values). Keep the original request on the recipient
side. The builder gives requests a 24-hour lifetime. Imported requests must have
a future expiry, an exact supported ontology version, an HTTPS origin, and
1–100 unique explicit leaf fields applicable to the subject type. Unknown request
features are rejected, not interpreted as permission. v1 does not support
freshness requirements, callback URLs, or mandatory trusted issuers.

## Review and grant

1. Display the self-declared requester, purpose, expiry and requested questions.
2. Select a locally maintained subject of the requested type.
3. Match saved answers by canonical code and stable instance ID.
4. Start with nothing selected. Select individual values and instances.
5. Required fields constrain approval, never the right to decline. For every
   selected instance, include all requested required fields belonging to its
   object type. Do not combine one car's make with another car's year.
6. Preview the exact disclosure and individually opt into matching attestations.
7. Check expiry again, record approval locally, and copy only that snapshot.

Returning to editing and making changes does not mutate an existing disclosure.
An approval record is not proof of delivery. If clipboard copying fails, no
success is shown, although the preceding local approval record remains.

## Disclosure

A `noknok.data.disclosure` includes `protocol`, `ontology`, `requestId`, `nonce`,
`audience` (the requester origin), `subject`, `issuedAt`, `answers`, and
`attestations`. Each answer is exactly:

```json
{
  "subject": "person1",
  "instance": "vehicle1",
  "code": "F:A:V:Y",
  "value": 2022,
  "updatedAt": "2026-09-13T12:00:00.000Z"
}
```

`shared/data-slices.js` exports a factory accepting the compiled catalogue.
`validateRequest` and `validateDisclosure` check messages. The latter checks the
original request's audience, ID, nonce, version, expiry, required fields, field
allowlist, instance consistency and accompanying attestation scope. Requesters
must separately authenticate the sending party where needed and persist consumed
request IDs/nonces to reject replay. This clipboard implementation deliberately
does not pretend to provide authenticated transport or server-side replay state.

A copied disclosure cannot be revoked retroactively. There are no bearer tokens,
refresh grants or subscriptions in v1.

## Fact attestations

The subject can copy a fact from the Attestations tab and send it to an attester.
The attester pastes that fact into their wallet, reviews it, and explicitly signs
it. The subject imports the returned signature, which must match a currently
saved fact before it is stored. The wallet can include selected matching
attestations in a disclosure.

An envelope contains `scheme: "eip191"`, `statement`, and a hexadecimal
65-byte `signature`. A statement contains:

- `type: "noknok.data.attestation"`, `protocol: 1`, `ontology: "1.0.0"`;
- `issuer`: the signing Ethereum address;
- `issuedAt`: UTC ISO timestamp with milliseconds;
- `claim`: exactly `The issuer attests that this fact is accurate.`;
- `fact`: the exact subject, instance, code, value and update timestamp above.

Signing bytes are UTF-8 of `NokNok data attestation v1\n` followed by canonical
JSON of the statement: recursively lexicographically sorted object keys, array
order preserved, and JSON.stringify primitive encoding. No whitespace or Unicode
normalization is added. Numbers follow JavaScript JSON serialization; integer
values must be safe integers and non-finite numbers are rejected. Other language
implementations must reproduce these bytes exactly. Use Ethereum personal-message
(EIP-191) signing and recovery, as implemented by the installed ethers library.

`data-wallet.js.verify` recovers the signer and compares it to `issuer`. A matching
signature proves control of the signing key and integrity of the statement. It
does not establish identity, clinical credentials, legal authority, or truth.
Changes to an answer or its timestamp make an old attestation inapplicable.
Historical attestations remain stored but are not offered for a changed fact.
Only single-fact attestations are supported. Expiry, revocation and issuer trust
registries require a later protocol version; v1 claims must not be presented as
current official certification. The disclosure itself is unsigned.

## Limits

Imported JSON and editor bridge messages are limited to one megabyte (string
length limit); stores permit up to 2,000 subjects, records, attestations and
approval entries in each list. Prototype-modifying property names are rejected.
Requests never execute code or define new validation rules. Medical, financial,
and identity data are not logged or uploaded by this protocol.
