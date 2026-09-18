# External dataset sources

`index.json` reserves source-lock metadata for any locally owned dataset that
needs pinned provenance. It is currently empty. Geography, countries, states and
their raw data are owned and served by Geo; their former imported copies have
been removed. See [proxy delegation](../../docs/contributions/README.md).

Historical definition snapshots remain in `../legacy.json` to interpret old
signed records. Live datasets are fetched from Geo; regenerating an offline
client bundle does not recreate authoritative data under this directory.
