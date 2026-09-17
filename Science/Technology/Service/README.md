# Service

Canonical code: `S:T:SV`. [Definition](index.json).

An online service provides a channel where a person or organization can hold an
account or be contacted. An online account (`I:C:SM`) references a service and
contains that account's identifier. A service definition is distinct from any
particular provider or account and does not prove control of an account.

The schema describes service IDs, names, identifier types, display and URL
templates, icons and normalization rules. Provider instances (Telegram, GitHub,
etc.) live in [reference data](../../../data/services/README.md), served at
`/v1/services`. No finer subclasses are defined.
