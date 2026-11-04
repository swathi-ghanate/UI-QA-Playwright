# D1: Figma component states

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Generated:** 2026-11-04T13:35:30.222Z by the UI Fidelity QA framework (Playwright, Chromium)

- Only the default state is drawn, plus the bold current-page nav link (a selected state). Every other state is **State not designed**.
- Layer names describing states: none.
- Cursor is **Not specified** everywhere: an SVG export carries no cursor.

## D1.1 Interactive components on this screen

| Component | Count | Figma layers |
|---|---|---|
| Nav links | 7 | [id="Nav_Links"] > text |
| Primary button (nav) | 1 | [id="Button"] |
| Hero button | 1 | [id="Button_2"] |
| CTA button | 1 | [id="Button_3"] |
| Footer links | 16 | [id="UpperContent"] [id$="Links"] text:not([id="Business Development"]) |
| Logo link | 1 | [id="BargerTech Engine LOGO PNG No BKGRND 1"] |
| Mobile menu toggle | not in the design | — |

Inputs, dropdowns, checkboxes, radio buttons, tabs and toggles: none on this screen, so all their states are State not designed.

## D1.2 Designed states

| Component | State | Background | Text colour | Border | Radius | Shadow | Opacity | Cursor | Size | Font |
|---|---|---|---|---|---|---|---|---|---|---|
| Nav links | Default | none | #FFFFFF | none | — | none | 1 | Not specified | text only | 14px / 500 |
| Primary button (nav) | Default | #1B6AAA | #FFFFFF | none | 24 | none | 1 | Not specified | 154×48 | 16px / 600 |
| Hero button | Default | #1B6AAA | #FFFFFF | none | 28 | none | 1 | Not specified | 516×56 | 16px / 700 |
| CTA button | Default | #1B6AAA | #FFFFFF | none | 24 | none | 1 | Not specified | 259×48 | 16px / 600 |
| Footer links | Default | none | #4A5560 | none | — | none | 1 | Not specified | text only | 14px / 400 |
| Logo link | Default | transparent | — | none | 0 | none | 1 | Not specified | 236×80 | — |

## D1.3 States not designed

| Component | States |
|---|---|
| Nav links | hover, focus, focus-visible, active, disabled, loading, error, empty: State not designed |
| Primary button (nav) | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Hero button | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| CTA button | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Footer links | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |
| Logo link | hover, focus, focus-visible, active, selected, disabled, loading, error, empty: State not designed |

## D1.4 State coverage

6 components × 10 states = 60 state cells, of which **6 are designed** (6 default + 0 selected). No component has a focus style, so keyboard focus styling is not designed.

## D1.5 Contrast of the designed states

| Pair | Ratio | Text size / weight | WCAG AA |
|---|---|---|---|
| Primary button: label on fill | 5.69:1 | 16px / 600 | Pass |
| Secondary button (hero): label on fill | 5.69:1 | 16px / 700 | Pass |
| Secondary button (CTA): label on fill | 5.69:1 | 16px / 600 | Pass |
| Footer link on footer background | 6.71:1 | 14px / 400 | Pass |
| Nav links on the translucent pill over the hero photo | Not specified (varies with the image) | — | — |
