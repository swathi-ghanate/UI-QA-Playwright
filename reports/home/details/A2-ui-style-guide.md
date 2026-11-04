# A2: UI style guide (live UI)

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 1440 × 900
- **Font family (body):** Inter, ui-sans-serif, system-ui, sans-serif
- **Generated:** 2026-11-04T13:35:26.623Z by the UI Fidelity QA framework (Playwright, Chromium)

All values are computed CSS read with getComputedStyle (no visual estimates). Colours are shown as hex, with alpha after "@".

## A2.1 Colour palette

| Role | Colour | Computed value | Count | CSS variable with this value | Examples |
|---|---|---|---|---|---|
| background | #1B6AAA | rgb(27, 106, 170) | 7 | none (hard-coded) | a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in"; a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore "; span.mt-3.block.h-0.5 |
| background | #FFFFFF | rgb(255, 255, 255) | 6 | --tw-ring-offset-color, --color-white | span.gm-cta-hover-arrow.flex.h-6; section#platform.relative.bg-white "A platform for energy reliability and co"; div.gm-reveal.gm-partner-card.flex "Enter a growing distributed-energy marke" |
| background | #E8F2FA | rgb(232, 242, 250) | 5 | none (hard-coded) | span.gm-icon-scale.flex.h-12; span.gm-icon-scale.flex.h-12; span.gm-icon-scale.flex.h-12 |
| background | #1B6AAA @0.8 | rgba(27, 106, 170, 0.8) | 2 | none (hard-coded) | span.inline-flex.items-start.rounded-full "Small Business"; span.inline-flex.items-start.rounded-full "Commercial & Community" |
| background | #FFFFFF @0.15 | oklab(0.999994 0.0000455678 0.0000200868 / 0.15) | 2 | none (hard-coded) | div.h-px.w-full.bg-white/15; div.h-px.w-full.bg-white/15 |
| background | #FFFFFF @0.08 | rgba(255, 255, 255, 0.08) | 1 | none (hard-coded) | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" |
| background | #FAFBFD | rgb(250, 251, 253) | 1 | none (hard-coded) | section#why-now.overflow-hidden.bg-[#FAFBFD].px-8 "THE MARKET CANNOT WAIT !! Power demand i" |
| background | #041C40 @0.83 | rgba(4, 28, 64, 0.83) | 1 | none (hard-coded) | div.absolute.left-1/2.top-5 "A platform for energy reliability and co" |
| background | #041C40 @0.55 | rgba(4, 28, 64, 0.55) | 1 | none (hard-coded) | div.absolute.inset-0.bg-[#041C408C] |
| background | #041C40 @0.7 | rgba(4, 28, 64, 0.7) | 1 | none (hard-coded) | div.relative.flex.w-full "Small Business BargerTech 40 Series 20–1" |
| background | #303030 @0.3 | rgba(48, 48, 48, 0.3) | 1 | none (hard-coded) | div.absolute.inset-0.bg-[#3030304D] |
| background | #1C1C1C @0.7 | rgba(28, 28, 28, 0.7) | 1 | none (hard-coded) | div.relative.flex.w-full "Commercial & Community BargerTech 350 Se" |
| background | #F0F6FC | rgb(240, 246, 252) | 1 | none (hard-coded) | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| background | #3B82F6 | rgb(59, 130, 246) | 1 | none (hard-coded) | div.pointer-events-none.absolute.bottom-0 |
| background | #97C2E5 | rgb(151, 194, 229) | 1 | none (hard-coded) | span.mt-3.block.h-0.5 |
| border | #97C2E5 | rgb(151, 194, 229) | 3 | none (hard-coded) | li.gm-reveal.relative.py-5 "02 Equipment constraints Conventional pi"; li.gm-reveal.relative.py-5 "03 Reliability exposure Brownouts, curta"; li.gm-reveal.relative.py-5 "04 Behind-the-meter demand Enterprises a" |
| border | #FFFFFF @0.102 | oklab(0.999994 0.0000455678 0.0000200868 / 0.102) | 2 | none (hard-coded) | div.relative.flex.w-full "Small Business BargerTech 40 Series 20–1"; div.relative.flex.w-full "Commercial & Community BargerTech 350 Se" |
| border | #FFFFFF @0.15 | rgba(255, 255, 255, 0.15) | 2 | none (hard-coded) | span.inline-flex.items-start.rounded-full "Small Business"; span.inline-flex.items-start.rounded-full "Commercial & Community" |
| border | #1B6AAA | rgb(27, 106, 170) | 2 | none (hard-coded) | section#partner-opportunity.relative.min-h-[750px].overflow-hidden "COOPERATIVE OPPORTUNITY The next generat"; div.relative.aspect-[2.1/1].w-full |
| border | #B8CBDC | rgb(184, 203, 220) | 2 | none (hard-coded) | div.mt-10.flex.flex-col "Public information on this website is pr"; div.border-t.border-[#B8CBDC].py-8 "BargerTech Engines OEM Commercialization" |
| border | #FFFFFF @0.1 | rgba(255, 255, 255, 0.1) | 1 | none (hard-coded) | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" |
| border | #FFFFFF @0.122 | oklab(0.999994 0.0000455678 0.0000200868 / 0.1216) | 1 | none (hard-coded) | div.absolute.left-1/2.top-5 "A platform for energy reliability and co" |
| svg fill | #4A5560 | rgb(74, 85, 96) | 1 | none (hard-coded) | svg |
| svg stroke | #1B6AAA | rgb(27, 106, 170) | 2 | none (hard-coded) | svg; svg |
| svg stroke | #5C645E | rgb(92, 100, 94) | 2 | none (hard-coded) | svg; svg |
| text | #FFFFFF | rgb(255, 255, 255) | 20 | --tw-ring-offset-color, --color-white | a.gm-nav-link.whitespace-nowrap.text-sm "Why Now"; a.gm-nav-link.whitespace-nowrap.text-sm "The Platform"; a.gm-nav-link.whitespace-nowrap.text-sm "Market Applications" |
| text | #4A5560 | rgb(74, 85, 96) | 19 | none (hard-coded) | p.text-[12px].font-normal.leading-[18px] "Powering the next generation of onsite a"; a.gm-nav-link.text-[12px].font-normal "Why Now"; a.gm-nav-link.text-[12px].font-normal "The Platform" |
| text | #1C1C1C | rgb(28, 28, 28) | 11 | none (hard-coded) | h2.mt-4.text-[20px].font-medium "Power demand is accelerating faster than"; h3.text-[16px].font-medium.leading-[24px] "Grid delays"; h3.text-[16px].font-medium.leading-[24px] "Equipment constraints" |
| text | #2C353F | rgb(44, 53, 63) | 8 | none (hard-coded) | p.mt-2.text-[12px].font-normal "New loads and expansions can face critic"; p.mt-2.text-[12px].font-normal "Conventional piston-engine and turbine s"; p.mt-2.text-[12px].font-normal "Brownouts, curtailment, and severe power" |
| text | #97C2E5 @0.16 | rgba(151, 194, 229, 0.16) | 4 | none (hard-coded) | span.absolute.right-0.-top-4 "01"; span.absolute.right-0.-top-4 "02"; span.absolute.right-0.-top-4 "03" |
| text | #1B6AAA | rgb(27, 106, 170) | 2 | none (hard-coded) | p.flex.items-center.gap-3 "THE MARKET CANNOT WAIT !!"; p.text-[12px].font-bold.uppercase "COOPERATIVE PARTNER OPPORTUNITIES" |
| text | #CBE0F3 | rgb(203, 224, 243) | 2 | none (hard-coded) | p.w-full.text-[12px].font-normal "20–100 kW modular rotary platform."; p.w-full.text-[12px].font-normal "500 kW–2 MW modular rotary platform." |
| text | #FAFAFA @0.8 | rgba(250, 250, 250, 0.8) | 2 | none (hard-coded) | p.w-full.text-[12px].font-normal "Commercial facilities, agriculture, tele"; p.w-full.text-[12px].font-normal "Industrial power, data centers, campuses" |
| text | #5C645E | rgb(92, 100, 94) | 2 | none (hard-coded) | p "Public information on this website is pr"; p.text-center.text-[12px].leading-[18px] "© 2026 BargerTech Ltd. All rights reserv" |
| text | #3B82F6 | rgb(59, 130, 246) | 1 | none (hard-coded) | span.text-[#3B82F6] "Power" |
| text | #97C2E5 | rgb(151, 194, 229) | 1 | none (hard-coded) | p.text-[12px].font-bold.uppercase "COOPERATIVE OPPORTUNITY" |
| text | #94A3B8 | rgb(148, 163, 184) | 1 | none (hard-coded) | p.mt-6.text-xl.leading-[30px] "Join BargerTech’s exclusive network of q" |

Error / success / warning colours: Not verified (no status messages in the DOM).

## A2.2 Typography

### By role

| Role | Family | Size | Weight | Line-height | Letter-spacing | Transform | Colour |
|---|---|---|---|---|---|---|---|
| Nav link | Inter | 14px | 500 | 20px | normal | none | #FFFFFF |
| Nav button label | Inter | 16px | 600 | 18px | normal | none | #FFFFFF |
| Hero headline (H1) | Inter | 80px | 500 | 96px | normal | none | #FFFFFF |
| Hero headline accent | Inter | 80px | 500 | 96px | normal | none | #3B82F6 |
| Hero subtitle | Inter | 20px | 400 | 28px | normal | none | #FFFFFF |
| Hero button label | Inter | 16px | 700 | 18px | normal | none | #FFFFFF |
| Eyebrow | Inter | 24px | 700 | 24px | 0% | uppercase | #1B6AAA |
| Section headline (H2) | Inter | 36px | 500 | 54px | 0% | none | #1C1C1C |
| Market number | Manrope | 112px | 800 | 112px | normal | none | #97C2E5 @0.16 |
| Market heading (H3) | Inter | 30px | 500 | 45px | normal | none | #1C1C1C |
| Market text | Inter | 16px | 400 | 26px | 0% | none | #2C353F |
| Kicker bar text | Inter | 20px | 600 | 30px | normal | none | #FFFFFF |
| Product badge | Inter | 12px | 600 | 16px | normal | none | #FFFFFF |
| Product title (H3) | Inter | 32px | 700 | 48px | normal | none | #FFFFFF |
| Product spec | Inter | 16px | 400 | 20px | normal | none | #CBE0F3 |
| Product description | Inter | 16px | 400 | 20px | normal | none | #FAFAFA @0.8 |
| Why partner headline (H2) | Inter | 36px | 500 | 54px | 0% | none | #1C1C1C |
| Card text | Inter | 16px | 400 | 24px | 0% | none | #2C353F |
| CTA eyebrow | Inter | 24px | 700 | 24px | 0% | uppercase | #97C2E5 |
| CTA statement (H2) | Inter | 36px | 500 | 54px | normal | none | #FFFFFF |
| CTA subtext | Inter | 20px | 400 | 30px | normal | none | #94A3B8 |
| CTA button label | Inter | 16px | 600 | 18px | normal | none | #FFFFFF |
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
| Inter | 14px | 500 | 20px | normal | none | A | 7 |
| Inter | 80px | 500 | 96px | normal | none | SPAN | 4 |
| Manrope | 112px | 800 | 112px | normal | none | SPAN | 4 |
| Inter | 30px | 500 | 45px | normal | none | H3 | 4 |
| Inter | 16px | 400 | 26px | 0% | none | P | 4 |
| Inter | 16px | 400 | 20px | normal | none | P | 4 |
| Inter | 16px | 400 | 24px | 0% | none | P | 4 |
| Inter | 12px | 700 | 18px | normal | none | P | 4 |
| Inter | 24px | 700 | 24px | 0% | uppercase | P | 3 |
| Inter | 16px | 600 | 18px | normal | none | A | 2 |
| Inter | 36px | 500 | 54px | 0% | none | H2 | 2 |
| Inter | 12px | 600 | 16px | normal | none | SPAN | 2 |
| Inter | 32px | 700 | 48px | normal | none | H3 | 2 |
| Inter | 14px | 400 | 21px | normal | none | P | 2 |
| Inter | 20px | 400 | 28px | normal | none | P | 1 |
| Inter | 16px | 700 | 18px | normal | none | SPAN | 1 |
| Inter | 20px | 600 | 30px | normal | none | P | 1 |
| Inter | 36px | 500 | 54px | normal | none | H2 | 1 |
| Inter | 20px | 400 | 30px | normal | none | P | 1 |
| Inter | 20px | 700 | 30px | normal | none | H3 | 1 |
| Inter | 14px | 400 | 18px | normal | none | SPAN | 1 |

## A2.3 Layout and spacing (key containers)

| Element | Display | Padding (t r b l) | Gap | Margin (t r b l) | Max-width |
|---|---|---|---|---|---|
| header | block | 16px 80px 16px 80px | normal | 0px 0px 0px 0px | none |
| heroContent | flex | 73px 80px 48px 80px | 32px | 0px 0px 0px 0px | none |
| mkSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| mkGrid | grid | 0px 0px 0px 0px | 80px | 0px 0px 0px 0px | 1670px |
| mkList | block | 0px 0px 0px 0px | normal | 0px 0px 0px 0px | none |
| pfSection | block | 0px 0px 0px 0px | normal | 0px 0px 0px 0px | none |
| pfGrid | grid | 0px 0px 0px 0px | normal | 0px 0px 0px 0px | none |
| pfPanel | flex | 32px 64px 64px 64px | 20px | 0px 0px 0px 0px | none |
| wpSection | block | 100px 80px 100px 80px | normal | 0px 0px 0px 0px | none |
| wpGrid | grid | 0px 0px 0px 0px | 24px | 40px 0px 0px 0px | none |
| ctaSection | block | 80px 80px 80px 80px | normal | 0px 0px 0px 0px | none |
| ctaContent | flex | 0px 0px 0px 0px | 64px | 0px 0px 0px 0px | 1670px |
| footer | block | 64px 80px 0px 80px | normal | 0px 0px 0px 0px | none |
| footerCols | grid | 0px 0px 56px 0px | 32px | 0px 0px 0px 0px | none |

## A2.4 Borders, radius, shadows

| Border-radius | Count | Examples |
|---|---|---|
| full (pill / circle) | 14 | nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications"; a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in"; a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore "; span.gm-cta-hover-arrow.flex.h-6 |
| 16px | 6 | div.gm-reveal.gm-partner-card.flex "Enter a growing distributed-energy marke"; div.gm-reveal.gm-partner-card.flex "Build on a structured technology and com"; div.gm-reveal.gm-partner-card.flex "Combine regional manufacturing with comm"; div.gm-reveal.gm-partner-card.flex "Participate in long-term platform evolut" |
| 24px | 3 | div.relative.flex.w-full "Small Business BargerTech 40 Series 20–1"; div.relative.flex.w-full "Commercial & Community BargerTech 350 Se"; div.relative.aspect-[2.1/1].w-full |

| Box-shadow (visible layers) | Count | Examples |
|---|---|---|
| rgba(10, 13, 18, 0.1) 0px 1px 3px 0px, rgba(10, 13, 18, 0.1) 0px 1px 2px -1px | 4 | div.gm-reveal.gm-partner-card.flex "Enter a growing distributed-energy marke"; div.gm-reveal.gm-partner-card.flex "Build on a structured technology and com"; div.gm-reveal.gm-partner-card.flex "Combine regional manufacturing with comm"; div.gm-reveal.gm-partner-card.flex "Participate in long-term platform evolut" |
| rgba(59, 130, 246, 0.2) 0px 0px 20px 0px, rgba(27, 106, 170, 0.25) 0px 20px 40px 0px | 1 | div.relative.aspect-[2.1/1].w-full |

## A2.5 Icons

| Type | Size | Colour | Fill | Stroke | Stroke width | Background | Source | Where |
|---|---|---|---|---|---|---|---|---|
| inline SVG | 16×16 | #1B6AAA | none | rgb(27, 106, 170) | 2px | — | — | section.relative.min-h-[580px].overflow-hidden "Why Now The Platform Market Applications" |
| styled span | 48×48 | #000000 | — | — | — | #E8F2FA | — | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| styled span | 48×48 | #000000 | — | — | — | #E8F2FA | — | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| styled span | 48×48 | #000000 | — | — | — | #E8F2FA | — | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| styled span | 48×48 | #000000 | — | — | — | #E8F2FA | — | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| img | 24×24 | #000000 | — | — | — | — | svg%3e | section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" |
| inline SVG | 16×16 | #5C645E | none | rgb(92, 100, 94) | 1.6px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |
| inline SVG | 16×16 | #4A5560 | rgb(74, 85, 96) | none | 1px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |
| inline SVG | 20×20 | #1B6AAA | none | rgb(27, 106, 170) | 1.6px | — | — | footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " |

## A2.6 Base components (default state; hover, focus and active are in D2)

| Component | Background | Text | Border | Radius | Shadow | Padding | Font | Cursor | Transition |
|---|---|---|---|---|---|---|---|---|---|
| Primary button (nav) | #1B6AAA | #FFFFFF | 0px solid #FFFFFF | 24px | none | 12px 20px 12px 20px | 16px / 600 | pointer | none |
| Hero button | #1B6AAA | #FFFFFF | 0px solid #FFFFFF | 80px | none | 12px 8px 12px 20px | 16px / 700 | pointer | none |
| CTA button | #1B6AAA | #FFFFFF | 0px solid #FFFFFF | 16px | none | 12px 32px 12px 32px | 16px / 600 | pointer | none |
| Nav link | transparent | #FFFFFF | 0px solid #FFFFFF | 0px | none | 0px 0px 0px 0px | 14px / 500 | pointer | none |
| Footer link | transparent | #4A5560 | 0px solid #4A5560 | 0px | none | 0px 0px 0px 0px | 12px / 400 | pointer | none |
| Product badge | #1B6AAA @0.8 | #FFFFFF | 1px solid #FFFFFF @0.15 | 3.35544e+07px | none | 6px 16px 6px 16px | 12px / 600 | auto | all |
| Partner card | #FFFFFF | #000000 | 0px solid #000000 | 16px | yes (see A2.4) | 28px 28px 28px 28px | 16px / 400 | auto | none 0.45s |

Inputs: Not verified (none on the page).

## A2.7 Tokens vs hard-coded values

- 136 CSS custom properties are defined (22 of them colours).
- 131 distinct arbitrary-value classes (hard-coded values such as `bg-[#1B6AAA]`) are used 398 times.
- Most used hard-coded classes: `leading-[18px]` ×41, `text-[12px]` ×40, `text-[#4A5560]` ×19, `hover:text-[#1B6AAA]` ×16, `tracking-[0%]` ×13, `text-[#1C1C1C]` ×11, `text-[16px]` ×8, `leading-[24px]` ×8, `text-[#2C353F]` ×8, `hover:text-[#3B82F6]` ×7, `bg-[#1B6AAA]` ×7, `rounded-[24px]` ×7, `sm:leading-[18px]` ×7, `leading-[30px]` ×7, `text-[20px]` ×6, `sm:leading-[30px]` ×5, `bg-[#E8F2FA]` ×5, `font-['Manrope',sans-serif]` ×4, `text-[112px]` ×4, `text-[rgba(151,194,229,0.16)]` ×4
- Stylesheets that could not be read (cross-origin): https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;1,400&family=Platypi:wght@700&display=swap, https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap

## A2.8 Inconsistencies on the live page

- Near-duplicate colours, text: #4A5560 and #5C645E (RGB distance 24; check it is intentional).
- Near-duplicate colours, background: #FFFFFF and #E8F2FA (RGB distance 27; check it is intentional).
- Near-duplicate colours, background: #FFFFFF and #FAFBFD (RGB distance 7; check it is intentional).
- Near-duplicate colours, background: #FFFFFF and #F0F6FC (RGB distance 18; check it is intentional).
- Near-duplicate colours, background: #E8F2FA and #FAFBFD (RGB distance 20; check it is intentional).
- Near-duplicate colours, background: #E8F2FA and #F0F6FC (RGB distance 9; check it is intentional).
- Near-duplicate colours, background: #FAFBFD and #F0F6FC (RGB distance 11; check it is intentional).
- Near-duplicate colours, border: #97C2E5 and #B8CBDC (RGB distance 35; check it is intentional).
- 3 different border radii: full (pill / circle), 16px, 24px.
- H1 font weights: none.
- H2 font weights: 500.
- H3 font weights: 500, 700 (inconsistent).
- 10 different font sizes in 22 text styles.
