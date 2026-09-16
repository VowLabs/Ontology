# Professions

Canonical code: `B:PRO`. [Definition](index.json).

Professions classifies the work people do, including occupations and skilled
trades. This is a curated starter vocabulary, not an exhaustive occupational
standard or a list limited to regulated professions. It belongs under Business
because that domain includes the organization of work. It is a sibling of
[Employment](../Employment/README.md): a profession is independent of any
particular employer, job title, employment period or employment status.

These concepts apply to people, including people represented by contacts.
They do not classify an organization's industry, a service being purchased or
the relationship between a contact and the person keeping the contact list.
A professional title does not establish a qualification, licence, current
practice or availability to provide services. No licence requirements or
jurisdiction-specific eligibility rules are encoded here.

## Using professions on contacts

Use the existing canonical `tags` on a contact record (`I:CN`), for example:

```json
{
  "id": "contact-1",
  "subject": "person-1",
  "code": "I:CN",
  "tags": ["B:PRO:LAW"],
  "values": {}
}
```

Here Lawyer describes the contact, not the record-owning subject `person-1`.
A medical doctor uses `B:PRO:DOC`. A person with several professions can have
several distinct profession tags, within the protocol's 32-tag record limit.
Store canonical codes rather than labels such as `lawyer` or display paths.
`B:PRO` identifies the vocabulary as a whole, not a specific profession.
An absent tag means unclassified, not unemployed or unqualified.

These are classification nodes with no answer fields, units or scalar values.
No change is made to the free-text employment Role field (`B:EMP:R`). Existing
records and tags retain their meaning. This additive vocabulary is introduced
in ontology `4.2.0`; consumers need that catalogue version to resolve its codes.
The [version migration chain](../../_support/migrations/README.md) preserves
existing codes and historical facts across this additive release.
There is no Other/free-text fallback: additional occupations require canonical
definitions and documentation.

## Defined professions

### Lawyer — `B:PRO:LAW`

Provides legal advice or representation, for example a solicitor or attorney. Covers legal practitioners rather than every employee of a law firm.

[Detailed definition](Lawyer/README.md). No finer subclasses are currently defined.

### Doctor — `B:PRO:DOC`

Practises human medicine, for example a general practitioner or surgeon. Doctor here means medical practitioner, not an academic doctorate holder; dentists and veterinarians have separate codes.

[Detailed definition](Doctor/README.md). No finer subclasses are currently defined.

### Nurse — `B:PRO:NUR`

Provides nursing care, for example a community or hospital nurse. Distinct from a doctor or a non-nursing care worker.

[Detailed definition](Nurse/README.md). No finer subclasses are currently defined.

### Dentist — `B:PRO:DEN`

Provides dental assessment and treatment, for example a general dentist. Distinct from a dental assistant or medical doctor.

[Detailed definition](Dentist/README.md). No finer subclasses are currently defined.

### Pharmacist — `B:PRO:PHA`

Works in medicines dispensing or pharmacy practice, for example a community pharmacist. Distinct from a pharmacy retail assistant.

[Detailed definition](Pharmacist/README.md). No finer subclasses are currently defined.

### Physiotherapist — `B:PRO:PHY`

Provides physical rehabilitation and movement therapy, for example rehabilitation after an injury. Also called a physical therapist; distinct from a fitness trainer.

[Detailed definition](Physiotherapist/README.md). No finer subclasses are currently defined.

### Psychologist — `B:PRO:PSY`

Works in psychological assessment, research or interventions, for example a clinical psychologist. Distinct from a psychiatrist, who is a medical doctor.

[Detailed definition](Psychologist/README.md). No finer subclasses are currently defined.

### Veterinarian — `B:PRO:VET`

Provides medical care for animals, for example a companion-animal vet. Distinct from a human medical doctor or animal groomer.

[Detailed definition](Veterinarian/README.md). No finer subclasses are currently defined.

### Accountant — `B:PRO:ACC`

Prepares, examines or advises on financial accounts, for example a tax accountant. Distinct from a financial adviser recommending financial plans.

[Detailed definition](Accountant/README.md). No finer subclasses are currently defined.

### Financial adviser — `B:PRO:FAD`

Advises on financial planning and financial decisions, for example retirement planning. Distinct from accounting or merely selling a financial product.

[Detailed definition](FinancialAdviser/README.md). No finer subclasses are currently defined.

### Insurance broker — `B:PRO:INS`

Arranges insurance cover for clients, for example a commercial insurance broker. Describes the person’s work, not an insurance policy or product.

[Detailed definition](InsuranceBroker/README.md). No finer subclasses are currently defined.

### Real estate agent — `B:PRO:REA`

Helps clients buy, sell or lease property, for example a residential estate agent. Distinct from an architect or building contractor.

[Detailed definition](RealEstateAgent/README.md). No finer subclasses are currently defined.

### Engineer — `B:PRO:ENG`

Designs, develops or evaluates engineered systems, for example a civil or mechanical engineer. Software developers have a separate code; both can apply when relevant.

[Detailed definition](Engineer/README.md). No finer subclasses are currently defined.

### Architect — `B:PRO:ARC`

Designs buildings and their spatial organization, for example a residential architect. Does not mean a software architect or every building designer.

[Detailed definition](Architect/README.md). No finer subclasses are currently defined.

### Software developer — `B:PRO:DEV`

Creates and maintains software, for example an application programmer or software engineer. Distinct from general IT support.

[Detailed definition](SoftwareDeveloper/README.md). No finer subclasses are currently defined.

### IT specialist — `B:PRO:ITS`

Supports or administers computing systems, networks or security, for example a systems administrator. Software development is classified separately when that is the work being described.

[Detailed definition](ITSpecialist/README.md). No finer subclasses are currently defined.

### Scientist — `B:PRO:SCI`

Conducts scientific research, for example a laboratory biologist or physicist. Distinct from a teacher whose primary work is teaching science.

[Detailed definition](Scientist/README.md). No finer subclasses are currently defined.

### Teacher — `B:PRO:TEA`

Teaches learners in an educational setting, for example a school teacher or private tutor. University lecturers have a separate code.

[Detailed definition](Teacher/README.md). No finer subclasses are currently defined.

### Lecturer — `B:PRO:LEC`

Teaches in higher education, for example a university lecturer or teaching professor. Research work may additionally be classified as Scientist.

[Detailed definition](Lecturer/README.md). No finer subclasses are currently defined.

### Designer — `B:PRO:DES`

Creates visual, digital or product designs, for example a graphic or interaction designer. Building architecture has a separate code.

[Detailed definition](Designer/README.md). No finer subclasses are currently defined.

### Artist — `B:PRO:ART`

Creates works of art, for example a painter or sculptor. Photography, music and design have separate codes where those better describe the work.

[Detailed definition](Artist/README.md). No finer subclasses are currently defined.

### Writer — `B:PRO:WRI`

Creates written works, for example a novelist or copywriter. Journalists have a separate code for news reporting.

[Detailed definition](Writer/README.md). No finer subclasses are currently defined.

### Journalist — `B:PRO:JOU`

Researches and reports news, for example a newspaper reporter. Distinct from other writing such as fiction or advertising copy.

[Detailed definition](Journalist/README.md). No finer subclasses are currently defined.

### Photographer — `B:PRO:PHO`

Creates photographs professionally, for example a portrait photographer. Does not classify someone merely because they take personal photographs.

[Detailed definition](Photographer/README.md). No finer subclasses are currently defined.

### Musician — `B:PRO:MUS`

Performs or creates music, for example a pianist or composer. Music teaching can additionally use Teacher.

[Detailed definition](Musician/README.md). No finer subclasses are currently defined.

### Electrician — `B:PRO:ELE`

Installs, maintains or repairs electrical wiring and equipment, for example domestic wiring. Distinct from electrical engineering design.

[Detailed definition](Electrician/README.md). No finer subclasses are currently defined.

### Plumber — `B:PRO:PLU`

Installs, maintains or repairs water, drainage and related pipe systems, for example domestic plumbing. Distinct from general building work.

[Detailed definition](Plumber/README.md). No finer subclasses are currently defined.

### Carpenter — `B:PRO:CAR`

Builds, installs or repairs wooden structures and fittings, for example cabinetry or framing. Distinct from general building contracting.

[Detailed definition](Carpenter/README.md). No finer subclasses are currently defined.

### Builder — `B:PRO:BLD`

Carries out or coordinates building construction, for example a residential building contractor. Specialized trades can use their own codes.

[Detailed definition](Builder/README.md). No finer subclasses are currently defined.

### Mechanic — `B:PRO:MEC`

Maintains and repairs vehicles or machinery, for example an automotive mechanic. Distinct from engineering design.

[Detailed definition](Mechanic/README.md). No finer subclasses are currently defined.

### Chef — `B:PRO:CHE`

Prepares food professionally, for example a restaurant chef or cook. Distinct from a restaurant owner whose work is management.

[Detailed definition](Chef/README.md). No finer subclasses are currently defined.

### Hairdresser — `B:PRO:HAI`

Cuts, styles or treats hair, for example a salon stylist or barber. Distinct from other beauty services.

[Detailed definition](Hairdresser/README.md). No finer subclasses are currently defined.

### Fitness trainer — `B:PRO:FIT`

Guides exercise and physical conditioning, for example a personal trainer. Distinct from physiotherapy rehabilitation.

[Detailed definition](FitnessTrainer/README.md). No finer subclasses are currently defined.

### Translator — `B:PRO:TRA`

Converts written content between languages, for example a document translator. Spoken or signed interpretation has a separate code.

[Detailed definition](Translator/README.md). No finer subclasses are currently defined.

### Interpreter — `B:PRO:INT`

Converts spoken or signed communication between languages, for example a conference interpreter. Distinct from written translation.

[Detailed definition](Interpreter/README.md). No finer subclasses are currently defined.

### Social worker — `B:PRO:SOC`

Supports people with social needs and access to services, for example a family social worker. Distinct from clinical psychology or nursing.

[Detailed definition](SocialWorker/README.md). No finer subclasses are currently defined.

Parent: [Business](../README.md).
