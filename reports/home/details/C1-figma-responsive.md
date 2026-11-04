# C1: Figma responsive details (Desktop 1440)

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Frames in the file:** one, 1440 × 4372
- **Generated:** 2026-11-04T13:35:22.569Z by the UI Fidelity QA framework (Playwright, Chromium)

- **Tablet 768px and Mobile 375px:** Not specified. The file has no frame for them, so no reflow, hidden-element, sizing or image behaviour exists for those widths.
- **Breakpoints and max-width:** Not specified.

## C1.1 Frame width and layout / column structure (1440)

| Element | Structure |
|---|---|
| Frame / viewport — width | 1440px |
| Sections — stacking order | [hero, market, products, why partner, cta, footer] |
| Header — position relative to hero | overlays the hero |
| Desktop nav (7 links) — shown or hidden | shown |
| Nav button — shown or hidden | shown |
| Hamburger menu — shown or hidden | not shown |
| Market — columns | 2 |
| Products — columns | 2 |
| Partner card grid — columns | 4 |
| Partner card grid — rows | 1 |
| CTA — order (text vs media) | text left, media right |
| Footer — columns | 5 |

| Section | y range | Height |
|---|---|---|
| Hero | 0–940 | 940 |
| Market | 940–1883 | 943 |
| Products | 1883–2643 | 760 |
| Why partner | 2643–3217 | 574 |
| CTA | 3217–3821 | 604 |
| Footer | 3821–4372 | 551 |

## C1.2 How sections stack or reflow

1. Hero
2. Market
3. Products
4. Why partner
5. CTA
6. Footer

Reflow rules (when columns stack, grids drop columns, or order changes): Not specified.

## C1.3 Hidden, shown, collapsed or replaced elements

- At 1440 every layer is shown: nav pill with 7 links, nav button, all sections.
- Hamburger / collapsed menu: none in the file.
- Hidden, collapsed or replaced elements at other widths: Not specified.

## C1.4 Element sizes, spacing and padding (1440)

| Element | Width × height | x, y |
|---|---|---|
| logo | 236 × 80 | 80, 32 |
| navPill | 872 × 53 | 325, 45.5 |
| navButton | 154 × 48 | 1206, 48 |
| heroButton | 516 × 56 | 80, 690 |
| ctaButton | 259 × 48 | 80, 3693 |
| mkList | 665 × 716.92 | 619, 1022.9 |
| pfKicker | 492 × 62 | 474, 1923 |
| pfPanels | 592 × 296 | 64, 2283 |
| pfBadges | 120 × 30 | 104, 2323 |
| wpCards | 302 × 216 | 80, 2901 |
| wpIcons | 48 × 48 | 108, 2929 |
| ctaMedia | 560 × 444 | 800, 3297 |
| footer | 1440 × 551 | 0, 3821 |

## C1.5 Font sizes and line-heights (1440)

| Role | Font size | Weight | Lines | Line pitch (baseline to baseline) |
|---|---|---|---|---|
| Nav link | 14px | 500 | 1 | single line |
| Nav button label | 16px | 600 | 1 | single line |
| Hero headline (H1) | 80px | 500 | 3 | 97px |
| Hero headline accent | 80px | 500 | 1 | single line |
| Hero subtitle | 20px | 400 | 5 | 30px |
| Hero button label | 16px | 700 | 1 | single line |
| Eyebrow | 24px | 700 | 1 | single line |
| Section headline (H2) | 36px | 500 | 4 | 54px |
| Market number | 112px | 800 | 1 | single line |
| Market heading (H3) | 30px | 500 | 1 | single line |
| Market text | 16px | 400 | 2 | 24px |
| Kicker bar text | 20px | 700 | 1 | single line |
| Product badge | 12px | 600 | 1 | single line |
| Product title (H3) | 32px | 700 | 1 | single line |
| Product spec | 18px | 400 | 1 | single line |
| Product description | 16px | 400 | 2 | 24px |
| Why partner headline (H2) | 36px | 500 | 1 | single line |
| Card text | 16px | 400 | 4 | 24px |
| CTA eyebrow | 24px | 700 | 1 | single line |
| CTA statement (H2) | 36px | 500 | 4 | 54px |
| CTA subtext | 20px | 400 | 2 | 30px |
| CTA button label | 16px | 600 | 1 | single line |
| Footer company name | 20px | 700 | 1 | single line |
| Footer column heading | 12px | 700 | 1 | single line |
| Footer link | 14px | 400 | 1 | single line |
| Footer tagline | 14px | 400 | 3 | 21px |
| Footer disclaimer | 12px | 400 | 2 | 18px |
| Footer copyright | 12px | 400 | 1 | single line |

## C1.6 Image sizes, aspect ratios and cropping (1440)

| Used on | Source | Source size (aspect) | Frame (aspect) | Rendered in frame | Offset | Scaling | Position |
|---|---|---|---|---|---|---|---|
| g-energy-hero | Screenshot 2026-09-16 223033.png | 947×562 (1.685) | 1440×940 (1.532) | 1583.96×940 | x -71.98, y 0 | uniform (fills frame) | — |
| g-energy-hero › Navigation_Top_Bar | BargerTech Engine LOGO PNG No BKGRND.png | 2152×731 (2.944) | 236×80 (2.95) | 236×80.17 | x 0, y -0.08 | uniform (fills frame) | — |
| products-section-redesign › split-grid | BargerTech 40x2 Rotary Engine.png | 1254×1254 (1) | 720×760 (0.947) | 1001.45×1001.44 | x -117.01, y -138.48 | uniform (fills frame) | — |
| products-section-redesign › split-grid | BargerTech 350x2 Rotary Engine.png | 1254×1254 (1) | 720×760 (0.947) | 760×760 | x -20, y 0 | uniform (fills frame) | — |
| cta-section › Media Frame | Barger Engines in Tandem 4.png | 1402×1122 (1.25) | 560×444 (1.261) | 560×448.16 | x 0, y -2.08 | uniform (fills frame) | — |

Image behaviour at other viewports: Not specified.

## C1.7 Tables, cards, buttons and forms (1440)

- Tables and forms: none in the file.
- Cards: 4 cards, 302 × 216, 4 per row.
- Buttons: fixed sizes 154 × 48, 516 × 56, 259 × 48, default state only.
- How any of these change at smaller widths: Not specified.

## C1.8 Inconsistencies in the design itself

- "BargerTech 40x2 Rotary Engine.png" (products-section-redesign › split-grid) is cropped by 28% of its rendered size.
