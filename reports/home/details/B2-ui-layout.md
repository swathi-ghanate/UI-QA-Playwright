# B2: UI layout analysis (live UI)

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 1440 × 900
- **Generated:** 2026-11-04T13:35:26.466Z by the UI Fidelity QA framework (Playwright, Chromium)

All values are computed CSS and getBoundingClientRect() boxes in page coordinates.

## B2.1 Global page layout

- **Viewport width:** 1440px (client width 1440px). **Document:** 1440 × 4307.
- **Body max-width:** none. **Root font size:** 16px.
- **Content container (Why partner cards):** x 80, width 1280.
- **Max-width values used by containers:** 1670px.
- **Sidebar:** none.

## B2.2 Sections, top to bottom

| Element | x, y | Width × height | Display | Position | Padding (t r b l) | Margin (t r b l) | Background |
|---|---|---|---|---|---|---|---|
| section.relative.min-h-[580px].overflow-hidden "Why Now The Platform Market Applications" | 0, 0 | 1440 × 861 | block | relative | 0px 0px 0px 0px | 0px 0px 0px 0px | transparent |
| header.left-0.right-0.top-0 "Why Now The Platform Market Applications" | 0, 0 | 1440 × 112 | block | relative | 16px 80px 16px 80px | 0px 0px 0px 0px | transparent |
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | 345.25, 29 | 831.8 × 54 | flex | static | 16px 16px 16px 16px | 0px 0px 0px 0px | #FFFFFF @0.08 |
| section#why-now.overflow-hidden.bg-[#FAFBFD].px-8 "THE MARKET CANNOT WAIT !! Power demand i" | 0, 861 | 1440 × 831 | block | static | 100px 80px 100px 80px | 0px 0px 0px 0px | #FAFBFD |
| section#platform.relative.bg-white "A platform for energy reliability and co" | 0, 1692 | 1440 × 760 | block | relative | 0px 0px 0px 0px | 0px 0px 0px 0px | #FFFFFF |
| section#oem-opportunity.overflow-hidden.bg-[#F0F6FC].px-8 "COOPERATIVE PARTNER OPPORTUNITIES Why pa" | 0, 2452 | 1440 × 564 | block | static | 100px 80px 100px 80px | 0px 0px 0px 0px | #F0F6FC |
| section#partner-opportunity.relative.min-h-[750px].overflow-hidden "COOPERATIVE OPPORTUNITY The next generat" | 0, 3016 | 1440 × 623 | block | relative | 80px 80px 80px 80px | 0px 0px 0px 0px | transparent |
| footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " | 0, 3639 | 1440 × 668 | block | static | 64px 80px 0px 80px | 0px 0px 0px 0px | #E8F2FA |

Vertical spacing between sections comes from the margins and paddings above (no margins means sections touch).

## B2.3 Key containers and components

| Element | x, y | Width × height | Display | Flex direction | Grid columns | Columns (measured) | Gap | justify-content | align-items | text-align | Padding (t r b l) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| header | 0, 0 | 1440 × 112 | block | row | none | 1 | normal | normal | normal | start | 16px 80px 16px 80px |
| heroContent | 0, 112 | 1440 × 749 | flex | column | none | 1 | 32px | normal | flex-start | left | 73px 80px 48px 80px |
| mkSection | 0, 861 | 1440 × 831 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| mkGrid | 80, 961 | 1280 × 631 | grid | row | 460px 740px | 2 | 80px | normal | normal | start | 0px 0px 0px 0px |
| mkList | 620, 961 | 740 × 631 | block | row | none | 1 | normal | normal | normal | start | 0px 0px 0px 0px |
| pfSection | 0, 1692 | 1440 × 760 | block | row | none | 1 | normal | normal | normal | start | 0px 0px 0px 0px |
| pfGrid | 0, 1692 | 1440 × 760 | grid | row | 720px 720px | 2 | normal | normal | normal | start | 0px 0px 0px 0px |
| pfPanel | 64, 2107 | 592 × 305 | flex | column | none | 1 | 20px | normal | flex-start | start | 32px 64px 64px 64px |
| wpSection | 0, 2452 | 1440 × 564 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| wpGrid | 80, 2700 | 1280 × 216 | grid | row | 302px 302px 302px 302px | 4 | 24px | normal | normal | start | 0px 0px 0px 0px |
| ctaSection | 0, 3016 | 1440 × 623 | block | row | none | 1 | normal | normal | normal | start | 80px 80px 80px 80px |
| ctaContent | 80, 3097 | 1280 × 462 | flex | row | none | 2 | 64px | normal | center | start | 0px 0px 0px 0px |
| footer | 0, 3639 | 1440 × 668 | block | row | none | 1 | normal | normal | normal | start | 64px 80px 0px 80px |
| footerCols | 80, 3703 | 1280 × 334 | grid | column | 230.391px 230.406px 230.391px 230.406px 230.391px | 5 | 32px | normal | normal | start | 0px 0px 56px 0px |
| logo | 80, 16 | 236 × 80 | block | row | none | 1 | normal | normal | normal | start | 0px 0px 0px 0px |
| navPill | 345.25, 29 | 831.8 × 54 | flex | row | none | 7 | 24px | normal | center | start | 16px 16px 16px 16px |
| navButton | 1206.3, 35 | 153.7 × 42 | flex | row | none | 0 | normal | center | center | start | 12px 20px 12px 20px |
| heroButton | 80, 765 | 494.14 × 48 | flex | row | none | 2 | 8px | space-between | center | left | 12px 8px 12px 20px |
| ctaButton | 80, 3500 | 282.81 × 42 | inline-flex | row | none | 0 | normal | center | center | start | 12px 32px 12px 32px |
| pfPanels | 64, 2107 | 592 × 305 | flex | column | none | 1 | 20px | normal | flex-start | start | 32px 64px 64px 64px |
| wpCards | 80, 2700 | 302 × 216 | flex | column | none | 1 | 16px | normal | flex-start | start | 28px 28px 28px 28px |

## B2.4 Grid and flex containers on the page

| Element | x, y | Width × height | Display | Direction | Grid columns | Columns | Gap | justify | align | Padding |
|---|---|---|---|---|---|---|---|---|---|---|
| div.flex.w-full.items-center "Why Now The Platform Market Applications" | 80, 16 | 1280 × 80 | flex | row | none | 3 | normal | space-between | center | 0px 0px 0px 0px |
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | 345.25, 29 | 831.8 × 54 | flex | row | none | 7 | 24px | normal | center | 16px 16px 16px 16px |
| div.gm-fade-slide-up.flex.shrink-0 "Partner Sign in" | 1206.3, 35 | 153.7 × 42 | flex | row | none | 1 | 16px | normal | center | 0px 0px 0px 0px |
| a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in" | 1206.3, 35 | 153.7 × 42 | flex | row | none | 0 | normal | center | center | 12px 20px 12px 20px |
| div.relative.z-10.flex "The Engine That Can Power What Comes Nex" | 0, 112 | 1440 × 749 | flex | column | none | 1 | 32px | normal | flex-start | 73px 80px 48px 80px |
| h1.gm-fade-slide-up.flex.w-full "The Engine That Can Power What Comes Nex" | 80, 185 | 1280 × 288 | flex | column | none | 1 | 0px | normal | normal | 0px 0px 0px 0px |
| div.gm-fade-slide-up.mt-8.flex "Begin Partner Qualification and Explore " | 80, 765 | 494.14 × 48 | flex | row | none | 1 | 16px | normal | center | 0px 0px 0px 0px |
| a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " | 80, 765 | 494.14 × 48 | flex | row | none | 2 | 8px | space-between | center | 12px 8px 12px 20px |
| div.mx-auto.grid.w-full "THE MARKET CANNOT WAIT !! Power demand i" | 80, 961 | 1280 × 631 | grid | row | 460px 740px | 2 | 80px | normal | normal | 0px 0px 0px 0px |
| p.flex.items-center.gap-3 "THE MARKET CANNOT WAIT !!" | 80, 961 | 460 × 24 | flex | row | none | 0 | 12px | normal | center | 0px 0px 0px 0px |
| div.absolute.left-1/2.top-5 "A platform for energy reliability and co" | 475.95, 1732 | 488.11 × 64 | flex | row | none | 1 | 16px | center | center | 16px 36px 16px 36px |
| div.grid.grid-cols-1.lg:grid-cols-2 "Small Business BargerTech 40 Series 20–1" | 0, 1692 | 1440 × 760 | grid | row | 720px 720px | 2 | normal | normal | normal | 0px 0px 0px 0px |
| div.gm-product-card.relative.flex "Small Business BargerTech 40 Series 20–1" | 0, 1692 | 720 × 760 | flex | column | none | 1 | 0px | flex-end | flex-start | 64px 64px 40px 64px |
| div.relative.flex.w-full "Small Business BargerTech 40 Series 20–1" | 64, 2107 | 592 × 305 | flex | column | none | 1 | 20px | normal | flex-start | 32px 64px 64px 64px |
| span.inline-flex.items-start.rounded-full "Small Business" | 129, 2140 | 121.42 × 30 | flex | row | none | 0 | normal | normal | flex-start | 6px 16px 6px 16px |
| div.flex.w-full.flex-col "BargerTech 40 Series 20–100 kW modular r" | 129, 2190 | 462 × 76 | flex | column | none | 1 | 8px | normal | flex-start | 0px 0px 0px 0px |
| div.gm-product-card.relative.flex "Commercial & Community BargerTech 350 Se" | 720, 1692 | 720 × 760 | flex | column | none | 1 | 0px | flex-end | flex-start | 64px 64px 40px 64px |
| div.relative.flex.w-full "Commercial & Community BargerTech 350 Se" | 784, 2107 | 592 × 305 | flex | column | none | 1 | 20px | normal | flex-start | 32px 64px 64px 64px |
| span.inline-flex.items-start.rounded-full "Commercial & Community" | 849, 2140 | 184.66 × 30 | flex | row | none | 0 | normal | normal | flex-start | 6px 16px 6px 16px |
| div.flex.w-full.flex-col "BargerTech 350 Series 500 kW–2 MW modula" | 849, 2190 | 462 × 76 | flex | column | none | 1 | 8px | normal | flex-start | 0px 0px 0px 0px |
| div.mt-10.grid.grid-cols-1 "Enter a growing distributed-energy marke" | 80, 2700 | 1280 × 216 | grid | row | 302px 302px 302px 302px | 4 | 24px | normal | normal | 0px 0px 0px 0px |
| div.gm-reveal.gm-partner-card.flex "Enter a growing distributed-energy marke" | 80, 2700 | 302 × 216 | flex | column | none | 1 | 16px | normal | flex-start | 28px 28px 28px 28px |
| div.gm-reveal.gm-partner-card.flex "Build on a structured technology and com" | 406, 2700 | 302 × 216 | flex | column | none | 1 | 16px | normal | flex-start | 28px 28px 28px 28px |
| div.gm-reveal.gm-partner-card.flex "Combine regional manufacturing with comm" | 732, 2700 | 302 × 216 | flex | column | none | 1 | 16px | normal | flex-start | 28px 28px 28px 28px |
| div.gm-reveal.gm-partner-card.flex "Participate in long-term platform evolut" | 1058, 2700 | 302 × 216 | flex | column | none | 1 | 16px | normal | flex-start | 28px 28px 28px 28px |
| div.gm-reveal.relative.mx-auto "COOPERATIVE OPPORTUNITY The next generat" | 80, 3097 | 1280 × 462 | flex | row | none | 2 | 64px | normal | center | 0px 0px 0px 0px |
| a.gm-cta-hover.mt-8.inline-flex "See If Your Organization Fits" | 80, 3500 | 282.81 × 42 | inline-flex | row | none | 0 | normal | center | center | 12px 32px 12px 32px |
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | 80, 3703 | 1280 × 334 | grid | column | 230.391px 230.406px 230.391px 230.406px 230.391px | 5 | 32px | normal | normal | 0px 0px 56px 0px |
| div.flex.flex-col.gap-4 "BargerTech Powering the next generation " | 80, 3703 | 230.39 × 278 | flex | column | none | 1 | 16px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Explore Why Now The Platform Market Appl" | 342.39, 3703 | 230.41 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Partners Begin Partner Qualification Par" | 604.8, 3703 | 230.39 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Contact Business Development Contact Bus" | 867.19, 3703 | 230.41 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| a.flex.items-start.gap-2 "Contact Business Development" | 867.19, 3771 | 230.41 × 18 | flex | row | none | 2 | 8px | normal | flex-start | 0px 0px 0px 0px |
| a.flex.items-center.gap-2 "LinkedIn" | 867.19, 3801 | 230.41 × 18 | flex | row | none | 2 | 8px | normal | center | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Legal Privacy Terms of Use Cookie Notice" | 1129.59, 3703 | 230.39 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.mt-10.flex.flex-col "Public information on this website is pr" | 80, 4093 | 1280 × 149 | flex | column | none | 1 | 24px | normal | normal | 32px 0px 32px 0px |
| div.flex.items-start.gap-4 "Public information on this website is pr" | 80, 4126 | 1280 × 42 | flex | row | none | 2 | 16px | normal | flex-start | 0px 0px 0px 0px |
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | 80, 4263 | 1280 × 24 | flex | row | none | 2 | 12px | center | center | 0px 0px 0px 0px |

## B2.5 DOM order vs visual order

| Parent | Element | DOM index | Visual index |
|---|---|---|---|
| a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " | span.text-left "Begin Partner Qualification and Explore " | 0 | 1 |
| a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " | span.gm-cta-hover-arrow.flex.h-6 | 1 | 0 |
| div.gm-reveal.relative.mx-auto "COOPERATIVE OPPORTUNITY The next generat" | div.w-full.sm:flex-1 "COOPERATIVE OPPORTUNITY The next generat" | 0 | 1 |
| div.gm-reveal.relative.mx-auto "COOPERATIVE OPPORTUNITY The next generat" | div.relative.aspect-[2.1/1].w-full | 1 | 0 |
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | span "BargerTech Engines OEM Commercialization" | 0 | 1 |
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | img.h-[24px].w-[75px].shrink-0 | 1 | 0 |
