# VowLabs information ontology

The source lives in the `VowLabs/Ontology` repository. In the Vow workspace,
`NokNok/Ontology` is a compatibility symlink to this directory. Check out both
repositories in that layout to use the NokNok asset build and cross-project
storage checks; generated wallet assets remain in `NokNok/shared`.

This is the canonical, open-source catalogue of questions used by the wallet's
**Settings → Account → Lexicon** editor. Definitions form one tree, partitioned into small
files. Individuals and organizations maintain answers once and choose which
answers to disclose to each requester. Definitions describe meaning and answer
constraints; a stored answer is not automatically verified truth.

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

The editor handles organizing branches, record objects and primitive
properties. It does not yet implement arbitrary nested object-valued properties,
conditional questions, translations, catalogue-backed pickers, or live code-list
updates. These should extend the definition format through a versioned change.

## Answers and collections

A wallet account can maintain multiple named subjects. Each subject has a stable
local ID and a canonical type. Subject definitions declare `SubjectType: true`;
the editor derives its type choices from those definitions. Each record has its own ID, subject ID, object code and
property-keyed values with update timestamps. It can also have an optional concise
`label` and a `tags` list. These are private instance metadata, rather than ontology
facts: `Home` can label one address, while `Shipping` and `Billing` classify its role.
The editor accepts tag input separated by commas, spaces or slashes and stores a
deduplicated list. Example:

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
Collections reference exact leaf codes. The request builder expands a collection
into explicit fields; no wildcard or implicit whole-subtree grant is supported.

See [protocol documentation](_support/protocol/README.md) for requests, selective disclosures,
and third-party signatures, and [contribution guidelines](_support/GOVERNANCE.md) for contributions.

## Build and check

From the workspace root:

```sh
node VowLabs/Ontology/_support/tools/build.mjs
node --test NokNok/shared/data-slices.test.cjs
```

The compiler checks JSON, child keys, containment, repeated references, orphaned
files, type references and collection fields. It generates
`NokNok/shared/ontology-catalogue.js`, an ignored browser/CommonJS catalogue,
and `shared/data-editor-document.js`, a prebuilt local Mobile editor document.
Generating the document before Metro runs keeps serialized browser code
independent of React Native transformations.
Mobile Metro, version synchronization, Chrome packaging, and Telegram scripts
compile it automatically. For an unpacked Chrome extension, compile it after
editing definitions and reload the extension.

The editor is shared between Chrome and Telegram and embedded as a local-only
WebView on Mobile. The Mobile bridge holds keys outside the page; navigation,
network access and DOM storage are disabled in the editor document. Data is
stored as an authenticated encrypted document under a wallet-specific key using
NokNok's installed cryptography libraries. Lexicon saves also write an encrypted
snapshot to the Relay database. Opening Lexicon reads that snapshot and restores it when
there is no local copy, or when the local copy has not changed since synchronization.
Private values and wallet keys are never sent in plaintext.

One-time disclosure copies only approved answers to the clipboard; the user
still delivers them to the requester. Database persistence does not grant a
requester access to the user's decryption key.

## Account Display Name

The Settings Account card reads and writes the wallet owner's `I:P:PN`
(Preferred Name). The owner has a stable `wallet_<lowercase wallet address without
0x>` subject ID; other people in Lexicon are never implicitly treated as the
owner. The owner's Preferred Name supplies the Account card's display-name field.
Clearing it preserves the owner subject and leaves the preferred name empty.

The Account card's explicit Save action also publishes the public registry
display-name attribute used by other clients. Editing Preferred
Name in Lexicon is private and does not publish it. Returning to the Account
card displays that private value for explicit publication. No username fallback
is stored as a preferred-name fact.

## Wallet integration

| Code | Stored information | Maintained through |
| --- | --- | --- |
| I:P:PN | Preferred name | Account card or Lexicon |
| I:P:IMG | Profile image | Account card |
| I:PR:NN | Timeout, currency, testnets, advanced/debug flags, duress reminder and Chrome behavior | Settings or Lexicon |
| I:PR:SUB | Per-account balance notifications | Settings account notifications |
| I:CN | Contacts and witness relationship | Connect |
| F:AC | Named generated wallet accounts | Wallet accounts |

Settings update the encrypted owner document and project ontology values to
runtime storage.
Managed lists use stable instance identifiers and appear read-only in Lexicon;
requesters may select their exact leaf codes, just like other facts. Concurrent
host mutations are serialized, and stale editor saves fail instead of overwriting
newer information. This guard applies within one running wallet client; it is
not a distributed synchronization protocol.

Wallet account loading, creation, rename and removal synchronize the private
`F:AC` records in the encrypted owner document. Account-list metadata is no
longer published automatically to VLRegistry. Previous blockchain publications
remain part of chain history.

## Record display and custom choices

Answer objects may define `DisplayFormat`, a plain-text template with child-key
placeholders such as `{L1}`. Public profiles interpolate only public answers,
omit empty lines and dangling punctuation, and keep each record separate.
`DisplayOmitValues` optionally suppresses specified values during display; it
does not change stored answers. Address omits `US` from the domestic display and
retains other country values and any public delivery instructions.

`G:AD:R` is Role: Residence, Office, Billing, Shipping, or Other. `AllowCustom`
and `CustomChoice` make Other open an input over the selector. The entered label
is stored as the value, not the word Other. `ChoiceAliases` maps previous labels
for display and editing without rewriting historical signed facts.

## Application stores

[storage documentation](_support/storage/README.md) documents record classifications,
coverage checks and validation commands. Application databases and JSON files
use canonical ontology codes to classify their records.

## Answer visibility

Every saved answer contains a boolean `public` flag beside `value` and
`updatedAt`. Answers are private unless marked public. Wallet
account facts (`F:AC`) are always private (`PrivateRequired`). Other answers have an editable Public checkbox, including managed
contact and notification records whose values are maintained elsewhere.
Changing visibility preserves the value timestamp and existing fact signatures.

The visibility flags are included in the encrypted database snapshot. Saving
also publishes a filtered public profile snapshot; private records are excluded.
The Relay filters old wallet-account publications from public-profile responses.
Private answers remain available through explicit selective approval. The
request flow still starts with no answers selected, including public answers.

## Encrypted database persistence

Lexicon saves use the authenticated Relay `/api/lexicon` endpoint and PostgreSQL
`noknok.relay_state` table under the `lexiconSnapshots` namespace. It uses the
existing restricted Relay role; request handling never creates tables.
The wallet encrypts the full document using NaCl secretbox and a fresh 24-byte
nonce, with a wallet-specific key derived separately from the local-cache key.
Only ciphertext and its revision hash reach the database; wallet keys stay local.
The document limit is one MiB. Reads verify the hash, authentication tag, document
schema and attestation signatures.

Each save atomically compares the previous revision in PostgreSQL. Stale saves
fail without overwriting newer changes. If both device and database copies have
changed, the editor offers **Use database version** and **Use device version**,
retaining an encrypted backup of the local copy before resolving the conflict.

Settings and Connect update the encrypted device document; those changes are
included in the next Lexicon save. Database snapshots are recovered using the
same wallet key and Relay database.

No registry configuration, transaction fees or contract deployment is required
for Lexicon saves. Start the Relay with `pnpm -C NokNok/Relay start`.

Validation commands, from the workspace root:

```sh
node VowLabs/Ontology/_support/tools/build.mjs
node --test NokNok/shared/data-slices.test.cjs NokNok/shared/database-data.test.cjs
```

Reload the unpacked extension at `chrome://extensions`. Rebuild Mobile using
`pnpm -C NokNok/Mobile wallet:ios:sim` or
`pnpm -C NokNok/Mobile wallet:android:sim`. For Telegram, run
`pnpm -C NokNok/Telegram build` then `pnpm -C NokNok/Telegram start`.

## Shared service data and identity documents

`Science:Technology:Service` (`S:T:SV`) describes the shared service registry.
`GET /api/services` on the Relay supplies its versioned records: Telegram, WhatsApp, X, LinkedIn, Instagram,
Facebook, YouTube, TikTok, Threads, Bluesky, Reddit, Pinterest, Snapchat, Twitch,
and GitHub. The records live in `Ontology/Science/Technology/Service/index.json`, outside encrypted
wallet snapshots. An online account retains `I:C:SM:S` (service ID) and
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

## Shipping-address requests

A connected site first calls:

```js
const request = {address: connectedWallet, query: 'Geography:Address?tag=Shipping'};
const result = await provider.request({method: 'noknok_queryData', params: [request]});
```

The wallet queries the Relay's public address projection. The projection contains
whole public `G:AD` records tagged `Shipping`, grouped by record ID. It never
includes private addresses or other people's records from the owner's Lexicon.
If no usable public records are available, the site calls `noknok_requestData`
with the same request. The wallet shows its own consent form, bound to the
requesting origin and selected account. If no shipping records exist, the form
opens address creation. Saving creates a private, Shipping-tagged record; the
user then explicitly selects and shares addresses. Disclosure does not change
visibility. Cancellation and failures do not disclose records.

Chrome uses its provider approval surface; Mobile uses the same form in its
wallet WebView; Telegram's web-wallet parent bridge supports these two RPC
methods with `NOKNOK_RPC` messages and replies to the requesting parent origin.
The shared form and query protocol currently implement the shipping-address
query specifically; they are not a general ontology query language.

### Record display templates and custom choices

An answer object may declare `DisplayFormat`, a newline-separated string using
child keys such as `{L1}` and `{C}`. Public profile publication expands it using
only public answers, removes blank lines and dangling separators, and keeps each
record as a separate block. `DisplayOmitValues` can suppress specific values in
that display without removing the stored answer. Geography:Address omits `US`
from its US-style address block; other country values and delivery instructions
remain visible when public. Formatting never changes the stored postal code.

A string field with `Choices` may set `AllowCustom: true` and `CustomChoice` to
one of those choices. Selecting it overlays the selector with a text field; the
entered label is stored as the answer. The triangle or Escape returns to preset
choices. `ChoiceAliases` maps legacy answers to current labels when editing or
displaying them, without rewriting historical answers or attestations.

The Relay also formats older public snapshots on read. Contiguous address fields
with unique keys are rendered through the current template. Repeated or unknown
keys remain unchanged because old snapshots omit record IDs; those ambiguous
groups require a Lexicon save to publish explicit address blocks.
