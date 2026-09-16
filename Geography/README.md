# Geography

Canonical code: `G`. [Definition](index.json).

Geography currently separates address formats and uses from the countries or
territories those addresses identify.

## Subclassifications

- [Address](Address/README.md) (`G:AD`) contains Roles (`G:AD:RO`) and the US
  address format (`G:AD:US`). A format defines record fields and presentation;
  a role defines an address’s use. These are distinct from the location itself.
- [Country](Country/README.md) (`G:CO`) contains country and territory concepts
  sourced from `ekkis/geo`, such as United States (`G:CO:US`). Its leaf codes
  are acceptable values for fields whose Choices references this branch.

For example, a record at `G:AD:US` can have Role `G:AD:RO:BI` and Country
`G:CO:US`: it uses the US address form, is used for billing and identifies a
location in the United States. A tag provides an additional generic relationship
and does not replace either constrained field.

Countries are imported locally with a pinned source revision and checksums;
no remote service is needed to load the catalogue. See [sources](../_support/sources/README.md).
