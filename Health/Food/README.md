# Food

Canonical code: `H:D`. Definition: [index.json](index.json).

Food separates preferences from dietary restrictions. Disliking an ingredient is different from requiring a preparation restriction; allergy status remains in H:AL.

Parent: [Health](../README.md).

## Subclassifications

### Food preference — `H:D:P`

A food preference pairs an ingredient, food or cuisine with prefer, avoid or no-preference. Avoidance here is a preference and should not be interpreted as a confirmed allergy.

Record fields: Food or ingredient (`H:D:P:I`), Preference (`H:D:P:P`).

[Detailed classification guide](Preference/README.md) · [Definition](Preference/index.json).

### Dietary restriction — `H:D:D`

A dietary restriction pairs the restriction with preparation instructions. This can express requirements that are not allergies; applications should not infer a diagnosis from them.

Record fields: Restriction (`H:D:D:N`), Instructions (`H:D:D:I`).

[Detailed classification guide](Diet/README.md) · [Definition](Diet/index.json).
