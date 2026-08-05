# Font licences

This build loads three typefaces from Google Fonts. All three are licensed
under the SIL Open Font License, Version 1.1, which permits use, embedding,
modification, and redistribution (including for commercial products) without
royalty, subject to the terms of the licence (available at
https://openfontlicense.org).

| Typeface        | Role                                                   | Source        | Licence |
|------------------|--------------------------------------------------------|---------------|---------|
| DM Sans          | Headings, section titles, editorial emphasis           | Google Fonts  | SIL OFL 1.1 |
| Inter            | Body copy, navigation, buttons, forms, UI labels        | Google Fonts  | SIL OFL 1.1 |
| IBM Plex Mono    | Timestamps, evidence references, technical metadata     | Google Fonts  | SIL OFL 1.1 |

Fonts are loaded at runtime via the Google Fonts CSS API
(`fonts.googleapis.com` / `fonts.gstatic.com`), so no font files are vendored
into this repository. No attribution beyond this record is required by the
OFL, but it is kept here for internal reference.
