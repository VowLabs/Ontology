# Preferences

Canonical code: `I:PR`. Definition: [index.json](index.json).

Preferences separate subject-wide application settings from repeated notification settings for individual wallet accounts. These describe selected behavior, not identity evidence.

Parent: [Identity](../README.md).

## Subclassifications

### NokNok settings — `I:PR:NN`

NokNok settings describe lock timing, display currency, reminders, testnets, advanced and debug modes, Chrome window presentation and embedded use. Authentication timeout values are milliseconds. Defaults describe application behavior when a setting has not been supplied.

Record fields: Authentication timeout (`I:PR:NN:AT`), Sovereign currency (`I:PR:NN:SC`), Skip duress reminder (`I:PR:NN:DR`), Show testnets (`I:PR:NN:TN`), Advanced mode (`I:PR:NN:AM`), Debug mode (`I:PR:NN:DM`), Chrome window mode (`I:PR:NN:WM`), Allow embedded wallet (`I:PR:NN:EM`).

[Detailed classification guide](NokNok/README.md) · [Definition](NokNok/index.json).

### Account notifications — `I:PR:SUB`

Account notification settings pair the wallet account number with an enabled flag and a decimal-text threshold. Disabled and unanswered are distinct. The account reference is an identifier string here, even though F:AC:NO uses an integer.

Record fields: Wallet account number (`I:PR:SUB:AC`), Notifications enabled (`I:PR:SUB:EN`), Notification threshold (`I:PR:SUB:TH`).

[Detailed classification guide](Subscriptions/README.md) · [Definition](Subscriptions/index.json).
