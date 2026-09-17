# Geography

Canonical code: `S:G`. [Definition](index.json).

Geography currently separates address formats and uses from the countries or
territories those addresses identify.

## Subclassifications

- [Address](Address/README.md) (`S:G:AD`) contains Roles (`S:G:AD:RO`) and the US
  address format (`S:G:AD:US`). A format defines record fields and presentation;
  a role defines an address’s use. These are distinct from the location itself.
- [Country](Country/README.md) (`S:G:CO`) defines a country or territory. Named
  places live in the separate countries dataset, used by dataset-backed Choices.

For example, a record at `S:G:AD:US` can have Role `S:G:AD:RO:BI` and Country
`G:CO:US`: it uses the US address form, is used for billing and identifies a
location in the United States. A tag provides an additional generic relationship
and does not replace either constrained field.

Countries are imported locally with a pinned source revision and checksums;
no remote service is needed to load the catalogue. See [sources](../../_support/sources/README.md).

- [Subdivision](Subdivision/README.md) (`S:G:SD`) defines administrative or constituent subdivisions. Named US states are available in the separate [states dataset](../../data/states/README.md).

Parent: [Science](../README.md).
