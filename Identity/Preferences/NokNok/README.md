# NokNok settings

Canonical code: `I:PR:NN`. Definition: [index.json](index.json).

NokNok settings describe lock timing, display currency, reminders, testnets, advanced and debug modes, Chrome window presentation and embedded use. Authentication timeout values are milliseconds. Defaults describe application behavior when a setting has not been supplied.

Parent: [Preferences](../README.md).

## Record scope

At most one record per subject (`Scalar: true`).

Applicable subjects: [Personal identity (`I:P`)](../../Person/index.json), [Organization identity (`I:O`)](../../Organization/index.json).

The children below are optional scalar fields of one record, not subtypes. An unanswered field does not mean false, zero or not applicable.

## Fields

### Authentication timeout — `I:PR:NN:AT`

The field answers: “How long should NokNok remain unlocked?”

Value type: [Integer (`S:I:D:T:I`)](../../../Science/Information/Data/Types/Integer.json); stored as `integer`.

Declared choices: `60000`, `180000`, `300000`, `900000`, `1800000`, `3600000`.

Declared default: `180000`.

Preference: `authTimeoutMs`.

StorageKey: `noknok_auth_timeout_ms`.

[Field definition](AuthTimeout.json).

### Sovereign currency — `I:PR:NN:SC`

The field answers: “Which currency should NokNok use?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `USD`, `GBP`, `EUR`, `CAD`, `SEK`, `CHF`.

Declared default: `"USD"`.

Preference: `sovereignCurrency`.

StorageKey: `noknok_sovereign_currency`.

[Field definition](Currency.json).

### Skip duress reminder — `I:PR:NN:DR`

The field answers: “Should NokNok skip the duress-code reminder?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

Declared default: `false`.

Preference: `duressReminderDisabled`.

StorageKey: `noknok_duress_reminder_disabled`.

[Field definition](DuressReminder.json).

### Show testnets — `I:PR:NN:TN`

The field answers: “Should NokNok display test networks?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

Declared default: `false`.

Preference: `showTestnets`.

StorageKey: `noknok.showTestnets`.

[Field definition](Testnets.json).

### Advanced mode — `I:PR:NN:AM`

The field answers: “Should NokNok enable advanced mode?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

Declared default: `false`.

Preference: `advancedMode`.

StorageKey: `noknok.advancedMode`.

[Field definition](AdvancedMode.json).

### Debug mode — `I:PR:NN:DM`

The field answers: “Should NokNok enable debug logging?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

Declared default: `false`.

Preference: `debugMode`.

StorageKey: `noknok.debugMode`.

[Field definition](DebugMode.json).

### Chrome window mode — `I:PR:NN:WM`

The field answers: “How should the Chrome wallet open?”

Value type: [String (`S:I:D:T:S`)](../../../Science/Information/Data/Types/String.json); stored as `string`.

Maximum length: `2000`.

Declared choices: `docked`, `floating`.

Declared default: `"docked"`.

Preference: `chromeWindowMode`.

StorageKey: `noknok_chrome_window_mode`.

[Field definition](WindowMode.json).

### Allow embedded wallet — `I:PR:NN:EM`

The field answers: “May the Chrome wallet open inside supported pages?”

Value type: [Boolean (`S:I:D:T:B`)](../../../Science/Information/Data/Types/Boolean.json); stored as `boolean`.

Declared default: `true`.

Preference: `allowEmbedded`.

StorageKey: `noknok_allow_embedded`.

[Field definition](Embedded.json).
