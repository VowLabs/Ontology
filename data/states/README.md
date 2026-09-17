# US states

This reference dataset contains the 50 states of the United States. A state is an
instance of [Subdivision (`S:G:SD`)](../../Geography/Subdivision/README.md), not an
ontology subclass. IDs such as `US-CA` combine the country and postal abbreviation.
`country` refers to the existing country dataset ID, `G:CO:US`.

`GET /v1/states?q=California` or `/v1/datasets/states/records?q=California` finds
California. `/v1/states/US-CA` retrieves it. The same service supports pagination.
NokNok can attach `{ "dataset":"states", "id":"US-CA" }` as a `dataTags` entry.
It does not place that ID in canonical ontology `tags`.

The source is `data/country/US.state.json` from the pinned `ekkis/geo` revision in
[_support/sources](../../_support/sources/README.md), licensed under MIT. Names are
validated against the source snapshot and checksum. Counties in that source are
not imported. The District of Columbia and US territories are not US states and
are not included. Dataset versioning is independent of ontology versioning.

## Entries

- **Alaska** (`US-AK`): US state, postal abbreviation `AK`.
- **Alabama** (`US-AL`): US state, postal abbreviation `AL`.
- **Arkansas** (`US-AR`): US state, postal abbreviation `AR`.
- **Arizona** (`US-AZ`): US state, postal abbreviation `AZ`.
- **California** (`US-CA`): US state, postal abbreviation `CA`.
- **Colorado** (`US-CO`): US state, postal abbreviation `CO`.
- **Connecticut** (`US-CT`): US state, postal abbreviation `CT`.
- **Delaware** (`US-DE`): US state, postal abbreviation `DE`.
- **Florida** (`US-FL`): US state, postal abbreviation `FL`.
- **Georgia** (`US-GA`): US state, postal abbreviation `GA`.
- **Hawaii** (`US-HI`): US state, postal abbreviation `HI`.
- **Iowa** (`US-IA`): US state, postal abbreviation `IA`.
- **Idaho** (`US-ID`): US state, postal abbreviation `ID`.
- **Illinois** (`US-IL`): US state, postal abbreviation `IL`.
- **Indiana** (`US-IN`): US state, postal abbreviation `IN`.
- **Kansas** (`US-KS`): US state, postal abbreviation `KS`.
- **Kentucky** (`US-KY`): US state, postal abbreviation `KY`.
- **Louisiana** (`US-LA`): US state, postal abbreviation `LA`.
- **Massachusetts** (`US-MA`): US state, postal abbreviation `MA`.
- **Maryland** (`US-MD`): US state, postal abbreviation `MD`.
- **Maine** (`US-ME`): US state, postal abbreviation `ME`.
- **Michigan** (`US-MI`): US state, postal abbreviation `MI`.
- **Minnesota** (`US-MN`): US state, postal abbreviation `MN`.
- **Missouri** (`US-MO`): US state, postal abbreviation `MO`.
- **Mississippi** (`US-MS`): US state, postal abbreviation `MS`.
- **Montana** (`US-MT`): US state, postal abbreviation `MT`.
- **North Carolina** (`US-NC`): US state, postal abbreviation `NC`.
- **North Dakota** (`US-ND`): US state, postal abbreviation `ND`.
- **Nebraska** (`US-NE`): US state, postal abbreviation `NE`.
- **New Hampshire** (`US-NH`): US state, postal abbreviation `NH`.
- **New Jersey** (`US-NJ`): US state, postal abbreviation `NJ`.
- **New Mexico** (`US-NM`): US state, postal abbreviation `NM`.
- **Nevada** (`US-NV`): US state, postal abbreviation `NV`.
- **New York** (`US-NY`): US state, postal abbreviation `NY`.
- **Ohio** (`US-OH`): US state, postal abbreviation `OH`.
- **Oklahoma** (`US-OK`): US state, postal abbreviation `OK`.
- **Oregon** (`US-OR`): US state, postal abbreviation `OR`.
- **Pennsylvania** (`US-PA`): US state, postal abbreviation `PA`.
- **Rhode Island** (`US-RI`): US state, postal abbreviation `RI`.
- **South Carolina** (`US-SC`): US state, postal abbreviation `SC`.
- **South Dakota** (`US-SD`): US state, postal abbreviation `SD`.
- **Tennessee** (`US-TN`): US state, postal abbreviation `TN`.
- **Texas** (`US-TX`): US state, postal abbreviation `TX`.
- **Utah** (`US-UT`): US state, postal abbreviation `UT`.
- **Virginia** (`US-VA`): US state, postal abbreviation `VA`.
- **Vermont** (`US-VT`): US state, postal abbreviation `VT`.
- **Washington** (`US-WA`): US state, postal abbreviation `WA`.
- **Wisconsin** (`US-WI`): US state, postal abbreviation `WI`.
- **West Virginia** (`US-WV`): US state, postal abbreviation `WV`.
- **Wyoming** (`US-WY`): US state, postal abbreviation `WY`.
