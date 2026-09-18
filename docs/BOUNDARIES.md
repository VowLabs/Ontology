# Definition boundary audit — version 5

The ontology describes concepts and their properties. It does not enumerate the
contents of a user's lists, store application settings, or embed named reference
records. One service can deliver both definitions and data through separate APIs.

| Area reviewed | Decision |
| --- | --- |
| Identity, contact points, documents | Keep definitions of subjects, communication channels and documents. Membership in a user's contact list is application state. |
| Connect contacts, NokNok preferences, account notifications | Remove from the active tree. The owning application retains its compatibility schemas and storage. |
| Generated wallet accounts, Lexicon snapshots | Remove application schemas and persistence conventions from the active tree; retain legacy validation only. Generic wallet-address and bank-account definitions remain. |
| Named professions | Move the 36 entries to `data/professions`; keep the definition of Profession. Retired profession codes are not active tags. |
| Named service providers | Move the 15 records to `data/services`; keep Service and Online account definitions. |
| Named countries and territories | Move the 250 entries to `data/countries`; keep Country, address formats and address roles. Preserve source locks, licensing, checksums and historic answer IDs. |
| Financial products | Keep definitions of product kinds and their conceptual boundaries; no named issuers, products or user portfolios are enumerated. |
| Commerce | Keep generic definitions of orders, invoices, offers, memberships, lists and their properties. A definition of a list is not a populated list or a rule that any user's item belongs in it. Specific merchants, products and membership records are application data. |
| Health | Keep definitions of reported conditions, medication records and preferences; no patient records or lists of named drugs are present. |
| Information-system operations | Keep generic definitions of a job, event, webhook or challenge; no live operational state belongs here. |
| Collections and storage mappings | Remain outside the definition tree as supporting material. Historical storage mappings are pinned contracts, not current domain definitions. `SourceKey` annotations move to support metadata. |
| Human languages, humanities and society | Current organizing concepts remain; future named reference lists must use datasets. |

Dataset IDs have their own `urn:vl:data` namespace, version, metadata and endpoints.
A dataset may refer to the concept it instantiates through `definitionCode`; that
relationship does not turn each data row into a definition. Validators reject
embedded `Records`, application ownership/configuration fields and storage policy
in new definitions. Source data is loaded separately and cannot become a child.

Migration from 4.2 to 5.0 preserves existing country values and archives retired
tags. Historical definitions are isolated in `_support/legacy.json`, only for
validating older data and signatures. They never appear in `/v1/definitions`.
