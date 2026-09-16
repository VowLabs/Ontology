# Workflow collections

[index.json](index.json) defines cross-domain sets of requested fields. Collections are supporting metadata, not ontology subclasses; their keys do not create canonical codes. Membership does not grant access and does not include future descendants automatically.

## Checkout and delivery (`checkout`)

Combines a preferred name and contact channels with postal and delivery details. Address role is not currently requested by this collection.

Explicitly included fields:

- [Preferred name (`I:P:PN`)](../../Identity/Person/PreferredName.json): What name do you prefer to use?
- [Email (`I:C:P:EM`)](../../Identity/Contact/Points/Email.json): What is the email address?
- [Phone (`I:C:P:PH`)](../../Identity/Contact/Points/Phone.json): What is the international phone number?
- [Address line 1 (`G:AD:US:L1`)](../../Geography/Address/US/Line1.json): What is the first address line?
- [Address line 2 (`G:AD:US:L2`)](../../Geography/Address/US/Line2.json): What is the second address line?
- [City (`G:AD:US:C`)](../../Geography/Address/US/City.json): What is the city or locality?
- [Region (`G:AD:US:RE`)](../../Geography/Address/US/Region.json): What is the state, province, or region?
- [Postal code (`G:AD:US:PC`)](../../Geography/Address/US/PostalCode.json): What is the postal code?
- [Country (`G:AD:US:CO`)](../../Geography/Address/US/Country.json): What is the country?
- [Delivery instructions (`G:AD:US:DI`)](../../Geography/Address/US/DeliveryInstructions.json): What instructions should a delivery service follow?

Applications resolve each code to its field definition and retain the containing record and subject context when requesting or disclosing answers.

## Food service (`food`)

Combines substance-specific allergy status and reaction with food preferences and preparation restrictions. These meanings remain distinct even when requested together.

Explicitly included fields:

- [Substance (`H:AL:S`)](../../Health/Allergy/Substance.json): Which substance does this record concern?
- [Status (`H:AL:ST`)](../../Health/Allergy/Status.json): What is your reported allergy status for this substance?
- [Reaction (`H:AL:R`)](../../Health/Allergy/Reaction.json): What reaction have you experienced, if any?
- [Food or ingredient (`H:D:P:I`)](../../Health/Food/Preference/Item.json): Which food, ingredient, or cuisine does this concern?
- [Preference (`H:D:P:P`)](../../Health/Food/Preference/Preference.json): What is your preference?
- [Restriction (`H:D:D:N`)](../../Health/Food/Diet/Name.json): What dietary restriction should a provider observe?
- [Instructions (`H:D:D:I`)](../../Health/Food/Diet/Instructions.json): What preparation instructions should a provider follow?

Applications resolve each code to its field definition and retain the containing record and subject context when requesting or disclosing answers.

## Medical intake (`medical`)

Combines personal identification and an emergency contact with reported allergies, medication details and medical history. It is a selection of intake fields, not a clinical assessment.

Explicitly included fields:

- [Legal name (`I:P:LN`)](../../Identity/Person/LegalName.json): What is your full legal name?
- [Date of birth (`I:P:DOB`)](../../Identity/Person/BirthDate.json): What is your date of birth?
- [Name (`I:C:EC:N`)](../../Identity/Contact/Emergency/Name.json): Who should be contacted in an emergency?
- [Relationship (`I:C:EC:R`)](../../Identity/Contact/Emergency/Relationship.json): What is their relationship to you?
- [Phone (`I:C:EC:PH`)](../../Identity/Contact/Emergency/Phone.json): What is their international phone number?
- [Substance (`H:AL:S`)](../../Health/Allergy/Substance.json): Which substance does this record concern?
- [Status (`H:AL:ST`)](../../Health/Allergy/Status.json): What is your reported allergy status for this substance?
- [Reaction (`H:AL:R`)](../../Health/Allergy/Reaction.json): What reaction have you experienced, if any?
- [Name (`H:MED:N`)](../../Health/Medication/Name.json): What medication do you take?
- [Dose (`H:MED:D`)](../../Health/Medication/Dose.json): What dose do you take, including units?
- [Frequency (`H:MED:F`)](../../Health/Medication/Frequency.json): How often do you take it?
- [Condition (`H:HX:C`)](../../Health/History/Condition.json): What condition would you like to record?
- [Diagnosis date (`H:HX:D`)](../../Health/History/Date.json): When was this condition diagnosed, if known?
- [Notes (`H:HX:N`)](../../Health/History/Notes.json): What else should a practitioner know about this condition?

Applications resolve each code to its field definition and retain the containing record and subject context when requesting or disclosing answers.

## Motor insurance enquiry (`motor`)

Combines a person’s legal name, vehicle details and insurance type/provider. It does not request the policy number or expiry date.

Explicitly included fields:

- [Legal name (`I:P:LN`)](../../Identity/Person/LegalName.json): What is your full legal name?
- [Make (`F:A:V:MK`)](../../Finance/Assets/Vehicle/Make.json): What is this vehicle’s make?
- [Model (`F:A:V:MD`)](../../Finance/Assets/Vehicle/Model.json): What is this vehicle’s model?
- [Model year (`F:A:V:Y`)](../../Finance/Assets/Vehicle/Year.json): What is this vehicle’s model year?
- [Vehicle identification number (`F:A:V:VIN`)](../../Finance/Assets/Vehicle/VIN.json): What is this vehicle’s VIN?
- [Usage (`F:A:V:USE`)](../../Finance/Assets/Vehicle/Use.json): How is this vehicle used?
- [Policy type (`B:IN:T`)](../../Business/Insurance/Type.json): What type of insurance is this?
- [Provider (`B:IN:P`)](../../Business/Insurance/Provider.json): Who provides this policy?

Applications resolve each code to its field definition and retain the containing record and subject context when requesting or disclosing answers.

## Business onboarding (`business`)

Combines organization names and registration context with email and phone contact channels. It does not establish authority to represent the organization.

Explicitly included fields:

- [Legal name (`I:O:LN`)](../../Identity/Organization/LegalName.json): What is the organization’s legal name?
- [Trading name (`I:O:TN`)](../../Identity/Organization/TradingName.json): What trading name does the organization use?
- [Registration jurisdiction (`I:O:J`)](../../Identity/Organization/Jurisdiction.json): Where is the organization registered?
- [Registration number (`I:O:RN`)](../../Identity/Organization/RegistrationNumber.json): What is the organization’s registration number?
- [Email (`I:C:P:EM`)](../../Identity/Contact/Points/Email.json): What is the email address?
- [Phone (`I:C:P:PH`)](../../Identity/Contact/Points/Phone.json): What is the international phone number?

Applications resolve each code to its field definition and retain the containing record and subject context when requesting or disclosing answers.
