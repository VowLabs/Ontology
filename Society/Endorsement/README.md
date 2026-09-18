# Endorsement

Canonical code: `R:EN`. Parent: [Society](../README.md).

An endorsement expresses its author's assessment of an individual (`I:P`) or
organization (`I:O`). It is a subjective statement, not a verified identity fact
or proof of the subject's agreement. Applications retain author and subject
attribution separately and decide who may contribute and read endorsements.

An endorsement is one composite value with two required fields (`RequiredFields`):

- **Endorsement — `R:EN:T`**: nonempty free text, at most 2000 characters; for
  example, “Clear communication and reliable delivery.” No markup interpretation
  or finer subclasses are defined. Type: String (`S:I:D:T:S`).
- **Rating — `R:EN:R`**: integer from 1 through 3, rendered as one, two or three
  stars. Higher values express a more favorable assessment. Zero, fractions and
  ratings above three are invalid. Type: Integer (`S:I:D:T:I`). No finer
  subclasses or alternative scales are defined.

`Collection: true`, `Scalar: false` permits separate endorsements. `Composite:
true` keeps text and rating together; neither may be omitted from a saved record.
Unlike an attestation, an endorsement does not certify that another saved fact
is accurate. Attribution, connection permissions and visibility are application
policy, not additional endorsement answer fields.
