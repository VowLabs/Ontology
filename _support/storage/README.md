# Classification in existing stores

[index.json](index.json) is the canonical record-family inventory. Each table or
JSON record family maps to a path in the same ontology tree as wallet answers.
Applications retain their databases, primary keys, tables, JSON layouts and
access controls. The SQL migrations add `ontology_code` and `ontology_version`
with defaults that classify existing rows and future inserts. Each row also has
`ontology_public`; sensitive composite records such as merchant enrollments and
merchant records default to private. Public presentation of selected fields still
uses the application's existing projections. JSON objects use
`ontologyCode`, `ontologyVersion` and `ontologyPublic` assigned by server code. Dictionaries of
scalar values (routing names and merchant category lists) use the deployed
`NokNok/www/ontology-storage.json` file-level mapping, preserving their layout.

Merchants are `B:C:M`, merchant lists `B:C:ML`, and merchant offers `B:C:O`.
Products, checkouts, orders, fulfillment, mandates and support each have separate
record types. Internal challenges, jobs, cursors and other operational data also
have classifications; classification never adds disclosure permission.

This is record-level classification. Existing application columns, embedded
payloads and signed protocol messages keep their current field schemas. The new
commerce definitions provide initial question fields, not a complete replacement
schema for each application's internal payload. Adding a new table requires a
classification here and a corresponding package-local migration. New field-level
sharing adapters should map fields explicitly and retain the existing access
checks; the wallet does not automatically import server databases.

## Checks

From the workspace root:

```sh
node VowLabs/Ontology/_support/tools/build.mjs
node VowLabs/Ontology/_support/tools/check-storage.mjs
node --test NokNok/shared/data-slices.test.cjs
node VowLabs/Ontology/_support/tools/test-storage.mjs
```

The last command creates and removes disposable PostgreSQL databases. It uses
`ONTOLOGY_TEST_POSTGRES_URL` or `postgresql://localhost/postgres`; no application
database is opened. It checks legacy backfill, new-insert defaults and repeat
migration for every classified table.

## Rollout

No live databases or production files were migrated during implementation.
Stop the relevant running process before starting its replacement. PriceEdge
and PriceEdgeShop apply their additive SQL on startup:

```sh
pnpm -C PriceEdge start
pnpm -C PriceEdgeShop start
```

VowCorp uses its existing migration workflow. With
`VOWCORP_MIGRATION_DATABASE_URL` or `VOWCORP_DATABASE_URL` configured:

```sh
pnpm -C VowCorp db:migrate
pnpm -C VowCorp build
pnpm -C VowCorp start
```

For existing NokNok merchant JSON files, preview and then apply the classification
while the merchant server is stopped. The apply command preserves originals as
`.pre-ontology` backups and preserves IDs, history, and existing fields:

```sh
node NokNok/www/scripts/classify-storage.mjs
node NokNok/www/scripts/classify-storage.mjs --write
pnpm -C NokNok/www start
```

Set any existing `NOKNOK_MENU_STATE_PATH` / `NOKNOK_MENU_VENDORS_PATH` overrides in
the shell when running the migration. New records are classified at write time.

For the wallet, rebuild/relaunch Mobile for the target platform:

```sh
pnpm -C NokNok/Mobile wallet:ios:sim
# or
pnpm -C NokNok/Mobile wallet:android:sim
```

For an unpacked Chrome extension, compile with
`node VowLabs/Ontology/_support/tools/build.mjs`, then click Reload for NokNok at
`chrome://extensions`. For Telegram:

```sh
pnpm -C NokNok/Telegram build
pnpm -C NokNok/Telegram start
```

Generated account lists synchronize their public registry attribute automatically
when the unlocked wallet loads them and when accounts change. No publish button
or separate publication action is required. No contract redeployment is needed.
