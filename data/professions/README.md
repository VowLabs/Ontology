# Professions reference data

Versioned dataset: `professions`. Its entries are data, not ontology definitions or
canonical tags. The service offers listing, lookup, search and pagination at
`/v1/datasets/professions/records`. The corresponding definition is `B:PRO`.

Each entry has a stable `id`, a human-readable `name`, and descriptive metadata.
Profession descriptions specify scope, examples and boundaries. `legacyCode`
records the retired ontology code for migration; it is not an active tag.

## Entries

### Lawyer — `LAW`

Provides legal advice or representation, for example a solicitor or attorney. Covers legal practitioners rather than every employee of a law firm.

### Doctor — `DOC`

Practises human medicine, for example a general practitioner or surgeon. Doctor here means medical practitioner, not an academic doctorate holder; dentists and veterinarians have separate codes.

### Nurse — `NUR`

Provides nursing care, for example a community or hospital nurse. Distinct from a doctor or a non-nursing care worker.

### Dentist — `DEN`

Provides dental assessment and treatment, for example a general dentist. Distinct from a dental assistant or medical doctor.

### Pharmacist — `PHA`

Works in medicines dispensing or pharmacy practice, for example a community pharmacist. Distinct from a pharmacy retail assistant.

### Physiotherapist — `PHY`

Provides physical rehabilitation and movement therapy, for example rehabilitation after an injury. Also called a physical therapist; distinct from a fitness trainer.

### Psychologist — `PSY`

Works in psychological assessment, research or interventions, for example a clinical psychologist. Distinct from a psychiatrist, who is a medical doctor.

### Veterinarian — `VET`

Provides medical care for animals, for example a companion-animal vet. Distinct from a human medical doctor or animal groomer.

### Accountant — `ACC`

Prepares, examines or advises on financial accounts, for example a tax accountant. Distinct from a financial adviser recommending financial plans.

### Financial adviser — `FAD`

Advises on financial planning and financial decisions, for example retirement planning. Distinct from accounting or merely selling a financial product.

### Insurance broker — `INS`

Arranges insurance cover for clients, for example a commercial insurance broker. Describes the person’s work, not an insurance policy or product.

### Real estate agent — `REA`

Helps clients buy, sell or lease property, for example a residential estate agent. Distinct from an architect or building contractor.

### Engineer — `ENG`

Designs, develops or evaluates engineered systems, for example a civil or mechanical engineer. Software developers have a separate code; both can apply when relevant.

### Architect — `ARC`

Designs buildings and their spatial organization, for example a residential architect. Does not mean a software architect or every building designer.

### Software developer — `DEV`

Creates and maintains software, for example an application programmer or software engineer. Distinct from general IT support.

### IT specialist — `ITS`

Supports or administers computing systems, networks or security, for example a systems administrator. Software development is classified separately when that is the work being described.

### Scientist — `SCI`

Conducts scientific research, for example a laboratory biologist or physicist. Distinct from a teacher whose primary work is teaching science.

### Teacher — `TEA`

Teaches learners in an educational setting, for example a school teacher or private tutor. University lecturers have a separate code.

### Lecturer — `LEC`

Teaches in higher education, for example a university lecturer or teaching professor. Research work may additionally be classified as Scientist.

### Designer — `DES`

Creates visual, digital or product designs, for example a graphic or interaction designer. Building architecture has a separate code.

### Artist — `ART`

Creates works of art, for example a painter or sculptor. Photography, music and design have separate codes where those better describe the work.

### Writer — `WRI`

Creates written works, for example a novelist or copywriter. Journalists have a separate code for news reporting.

### Journalist — `JOU`

Researches and reports news, for example a newspaper reporter. Distinct from other writing such as fiction or advertising copy.

### Photographer — `PHO`

Creates photographs professionally, for example a portrait photographer. Does not classify someone merely because they take personal photographs.

### Musician — `MUS`

Performs or creates music, for example a pianist or composer. Music teaching can additionally use Teacher.

### Electrician — `ELE`

Installs, maintains or repairs electrical wiring and equipment, for example domestic wiring. Distinct from electrical engineering design.

### Plumber — `PLU`

Installs, maintains or repairs water, drainage and related pipe systems, for example domestic plumbing. Distinct from general building work.

### Carpenter — `CAR`

Builds, installs or repairs wooden structures and fittings, for example cabinetry or framing. Distinct from general building contracting.

### Builder — `BLD`

Carries out or coordinates building construction, for example a residential building contractor. Specialized trades can use their own codes.

### Mechanic — `MEC`

Maintains and repairs vehicles or machinery, for example an automotive mechanic. Distinct from engineering design.

### Chef — `CHE`

Prepares food professionally, for example a restaurant chef or cook. Distinct from a restaurant owner whose work is management.

### Hairdresser — `HAI`

Cuts, styles or treats hair, for example a salon stylist or barber. Distinct from other beauty services.

### Fitness trainer — `FIT`

Guides exercise and physical conditioning, for example a personal trainer. Distinct from physiotherapy rehabilitation.

### Translator — `TRA`

Converts written content between languages, for example a document translator. Spoken or signed interpretation has a separate code.

### Interpreter — `INT`

Converts spoken or signed communication between languages, for example a conference interpreter. Distinct from written translation.

### Social worker — `SOC`

Supports people with social needs and access to services, for example a family social worker. Distinct from clinical psychology or nursing.

