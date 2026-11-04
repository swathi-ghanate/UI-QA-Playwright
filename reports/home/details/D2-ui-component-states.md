# D2: UI component states (live UI)

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 1440px (mobile menu toggle at the width given per component)
- **Generated:** 2026-11-04T13:36:00.467Z by the UI Fidelity QA framework (Playwright, Chromium)

Method: page loaded with normal motion; default read first; **hover** with the real mouse (so parent :hover rules apply too); **focus**, **focus-visible** and **active** forced on the element with CSS.forcePseudoState, as the DevTools ":hov" panel does. Transitions are allowed to finish before every read, so values are end states.

## Nav links (7 items, 1440px; table shows "Why Now")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | transparent | transparent | transparent | transparent | transparent |
| text color | #FFFFFF | #3B82F6 | #FFFFFF | #FFFFFF | #FFFFFF |
| border | none | none | none | none | none |
| border-radius | 0px | 0px | 0px | 0px | 0px |
| box-shadow | none | none | none | none | none |
| outline | none | none | none | auto 1px #101010 (offset 1px) | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | none | none | none | none |
| filter | none | none | none | none | none |
| text-decoration | none | none | none | none | none |
| font-weight | 500 | 500 | 500 | 500 | 500 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 64.45×20 | 64.45×20 | 64.45×20 | 64.45×20 | 64.45×20 |

- **hover:** text color: #FFFFFF → #3B82F6
- **focus:** no visible change
- **focus-visible:** outline: none → auto 1px #101010 (offset 1px)
- **active:** no visible change
- **Transition:** color 0.15s ease-out
- **Transition with prefers-reduced-motion: reduce:** none
- **All items change the same properties:** yes

## Primary button (nav) (1 item, 1440px; table shows "Partner Sign in")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | #1B6AAA | #155685 | #1B6AAA | #1B6AAA | #1B6AAA |
| text color | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| border | none | none | none | none | none |
| border-radius | 24px | 24px | 24px | 24px | 24px |
| box-shadow | none | none | none | 0px 0px 0px 3px #1B6AAA @0.35 | none |
| outline | none | none | none | none | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | matrix(1, 0, 0, 1, 0, -2) | none | matrix(1, 0, 0, 1, 0, -2) | matrix(1, 0, 0, 1, 0, 0) |
| filter | none | brightness(1.05) | none | brightness(1.05) | brightness(0.97) |
| text-decoration | none | none | none | none | none |
| font-weight | 600 | 600 | 600 | 600 | 600 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 153.7×42 | 153.7×42 | 153.7×42 | 153.7×42 | 153.7×42 |

- **hover:** background: #1B6AAA → #155685; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **focus:** no visible change
- **focus-visible:** box-shadow: none → 0px 0px 0px 3px #1B6AAA @0.35; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **active:** transform: none → matrix(1, 0, 0, 1, 0, 0); filter: none → brightness(0.97)
- **Transition:** transform 0.2s ease-out, filter 0.2s ease-out, box-shadow 0.2s ease-out
- **Transition with prefers-reduced-motion: reduce:** none
- **All items change the same properties:** yes

## Hero button (1 item, 1440px; table shows "Begin Partner Qualification and Explore the Opportunity")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | #1B6AAA | #155685 | #1B6AAA | #1B6AAA | #1B6AAA |
| text color | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| border | none | none | none | none | none |
| border-radius | 80px | 80px | 80px | 80px | 80px |
| box-shadow | none | none | none | 0px 0px 0px 3px #1B6AAA @0.35 | none |
| outline | none | none | none | none | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | matrix(1, 0, 0, 1, 0, -2) | none | matrix(1, 0, 0, 1, 0, -2) | matrix(1, 0, 0, 1, 0, 0) |
| filter | none | brightness(1.05) | none | brightness(1.05) | brightness(0.97) |
| text-decoration | none | none | none | none | none |
| font-weight | 700 | 700 | 700 | 700 | 700 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 494.14×48 | 494.14×48 | 494.14×48 | 494.14×48 | 494.14×48 |

- **hover:** background: #1B6AAA → #155685; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **focus:** no visible change
- **focus-visible:** box-shadow: none → 0px 0px 0px 3px #1B6AAA @0.35; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **active:** transform: none → matrix(1, 0, 0, 1, 0, 0); filter: none → brightness(0.97)
- **Transition:** transform 0.2s ease-out, filter 0.2s ease-out, box-shadow 0.2s ease-out
- **Transition with prefers-reduced-motion: reduce:** none
- **All items change the same properties:** yes

## CTA button (1 item, 1440px; table shows "See If Your Organization Fits")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | #1B6AAA | #155685 | #1B6AAA | #1B6AAA | #1B6AAA |
| text color | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF | #FFFFFF |
| border | none | none | none | none | none |
| border-radius | 16px | 16px | 16px | 16px | 16px |
| box-shadow | none | none | none | 0px 0px 0px 3px #1B6AAA @0.35 | none |
| outline | none | none | none | none | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | matrix(1, 0, 0, 1, 0, -2) | none | matrix(1, 0, 0, 1, 0, -2) | matrix(1, 0, 0, 1, 0, 0) |
| filter | none | brightness(1.05) | none | brightness(1.05) | brightness(0.97) |
| text-decoration | none | none | none | none | none |
| font-weight | 600 | 600 | 600 | 600 | 600 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 282.81×42 | 282.81×42 | 282.81×42 | 282.81×42 | 282.81×42 |

- **hover:** background: #1B6AAA → #155685; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **focus:** no visible change
- **focus-visible:** box-shadow: none → 0px 0px 0px 3px #1B6AAA @0.35; transform: none → matrix(1, 0, 0, 1, 0, -2); filter: none → brightness(1.05)
- **active:** transform: none → matrix(1, 0, 0, 1, 0, 0); filter: none → brightness(0.97)
- **Transition:** transform 0.2s ease-out, filter 0.2s ease-out, box-shadow 0.2s ease-out
- **Transition with prefers-reduced-motion: reduce:** none
- **All items change the same properties:** yes

## Footer links (16 items, 1440px; table shows "Why Now")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | transparent | transparent | transparent | transparent | transparent |
| text color | #4A5560 | #1B6AAA | #4A5560 | #4A5560 | #4A5560 |
| border | none | none | none | none | none |
| border-radius | 0px | 0px | 0px | 0px | 0px |
| box-shadow | none | none | none | none | none |
| outline | none | none | none | auto 1px #101010 (offset 1px) | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | none | none | none | none |
| filter | none | none | none | none | none |
| text-decoration | none | none | none | none | none |
| font-weight | 400 | 400 | 400 | 400 | 400 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 54.7×15 | 54.7×15 | 54.7×15 | 54.7×15 | 54.7×15 |

- **hover:** text color: #4A5560 → #1B6AAA
- **focus:** no visible change
- **focus-visible:** outline: none → auto 1px #101010 (offset 1px)
- **active:** no visible change
- **Transition:** color 0.15s ease-out
- **Transition with prefers-reduced-motion: reduce:** none
- **All items change the same properties:** no (14 of 16)

## Logo link (1 item, 1440px; table shows "A")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | transparent | transparent | transparent | transparent | transparent |
| text color | #000000 | #000000 | #000000 | #000000 | #000000 |
| border | none | none | none | none | none |
| border-radius | 0px | 0px | 0px | 0px | 0px |
| box-shadow | none | none | none | none | none |
| outline | none | none | none | auto 1px #101010 (offset 1px) | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | matrix(1, 0, 0, 1, 0, 0) | matrix(1, 0, 0, 1, 0, 0) | matrix(1, 0, 0, 1, 0, 0) | matrix(1, 0, 0, 1, 0, 0) | matrix(1, 0, 0, 1, 0, 0) |
| filter | none | none | none | none | none |
| text-decoration | none | none | none | none | none |
| font-weight | 400 | 400 | 400 | 400 | 400 |
| cursor | pointer | pointer | pointer | pointer | pointer |
| size | 236×80 | 236×80 | 236×80 | 236×80 | 236×80 |

- **hover:** no visible change
- **focus:** no visible change
- **focus-visible:** outline: none → auto 1px #101010 (offset 1px)
- **active:** no visible change
- **Transition:** none (all, duration 0s)
- **Transition with prefers-reduced-motion: reduce:** none (all, duration 0s)
- **All items change the same properties:** yes

## Mobile menu toggle (1 item, 1024px; table shows "BUTTON")

| Property | default | hover | focus | focus-visible | active |
|---|---|---|---|---|---|
| background | transparent | transparent | transparent | transparent | transparent |
| text color | #000000 | #000000 | #000000 | #000000 | #000000 |
| border | none | none | none | none | none |
| border-radius | 0px | 0px | 0px | 0px | 0px |
| box-shadow | none | none | none | none | none |
| outline | none | none | none | auto 1px #101010 (offset 0px) | none |
| opacity | 1 | 1 | 1 | 1 | 1 |
| transform | none | none | none | none | none |
| filter | none | none | none | none | none |
| text-decoration | none | none | none | none | none |
| font-weight | 400 | 400 | 400 | 400 | 400 |
| cursor | default | default | default | default | default |
| size | 20×20 | 20×20 | 20×20 | 20×20 | 20×20 |

- **hover:** no visible change
- **focus:** no visible change
- **focus-visible:** outline: none → auto 1px #101010 (offset 0px)
- **active:** no visible change
- **Transition:** none (all, duration 0s)
- **Transition with prefers-reduced-motion: reduce:** none (all, duration 0s)
- **All items change the same properties:** yes

## States that cannot be forced

| State | Result |
|---|---|
| Selected / current | Not verified (no aria-current / aria-selected / aria-pressed elements on the page) |
| Disabled | Not verified (no disabled or aria-disabled elements on the page) |
| Loading | Not verified (no aria-busy, progressbar or spinner elements on the page) |
| Error | Not verified (no aria-invalid or alert elements on the page) |
| Empty | Not verified (no inputs, so no empty state on the page) |
| Inputs, dropdowns, checkboxes/radios, tabs, toggles | 0 inputs, 0 dropdowns, 0 checkboxes/radios, 0 tabs, 1 toggles (aria-expanded/switch) |

## General notes

- prefers-reduced-motion rule in the stylesheets: yes.
- Cursor, transition and box-shadow values for every component are in the tables above.
