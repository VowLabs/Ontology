# VowLabs information ontology

The standalone read-only HTTP API is documented in [API.md](API.md). Start it
with `npm --prefix VowLabs/Ontology start` from the Vow workspace; it requires
Node.js 22 or later and has no external dependencies.

This repository provides a canonical, open-source vocabulary for applications.
Definitions describe concepts, questions, value types, constraints, and shared
reference data. Applications use stable codes to interpret their own records
and exchange information consistently.

User records, identifiers, consent, authentication, and storage belong to the
consuming applications. The ontology defines their meaning; it does not store
user answers or establish that an answer is verified truth.

## One tree, compact paths

Start at [index.json](index.json). Each `Children` key contributes one segment to
a colon-delimited code. References explicitly connect files; filenames do not
contribute to identifiers. For example:

```
index.json → F → Finance/index.json → A → Assets/index.json → V → Vehicle/index.json → Y → Year.json
canonical code: F:A:V:Y
```

Changing a filename or display label preserves the code. Published child keys
define stable canonical codes and are unique within their parent. A definition never repeats its own path and has no `Kind` field.

## Repository layout

The root contains `index.json`, this README and the domain directories. Each
domain directory is a branch connected through the root's `Children` references.
Supporting material lives in `_support/`: collection definitions, protocol
specifications, storage mappings, tooling and contribution guidelines. Supporting
files are not ontology nodes and do not contribute code segments.

## Top-level domains

The roots organize subject matter. Each paragraph describes the domain's scope
and identifies its current coverage. Collections combine fields across domains
for particular workflows.

| Code | Domain | Scope |
| --- | --- | --- |
| `I` | Identity | Describes people and organizations, how they identify themselves, how they can be contacted, and their preferences and connections. Its current branches cover personal and organizational information, identifiers, contact details, preferences, and relationships such as contacts and witnesses. Identity provides the subjects to which records in other domains belong; possessing an identifier or declaring a relationship does not establish its authenticity. |
| `F` | Finance | Covers money, assets, accounts, payment instruments, and financial transactions for individuals, organizations, and public bodies. Current definitions include bank accounts, wallets, payment instruments, assets, generated wallet accounts, invoices, settlement proofs, and refunds. Finance remains a peer of Business because financial information also describes personal holdings and noncommercial activity, while business operations extend beyond financial matters. |
| `G` | Geography | Covers places, locations, and the spatial relationships used to situate people, organizations, assets, and activities. The current branch defines addresses; its broader scope accommodates geographic areas, coordinates, and physical locations as additional vocabulary is defined. Geographic facts identify where something is situated, while the identity of its occupant or owner belongs to the relevant subject. |
| `H` | Health | Covers physical and mental health, care needs, accessibility, and food-related information relevant to wellbeing. Current definitions include allergies, medications, medical history, accessibility needs, and food requirements. These records support selective disclosure for contexts such as care intake and food service; a recorded answer is a person's or organization's statement, and the catalogue itself supplies neither a diagnosis nor clinical validation. |
| `B` | Business | Covers commercial activity and the organization of work, including products, services, trading relationships, employment, insurance, and operational processes. Its current branches are Commerce, Employment, and Insurance. Business uses financial facts through their Finance codes, allowing a commercial workflow to combine operational and financial information without duplicating the same concept in both domains. |
| `S` | Science | Covers scientific knowledge, technical systems, and the information structures used to describe and process data. Its current branches are Technology and Information, including the shared primitive types used throughout the ontology. This domain provides a home for scientific and technical subject matter; the fact that another domain can be studied systematically does not make that entire domain a subdivision of Science. |
| `U` | Humanities | Covers human culture, expression, language, history, philosophy, and interpretation. Its focus is the meanings, ideas, works, and traditions through which people understand and express human experience. Humanities is currently an organizing branch with no defined children; its scope is distinct from scientific and technical knowledge while allowing workflows to draw on both. |
| `R` | Society | Covers collective life, social institutions, civic participation, governance, law, communities, and relationships between groups. Identity describes particular people and organizations, while Society provides a home for the collective structures and practices in which they participate. Society is currently an organizing branch with no defined children. |

## Definitions

An organizing node has `Name`, optional `Description`, and `Children` references.
An answer-bearing object additionally has:

- `Scalar`: JSON boolean. `true` permits at most one object per subject; `false`
  permits multiple objects, each with a stable instance ID.
- `Subjects`: applicable subject types, canonical subject definitions (`I:P` and/or `I:O`).

A leaf property has `Name`, `Question`, and `Type`, referencing a canonical `S:I:D:T`
value definition. Every leaf is optional and scalar
within its containing object. Removing an answer means unanswered; it does not
mean false, zero, no known allergy, or not applicable. Repetition is represented
by containing records rather than parallel arrays of unrelated field values.

Supported constraints are `Choices`, `Pattern`, `Minimum`, `Maximum`, and
`MaxLength`. Primitive definitions use `ValueType` (`string`, `integer`, `number`,
`boolean`) and optional `Format` (`date`, `email`, `url`). Dates are real calendar
dates formatted `YYYY-MM-DD`. Identifiers are strings, preserving leading zeros.
Pattern checks do not prove an identifier's issuance or ownership.

Applications can use organizing branches, record objects, and primitive
properties to construct forms and validate values. Extensions such as conditional
questions or nested object-valued properties require an explicit, versioned
change to the definition format.

## Answers and collections

An application can maintain multiple subjects, each with a stable local ID and
a canonical type. Subject definitions declare `SubjectType: true`. Records can
refer to a subject, an object code, and property-keyed values with timestamps.
Labels and tags describe individual records rather than canonical concepts.
For example, an application might store the following record in its own database:

```json
{
  "id": "vehicle1",
  "subject": "person1",
  "code": "F:A:V",
  "label": "Family car",
  "tags": ["personal", "insured"],
  "values": {
    "MK": { "value": "Toyota", "public": false, "updatedAt": "2026-09-13T12:00:00.000Z" },
    "Y": { "value": 2022, "public": false, "updatedAt": "2026-09-13T12:00:00.000Z" }
  }
}
```

Record IDs, not array offsets, identify repeated objects. Scalar limits apply
per subject. There is no claim that a subject ID is a globally verified identity
or that its controller is an authorized company representative.

[collections](_support/collections/index.json) defines starter collections for
checkout, food service, medical intake, motor insurance and business onboarding.
Collections reference exact leaf codes. Applications can expand a collection
into explicit fields; collection membership does not grant access to user data.

See [protocol documentation](_support/protocol/README.md) for guidance on using codes in application-owned
requests, disclosures, and attestations, and [contribution guidelines](_support/GOVERNANCE.md) for contributions.

## Validate and test

From the workspace root:

```sh
npm --prefix VowLabs/Ontology run validate
npm --prefix VowLabs/Ontology test
```

From a standalone checkout, use `npm run validate` and `npm test`.
The validator checks JSON, child keys, containment, repeated references, orphaned
files, type references, and collection fields. API tests cover lookups, shared
records, pagination, errors, caching, and standalone operation.

Applications can retrieve the compiled catalogue through `GET /v1/catalogue`
or load it with the repository's `_support/catalogue.mjs` module. Application
asset generation and deployment belong to the consuming project's build process.

## Record display and custom choices

Answer objects may define `DisplayFormat`, a plain-text template with child-key
placeholders such as `{L1}`. Public profiles interpolate only public answers,
omit empty lines and dangling punctuation, and keep each record separate.
`DisplayOmitValues` optionally suppresses specified values during display; it
does not change stored answers. Address omits `US` from the domestic display and
retains other country values and any public delivery instructions.

`G:AD:R` is Role: Residence, Office, Billing, Shipping, or Other. `AllowCustom`
and `CustomChoice` allow an application to accept a custom value when Other
is selected. Store the entered value rather than the placeholder Other. `ChoiceAliases` maps previous labels
for display and editing without rewriting historical signed facts.

## Application stores

[storage documentation](_support/storage/README.md) documents record classifications,
coverage checks and validation commands. Application databases and JSON files
use canonical ontology codes to classify their records.

## Answer visibility

Definition flags such as `Public`, `PublicRequired`, and `PrivateRequired`
describe visibility semantics for application data. They do not make schema
metadata private: canonical definitions are publicly readable through the API.
For example, account facts (`F:AC`) require private handling (`PrivateRequired`).

Applications enforce access control, collect consent, and determine which values
may be disclosed. A canonical code, collection, or reference never grants access
to a user's records. Formatting and visibility changes must not silently rewrite
historical signed facts.

## Shared service data and identity documents

`Science:Technology:Service` (`S:T:SV`) describes the shared service registry.
`GET /v1/services` supplies its versioned records: Telegram, WhatsApp, X, LinkedIn, Instagram,
Facebook, YouTube, TikTok, Threads, Bluesky, Reddit, Pinterest, Snapchat, Twitch,
and GitHub. The canonical records live in
[Science/Technology/Service/index.json](Science/Technology/Service/index.json).
An application-owned online account can retain `I:C:SM:S` (service ID) and
`I:C:SM:ID` (identifier); the existing codes remain compatible. Templates and
icon URLs come from the service record. WhatsApp retains an international phone
number with `+`, and derives digits for its access URL.

`Identity:Documents:DriverLicence` (`I:DOC:DL`) and
`Identity:Documents:Passport` (`I:DOC:PP`) are repeatable, private-by-default
records belonging to a person. A renewal is a new document instance. Both record
the number, issuing country and authority, issue date, and expiry date. A driver
licence also records issuing region, classes, and restrictions or endorsements;
a passport records its type and nationality. Document numbers remain text,
scoped to their issuer. These records do not themselves attest authenticity or
current validity. The person's identity remains a separate subject.
