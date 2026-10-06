# Assets

Canonical code: `B:F:A`. Definition: [index.json](index.json).

Assets currently contain records for vehicles and real property. These describe individual assets rather than investment products; a fund investing in property belongs under B:F:P:IN:FU.

Parent: [Finance](../README.md).

## Subclassifications

### Vehicle — `B:F:A:V`

Vehicle fields distinguish manufacturer and model, model year, VIN, registration plate and use. VIN and registration plate identify different things and may have different lifetimes; no universal VIN validation rule is declared here.

Record fields: Make (`B:F:A:V:MK`), Model (`B:F:A:V:MD`), Model year (`B:F:A:V:Y`), Vehicle identification number (`B:F:A:V:VIN`), Registration plate (`B:F:A:V:REG`), Usage (`B:F:A:V:USE`).

[Detailed classification guide](Vehicle/README.md) · [Definition](Vehicle/index.json).

### Property — `B:F:A:P`

Property fields distinguish a display label, address, occupancy and construction year. Occupancy describes how the property is used, not proof of title or the subject’s ownership share.

Record fields: Label (`B:F:A:P:N`), Address (`B:F:A:P:AD`), Occupancy (`B:F:A:P:O`), Year built (`B:F:A:P:Y`).

[Detailed classification guide](Property/README.md) · [Definition](Property/index.json).
