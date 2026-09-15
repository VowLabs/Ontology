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
