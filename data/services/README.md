# Services reference data

Versioned dataset: `services`. Its entries are data, not ontology definitions or
canonical tags. The service offers listing, lookup, search and pagination at
`/v1/datasets/services/records`. The corresponding definition is `S:T:SV`.

Each entry has a stable `id`, a human-readable `name`, and descriptive metadata.

## Shared registry entries

The registry version is `2`. The following are shared records, not ontology subclasses.

### Telegram — `telegram`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://t.me/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/telegram/icon.svg`.

### WhatsApp — `whatsapp`

Identifier label: Phone number. Identifier type: [International phone number (`S:I:D:T:PH`)](../../Science/Information/Data/Types/Phone.json).

Display template: `{identifier}`. Profile URL template: `https://wa.me/{identifierDigits}`.

Normalization rule: `internationalPhone`. Icon route: `/api/services/whatsapp/icon.svg`.

### X — `x`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://x.com/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/x/icon.svg`.

### LinkedIn — `linkedin`

Identifier label: Public profile identifier. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `{identifier}`. Profile URL template: `https://www.linkedin.com/in/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/linkedin/icon.svg`.

### Instagram — `instagram`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.instagram.com/{identifier}/`.

Normalization rule: `username`. Icon route: `/api/services/instagram/icon.svg`.

### Facebook — `facebook`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `{identifier}`. Profile URL template: `https://www.facebook.com/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/facebook/icon.svg`.

### YouTube — `youtube`

Identifier label: Handle. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.youtube.com/@{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/youtube/icon.svg`.

### TikTok — `tiktok`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.tiktok.com/@{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/tiktok/icon.svg`.

### Threads — `threads`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.threads.com/@{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/threads/icon.svg`.

### Bluesky — `bluesky`

Identifier label: Full handle (e.g. ekkis.bsky.social). Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://bsky.app/profile/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/bluesky/icon.svg`.

### Reddit — `reddit`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `u/{identifier}`. Profile URL template: `https://www.reddit.com/user/{identifier}/`.

Normalization rule: `username`. Icon route: `/api/services/reddit/icon.svg`.

### Pinterest — `pinterest`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.pinterest.com/{identifier}/`.

Normalization rule: `username`. Icon route: `/api/services/pinterest/icon.svg`.

### Snapchat — `snapchat`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `@{identifier}`. Profile URL template: `https://www.snapchat.com/add/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/snapchat/icon.svg`.

### Twitch — `twitch`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `{identifier}`. Profile URL template: `https://www.twitch.tv/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/twitch/icon.svg`.

### GitHub — `github`

Identifier label: Username. Identifier type: [Identifier (`S:I:D:T:ID`)](../../Science/Information/Data/Types/Identifier.json).

Display template: `{identifier}`. Profile URL template: `https://github.com/{identifier}`.

Normalization rule: `username`. Icon route: `/api/services/github/icon.svg`.

The online-account record stores the service ID and the user’s own identifier. For WhatsApp, the display retains the international `+` number while its URL template uses digits. Registry templates describe presentation; they do not prove account control.
