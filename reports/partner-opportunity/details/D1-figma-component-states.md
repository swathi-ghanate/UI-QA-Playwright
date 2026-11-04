# D1: Figma component states

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Generated:** 2026-11-04T13:35:30.923Z by the UI Fidelity QA framework (Playwright, Chromium)

- Only the default state is drawn, plus the bold current-page nav link (a selected state). Every other state is **State not designed**.
- Layer names describing states: none.
- Cursor is **Not specified** everywhere: an SVG export carries no cursor.

## D1.1 Interactive components on this screen

| Component | Count | Figma layers |
|---|---|---|
| Nav links | 7 | [id="Nav_Links"] > text |
| Primary button (nav) | 1 | [id="Button"] |
| Secondary button (hero) | 1 | [id="Button_2"] |
| Secondary button (CTA) | 1 | [id="Button_3"] |
| Footer links | 16 | [id="UpperContent"] [id$="Links"] text:not([id="Business Development"]) |
| Logo link | 1 | [id="BargerTech Engine LOGO PNG No BKGRND 2"] |
| Mobile menu toggle | not in the design | — |

Inputs, dropdowns, checkboxes, radio buttons, tabs and toggles: none on this screen, so all their states are State not designed.

## D1.2 Designed states

| Component | State | Background | Text colour | Border | Radius | Shadow | Opacity | Cursor | Size | Font |
|---|---|---|---|---|---|---|---|---|---|---|
| Nav links | Default | none | #FFFFFF | none | — | none | 1 | Not specified | text only | 14px / 500 |
| Primary button (nav) | Default | #1B6AAA | #FFFFFF | none | 24 | none | 1 | Not specified | 154×48 | 16px / 600 |
| Secondary button (hero) | Default | #CBE0F3 | #1B6AAA | 1.5px #1B6AAA | 28 | none | 1 | Not specified | 163×56 | 16px / 600 |
| Secondary button (CTA) | Default | #CBE0F3 | #1B6AAA | 1.5px #1B6AAA | 28 | none | 1 | Not specified | 244×56 | 16px / 600 |
| Footer links | Default | none | #4A5560 | none | — | none | 1 | Not specified | text only | 14px / 400 |
| Logo link | Default | transparent | — | none | 0 | none | 1 | Not specified | 236×80 | — |
| Nav link (current page) | Selected | none | #FFFFFF | none | — | none | 1 | Not specified | text only | 14px / 700 |

## D1.3 States not designed

| Component | States |
|---|---|
| Nav links | hover, focus, focus-visible, active, disabled, loading, error, empty: State not designed |
| Primary button (nav) | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Secondary button (hero) | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Secondary button (CTA) | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Footer links | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Logo link | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |

## D1.4 State coverage

6 components × 10 states = 60 state cells, of which **7 are designed** (6 default + 1 selected). No component has a focus style, so keyboard focus styling is not designed.

## D1.5 Contrast of the designed states

| Pair | Ratio | Text size / weight | WCAG AA |
|---|---|---|---|
| Primary button: label on fill | 5.69:1 | 16px / 600 | Pass |
| Secondary button (hero): label on fill | 4.2:1 | 16px / 600 | Fail |
| Secondary button (CTA): label on fill | 4.2:1 | 16px / 600 | Fail |
| Footer link on footer background | 6.71:1 | 14px / 400 | Pass |
| Nav links on the translucent pill over the hero photo | Not specified (varies with the image) | — | — |
