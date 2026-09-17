# Health

Canonical code: `H`. Definition: [index.json](index.json).

Health separates reported allergies, medication use, medical history, accessibility accommodations and food requirements. Preferences, restrictions and reported conditions have different meanings and are kept in separate records.

Parent: [VowLabs ontology](../README.md).

## Subclassifications

### Allergy record — `H:AL`

An allergy record is scoped to one substance. Reported allergy, suspected, no-known-allergy and unknown are explicit statuses; a missing answer is not a declaration of no allergy. Reaction and notes add context without changing that distinction.

Record fields: Substance (`H:AL:S`), Status (`H:AL:ST`), Reaction (`H:AL:R`), Notes (`H:AL:N`).

[Detailed classification guide](Allergy/README.md) · [Definition](Allergy/index.json).

### Medication — `H:MED`

A medication record groups the name with a dose including units and a frequency. Dose and frequency are text, allowing the recorded regimen to retain its wording; the ontology does not calculate doses or prescribe treatment.

Record fields: Name (`H:MED:N`), Dose (`H:MED:D`), Frequency (`H:MED:F`).

[Detailed classification guide](Medication/README.md) · [Definition](Medication/index.json).

### Medical history — `H:HX`

A medical-history record groups a reported condition, diagnosis date if known and notes. The absence of a date does not establish that no diagnosis occurred, and the record is not clinical verification.

Record fields: Condition (`H:HX:C`), Diagnosis date (`H:HX:D`), Notes (`H:HX:N`).

[Detailed classification guide](History/README.md) · [Definition](History/index.json).

### Accessibility need — `H:AC`

Accessibility records describe requested accommodations. They can apply to people or organizations under the schema and do not require a diagnosis or medical explanation.

Record fields: Need (`H:AC:N`).

[Detailed classification guide](Accessibility/README.md) · [Definition](Accessibility/index.json).

### Food — `H:D`

Food separates preferences from dietary restrictions. Disliking an ingredient is different from requiring a preparation restriction; allergy status remains in H:AL.

Further classifications: Food preference (`H:D:P`), Dietary restriction (`H:D:D`).

[Detailed classification guide](Food/README.md) · [Definition](Food/index.json).
