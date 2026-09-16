# Contact

Canonical code: `I:C`. Definition: [index.json](index.json).

Contact separates direct communication channels, accounts on named online services and emergency contacts. An emergency contact describes another person to reach; it is not an alternative legal identity for the subject.

Parent: [Identity](../README.md).

## Subclassifications

### Contact point — `I:C:P`

A contact point groups a purpose label with email, international phone and website details. Separate records can represent personal and work contact points without combining their channels.

Record fields: Label (`I:C:P:N`), Email (`I:C:P:EM`), Phone (`I:C:P:PH`), Website (`I:C:P:URL`).

[Detailed classification guide](Points/README.md) · [Definition](Points/index.json).

### Online account — `I:C:SM`

An online account pairs a service ID with the subject’s identifier on that service. Shared service names, icons and URL templates belong to S:T:SV; usernames and phone identifiers belong to this record.

Record fields: Service (`I:C:SM:S`), Identifier (`I:C:SM:ID`).

[Detailed classification guide](Social/README.md) · [Definition](Social/index.json).

### Emergency contact — `I:C:EC`

An emergency contact groups name, relationship and phone number for a person to contact. It does not grant that contact access to the subject’s other records.

Record fields: Name (`I:C:EC:N`), Relationship (`I:C:EC:R`), Phone (`I:C:EC:PH`).

[Detailed classification guide](Emergency/README.md) · [Definition](Emergency/index.json).
