# A2: UI style guide (live UI)

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Viewport:** 1440 × 900
- **Font family (body):** Inter, ui-sans-serif, system-ui, sans-serif
- **Generated:** 2026-11-04T13:35:27.382Z by the UI Fidelity QA framework (Playwright, Chromium)

All values are computed CSS read with getComputedStyle (no visual estimates). Colours are shown as hex, with alpha after "@".

## A2.1 Colour palette

| Role | Colour | Computed value | Count | CSS variable with this value | Examples |
|---|---|---|---|---|---|
| background | #1B6AAA | rgb(27, 106, 170) | 9 | none (hard-coded) | a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in"; div.pointer-events-none.absolute.-left-[100px]; span.gm-checklist-icon.flex.h-6 |
| background | #E8F2FA | rgb(232, 242, 250) | 7 | none (hard-coded) | span.hidden.h-12.w-12; span.hidden.h-12.w-12; span.hidden.h-12.w-12 |
| background | #FFFFFF @0.03 | oklab(0.999994 0.0000455678 0.0000200868 / 0.03) | 5 | none (hard-coded) | li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume"; li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c"; li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" |
| background | #CBE0F3 | rgb(203, 224, 243) | 2 | none (hard-coded) | a.gm-fade-slide-up.gm-cta-hover.inline-flex "See Partner Fit"; a.gm-cta-hover.inline-flex.h-[34px] "See Partner Fit & Process" |
| background | #FAFBFD | rgb(250, 251, 253) | 2 | none (hard-coded) | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par"; section.overflow-hidden.bg-[#FAFBFD].px-8 "The objective is not to collect the larg" |
| background | #FFFFFF | rgb(255, 255, 255) | 2 | --tw-ring-offset-color, --color-white | section.overflow-hidden.bg-white.px-8 "IDEAL ALIGNMENT Who BargerTech Wants to "; div.h-0.5.w-16.shrink-0 |
| background | #3B82F6 | rgb(59, 130, 246) | 2 | none (hard-coded) | div.pointer-events-none.absolute.left-[900px]; div.pointer-events-none.absolute.-right-[300px] |
| background | #FFFFFF @0.08 | rgba(255, 255, 255, 0.08) | 1 | none (hard-coded) | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" |
| background | #082E5A | rgb(8, 46, 90) | 1 | none (hard-coded) | div.gm-reveal.relative.mx-auto "The objective is not to collect the larg" |
| border | #CBE0F3 | rgb(203, 224, 243) | 5 | none (hard-coded) | li.gm-slide-in-right.flex.items-start "01 Access to an established energy platf"; li.gm-slide-in-right.flex.items-start "02 A structured technology deployment an"; li.gm-slide-in-right.flex.items-start "03 Regional or territorial opportunities" |
| border | #FFFFFF @0.08 | oklab(0.999994 0.0000455678 0.0000200868 / 0.08) | 5 | none (hard-coded) | li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume"; li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c"; li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" |
| border | transparent | rgba(0, 0, 0, 0) | 5 | --tw-gradient-from, --tw-gradient-via, --tw-gradient-to | li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume"; li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c"; li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" |
| border | #1B6AAA | rgb(27, 106, 170) | 4 | none (hard-coded) | a.gm-fade-slide-up.gm-cta-hover.inline-flex "See Partner Fit"; div.gm-scale-in.aspect-[1033/1523].h-auto; section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| border | #B8CBDC | rgb(184, 203, 220) | 2 | none (hard-coded) | div.mt-10.flex.flex-col "Public information on this website is pr"; div.border-t.border-[#B8CBDC].py-8 "BargerTech Engines OEM Commercialization" |
| border | #FFFFFF @0.1 | rgba(255, 255, 255, 0.1) | 1 | none (hard-coded) | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" |
| svg fill | #4A5560 | rgb(74, 85, 96) | 1 | none (hard-coded) | svg |
| svg stroke | #5C645E | rgb(92, 100, 94) | 2 | none (hard-coded) | svg; svg |
| svg stroke | #1B6AAA | rgb(27, 106, 170) | 1 | none (hard-coded) | svg |
| text | #FFFFFF | rgb(255, 255, 255) | 24 | --tw-ring-offset-color, --color-white | a.gm-nav-link.whitespace-nowrap.text-sm "Why Now"; a.gm-nav-link.whitespace-nowrap.text-sm "The Platform"; a.gm-nav-link.whitespace-nowrap.text-sm "Market Applications" |
| text | #4A5560 | rgb(74, 85, 96) | 19 | none (hard-coded) | p.text-[12px].font-normal.leading-[18px] "Powering the next generation of onsite a"; a.gm-nav-link.text-[12px].font-normal "Why Now"; a.gm-nav-link.text-[12px].font-normal "The Platform" |
| text | #1B6AAA | rgb(27, 106, 170) | 10 | none (hard-coded) | a.gm-fade-slide-up.gm-cta-hover.inline-flex "See Partner Fit"; p.font-['Inter'].text-[12px].font-bold "STRATEGIC ADVANTAGE"; span.shrink-0.font-['Inter'].text-[16px] "01" |
| text | #1C1C1C | rgb(28, 28, 28) | 7 | none (hard-coded) | h2.font-['Inter'].text-[20px].font-medium "What a Strategic Partner May Gain"; h2.font-['Inter'].text-[20px].font-medium "Who BargerTech Wants to Meet"; h3.text-[20px].font-bold.leading-[30px] "BargerTech" |
| text | #2C353F | rgb(44, 53, 63) | 6 | none (hard-coded) | p.min-w-0.font-['Inter'].text-[12px] "Access to an established energy platform"; p.min-w-0.font-['Inter'].text-[12px] "A structured technology deployment and m"; p.min-w-0.font-['Inter'].text-[12px] "Regional or territorial opportunities de" |
| text | #FFFFFF @0.92 | oklab(0.999994 0.0000455678 0.0000200868 / 0.92) | 6 | none (hard-coded) | p.font-['Inter'].text-[12px].font-normal "Manufacturing, quality, supply chain, ce"; p.font-['Inter'].text-[12px].font-normal "System, controls, packaging, installatio"; p.font-['Inter'].text-[12px].font-normal "Project origination, financing, operatio" |
| text | #5C645E | rgb(92, 100, 94) | 2 | none (hard-coded) | p "Public information on this website is pr"; p.text-center.text-[12px].leading-[18px] "© 2026 BargerTech Ltd. All rights reserv" |
| text | #3B82F6 | rgb(59, 130, 246) | 1 | none (hard-coded) | span.text-[#3B82F6] "Start from Zero." |
| text | #97C2E5 | rgb(151, 194, 229) | 1 | none (hard-coded) | p.font-['Inter'].text-[12px].font-bold "PLATFORM VALUES" |

Error / success / warning colours: Not verified (no status messages in the DOM).

## A2.2 Typography

### By role

| Role | Family | Size | Weight | Line-height | Letter-spacing | Transform | Colour |
|---|---|---|---|---|---|---|---|
| Nav link | Inter | 14px | 500 | 20px | normal | none | #FFFFFF |
| Nav link (current page) | Inter | 14px | 700 | 20px | normal | none | #FFFFFF |
| Nav button label | Inter | 16px | 600 | 18px | normal | none | #FFFFFF |
| Hero headline (H1) | Inter | 80px | 500 | 86px | normal | none | #FFFFFF |
| Hero subtitle | Inter | 20px | 400 | 28px | normal | none | #FFFFFF |
| Hero button label | Inter | 16px | 600 | 18px | normal | none | #1B6AAA |
| Eyebrow | Inter | 24px | 700 | 24px | 0% | uppercase | #1B6AAA |
| Section headline (H2) | Inter | 28px | 500 | 42px | 0% | none | #1C1C1C |
| Benefit number | Inter | 16px | 700 | 24px | normal | none | #1B6AAA |
| Benefit text | Inter | 16px | 400 | 24px | 0% | none | #2C353F |
| Card heading (H3) | Inter | 22px | 700 | 30px | 0% | none | #FFFFFF |
| Card description | Inter | 16px | 400 | 24px | 0% | none | #FFFFFF @0.92 |
| Platform statement (H2) | Inter | 28px | 500 | 42px | 0% | none | #FFFFFF |
| Bullet row text | Inter | 16px | 500 | 26px | 0% | none | #FFFFFF |
| CTA statement | Inter | 28px | 500 | 40px | 0% | none | #FFFFFF |
| CTA button label | Inter | 14px | 600 | 20px | normal | none | #1B6AAA |
| Footer company name | Inter | 20px | 700 | 30px | normal | none | #1C1C1C |
| Footer column heading | Inter | 12px | 700 | 18px | normal | none | #1C1C1C |
| Footer link | Inter | 12px | 400 | 18px | normal | none | #4A5560 |
| Footer tagline | Inter | 14px | 400 | 21px | normal | none | #4A5560 |
| Footer disclaimer | Inter | 14px | 400 | 21px | normal | none | #5C645E |
| Footer copyright | Inter | 12px | 400 | 18px | normal | none | #5C645E |

### Every text style on the page

| Family | Size | Weight | Line-height | Letter-spacing | Transform | Tags | Count |
|---|---|---|---|---|---|---|---|
| Inter | 12px | 400 | 18px | normal | none | A LI SPAN P | 18 |
| Inter | 16px | 400 | 24px | 0% | none | P | 12 |
| Inter | 14px | 500 | 20px | normal | none | A | 6 |
| Inter | 16px | 700 | 24px | normal | none | SPAN | 6 |
| Inter | 22px | 700 | 30px | 0% | none | H3 | 6 |
| Inter | 16px | 500 | 26px | 0% | none | P | 5 |
| Inter | 12px | 700 | 18px | normal | none | P | 4 |
| Inter | 80px | 500 | 86px | normal | none | SPAN | 3 |
| Inter | 24px | 700 | 24px | 0% | uppercase | P | 3 |
| Inter | 28px | 500 | 42px | 0% | none | H2 | 3 |
| Inter | 16px | 600 | 18px | normal | none | A | 2 |
| Inter | 14px | 400 | 21px | normal | none | P | 2 |
| Inter | 14px | 700 | 20px | normal | none | A | 1 |
| Inter | 20px | 400 | 28px | normal | none | P | 1 |
| Inter | 28px | 500 | 40px | 0% | none | P | 1 |
| Inter | 14px | 600 | 20px | normal | none | A | 1 |
| Inter | 20px | 700 | 30px | normal | none | H3 | 1 |
| Inter | 14px | 400 | 18px | normal | none | SPAN | 1 |

## A2.3 Layout and spacing (key containers)

| Element | Display | Padding (t r b l) | Gap | Margin (t r b l) | Max-width |
|---|---|---|---|---|---|
| header | block | 16px 80px 16px 80px | normal | 0px 0px 0px 0px | none |
| heroContent | flex | 73px 80px 64px 80px | 32px | 0px 0px 0px 0px | none |
| advSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| advSplit | flex | 0px 0px 0px 0px | 64px | 0px 0px 0px 0px | none |
| advList | flex | 0px 0px 0px 0px | 24px | 0px 0px 0px 0px | none |
| ptSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| ptGrid | grid | 0px 0px 0px 0px | 24px | 0px 0px 0px 0px | none |
| plSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| plGrid | grid | 0px 0px 0px 0px | 80px | 0px 0px 0px 0px | 1700px |
| plList | flex | 0px 0px 0px 0px | 16px | 0px 0px 0px 0px | none |
| ctaSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| ctaCard | flex | 64px 64px 64px 64px | 24px | 0px 0px 0px 0px | 1760px |
| footer | block | 64px 80px 0px 80px | normal | 0px 0px 0px 0px | none |
| footerCols | grid | 0px 0px 56px 0px | 32px | 0px 0px 0px 0px | none |

## A2.4 Borders, radius, shadows

| Border-radius | Count | Examples |
|---|---|---|
| full (pill / circle) | 19 | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications"; a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in"; a.gm-fade-slide-up.gm-cta-hover.inline-flex "See Partner Fit"; span.hidden.h-12.w-12 |
| 20px | 6 | div.gm-reveal.gm-partner-image-card.group "OEM Parts Manufacturers and Supply Compo"; div.gm-reveal.gm-partner-image-card.group "Generator Package Supply Partners & Powe"; div.gm-reveal.gm-partner-image-card.group "Energy-as-a-Service Providers - Power by"; div.gm-reveal.gm-partner-image-card.group "Natural-Gas & Resource Companies Fuel ac" |
| 12px | 5 | li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume"; li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c"; li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci"; li.gm-checklist-row.gm-left-border-row.flex "Performance-based rights defined in fina" |
| 16px | 3 | div.gm-scale-in.aspect-[1033/1523].h-auto; div.gm-reveal.relative.mx-auto "The objective is not to collect the larg"; a.gm-cta-hover.inline-flex.h-[34px] "See Partner Fit & Process" |

| Box-shadow (visible layers) | Count | Examples |
|---|---|---|
| rgba(0, 0, 0, 0.08) 0px 10px 28px -10px | 6 | div.gm-reveal.gm-partner-image-card.group "OEM Parts Manufacturers and Supply Compo"; div.gm-reveal.gm-partner-image-card.group "Generator Package Supply Partners & Powe"; div.gm-reveal.gm-partner-image-card.group "Energy-as-a-Service Providers - Power by"; div.gm-reveal.gm-partner-image-card.group "Natural-Gas & Resource Companies Fuel ac" |

## A2.5 Icons

| Type | Size | Colour | Fill | Stroke | Stroke width | Background | Source | Where |
|---|---|---|---|---|---|---|---|---|
| img | 48×2 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | oem-shield-icon-4-BG41MZKt.svg | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" |
| img | 48×2 | #000000 | — | — | — | — | svg%3e | section.overflow-hidden.bg-white.px-8 "IDEAL ALIGNMENT Who BargerTech Wants to " |
| img | 48×2 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| styled span | 24×24 | #000000 | — | — | — | #1B6AAA | — | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| img | 12×12 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| styled span | 24×24 | #000000 | — | — | — | #1B6AAA | — | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| img | 12×12 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| styled span | 24×24 | #000000 | — | — | — | #1B6AAA | — | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| img | 12×12 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| styled span | 24×24 | #000000 | — | — | — | #1B6AAA | — | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| img | 12×12 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| styled span | 24×24 | #000000 | — | — | — | #1B6AAA | — | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| img | 12×12 | #000000 | — | — | — | — | svg%3e | section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" |
| inline SVG | 16×16 | #5C645E | none | rgb(92, 100, 94) | 1.6px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |
| inline SVG | 16×16 | #4A5560 | rgb(74, 85, 96) | none | 1px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |
| inline SVG | 20×20 | #1B6AAA | none | rgb(27, 106, 170) | 1.6px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |

## A2.6 Base components (default state; hover, focus and active are in D2)

| Component | Background | Text | Border | Radius | Shadow | Padding | Font | Cursor | Transition |
|---|---|---|---|---|---|---|---|---|---|
| Primary button (nav) | #1B6AAA | #FFFFFF | 0px solid #FFFFFF | 24px | none | 12px 20px 12px 20px | 16px / 600 | pointer | none |
| Secondary button (hero) | #CBE0F3 | #1B6AAA | 1px solid #1B6AAA | 28px | none | 16px 24px 16px 24px | 16px / 600 | pointer | none |
| Secondary button (CTA) | #CBE0F3 | #1B6AAA | 1px solid #1B6AAA | 16px | none | 8px 16px 8px 16px | 14px / 600 | pointer | none |
| Nav link | transparent | #FFFFFF | 0px solid #FFFFFF | 0px | none | 0px 0px 0px 0px | 14px / 500 | pointer | none |
| Footer link | transparent | #4A5560 | 0px solid #4A5560 | 0px | none | 0px 0px 0px 0px | 12px / 400 | pointer | none |
| Partner card | transparent | #000000 | 0px solid #000000 | 20px | yes (see A2.4) | 0px 0px 0px 0px | 16px / 400 | auto | none 0.6s |

Inputs: Not verified (none on the page).

## A2.7 Tokens vs hard-coded values

- 136 CSS custom properties are defined (22 of them colours).
- 123 distinct arbitrary-value classes (hard-coded values such as `bg-[#1B6AAA]`) are used 489 times.
- Most used hard-coded classes: `leading-[18px]` ×49, `text-[12px]` ×48, `font-['Inter']` ×37, `tracking-[0%]` ×30, `text-[#4A5560]` ×19, `hover:text-[#1B6AAA]` ×16, `text-[16px]` ×12, `leading-[24px]` ×12, `sm:text-[16px]` ×12, `sm:leading-[24px]` ×12, `text-[#1B6AAA]` ×10, `bg-[#1B6AAA]` ×8, `hover:text-[#3B82F6]` ×7, `text-[#1C1C1C]` ×7, `bg-[#E8F2FA]` ×7, `border-[#CBE0F3]` ×6, `text-[#2C353F]` ×6, `h-[220px]` ×6, `rounded-[12px]` ×6, `shadow-[0px_4px_12px_-2px_rgba(0,0,0,0.10)]` ×6
- Stylesheets that could not be read (cross-origin): https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;1,400&family=Platypi:wght@700&display=swap, https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap

## A2.8 Inconsistencies on the live page

- Near-duplicate colours, text: #4A5560 and #5C645E (RGB distance 24; check it is intentional).
- Near-duplicate colours, background: #E8F2FA and #CBE0F3 (RGB distance 35; check it is intentional).
- Near-duplicate colours, background: #E8F2FA and #FAFBFD (RGB distance 20; check it is intentional).
- Near-duplicate colours, background: #E8F2FA and #FFFFFF (RGB distance 27; check it is intentional).
- Near-duplicate colours, background: #FAFBFD and #FFFFFF (RGB distance 7; check it is intentional).
- Near-duplicate colours, border: #CBE0F3 and #B8CBDC (RGB distance 36; check it is intentional).
- 4 different border radii: full (pill / circle), 20px, 12px, 16px.
- H1 font weights: none.
- H2 font weights: 500.
- H3 font weights: 700.
- 8 different font sizes in 18 text styles.
