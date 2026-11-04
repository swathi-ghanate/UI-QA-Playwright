# B2: UI layout analysis (live UI)

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Viewport:** 1440 × 900
- **Generated:** 2026-11-04T13:35:27.263Z by the UI Fidelity QA framework (Playwright, Chromium)

All values are computed CSS and getBoundingClientRect() boxes in page coordinates.

## B2.1 Global page layout

- **Viewport width:** 1440px (client width 1440px). **Document:** 1440 × 4754.
- **Body max-width:** none. **Root font size:** 16px.
- **Content container (Advantages):** x 80, width 1280.
- **Max-width values used by containers:** 1760px, 1700px.
- **Sidebar:** none.

## B2.2 Sections, top to bottom

| Element | x, y | Width × height | Display | Position | Padding (t r b l) | Margin (t r b l) | Background |
|---|---|---|---|---|---|---|---|
| section#oem-opportunity.relative.min-h-[580px].overflow-hidden "Why Now The Platform Market Applications" | 0, 0 | 1440 × 854 | block | relative | 0px 0px 0px 0px | 0px 0px 0px 0px | transparent |
| header.left-0.right-0.top-0 "Why Now The Platform Market Applications" | 0, 0 | 1440 × 112 | block | relative | 16px 80px 16px 80px | 0px 0px 0px 0px | transparent |
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | 343.28, 29 | 835.73 × 54 | flex | static | 16px 16px 16px 16px | 0px 0px 0px 0px | #FFFFFF @0.08 |
| section.overflow-hidden.bg-[#FAFBFD].px-8 "STRATEGIC ADVANTAGE What a Strategic Par" | 0, 854 | 1440 × 983.75 | block | static | 100px 80px 100px 80px | 0px 0px 0px 0px | #FAFBFD |
| section.overflow-hidden.bg-white.px-8 "IDEAL ALIGNMENT Who BargerTech Wants to " | 0, 1837.75 | 1440 × 992 | block | static | 100px 80px 100px 80px | 0px 0px 0px 0px | #FFFFFF |
| section.relative.overflow-hidden.border-y "PLATFORM VALUES Commercial Philosophy Lo" | 0, 2829.75 | 1440 × 606 | block | relative | 100px 80px 100px 80px | 0px 0px 0px 0px | transparent |
| section.overflow-hidden.bg-[#FAFBFD].px-8 "The objective is not to collect the larg" | 0, 3435.75 | 1440 × 650 | block | static | 100px 80px 100px 80px | 0px 0px 0px 0px | #FAFBFD |
| footer.gm-fade-slide-up.overflow-hidden.bg-[#E8F2FA] "BargerTech Powering the next generation " | 0, 4085.75 | 1440 × 668 | block | static | 64px 80px 0px 80px | 0px 0px 0px 0px | #E8F2FA |

Vertical spacing between sections comes from the margins and paddings above (no margins means sections touch).

## B2.3 Key containers and components

| Element | x, y | Width × height | Display | Flex direction | Grid columns | Columns (measured) | Gap | justify-content | align-items | text-align | Padding (t r b l) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| header | 0, 0 | 1440 × 112 | block | row | none | 1 | normal | normal | normal | start | 16px 80px 16px 80px |
| heroContent | 0, 112 | 1440 × 663 | flex | column | none | 1 | 32px | normal | normal | left | 73px 80px 64px 80px |
| advSection | 0, 854 | 1440 × 983.75 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| advSplit | 80, 1090 | 1280 × 647.75 | flex | row | none | 2 | 64px | normal | normal | start | 0px 0px 0px 0px |
| advList | 584, 1090 | 776 × 647.75 | flex | column | none | 1 | 24px | normal | normal | start | 0px 0px 0px 0px |
| ptSection | 0, 1837.75 | 1440 × 992 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| ptGrid | 80, 2065.75 | 1280 × 664 | grid | row | 302px 302px 302px 302px | 4 | 24px | normal | normal | start | 0px 0px 0px 0px |
| plSection | 0, 2829.75 | 1440 × 606 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| plGrid | 80, 2930.75 | 1280 × 404 | grid | row | 558.125px 641.859px | 2 | 80px | normal | flex-start | start | 0px 0px 0px 0px |
| plList | 718.13, 2930.75 | 641.86 × 404 | flex | column | none | 1 | 16px | normal | normal | start | 0px 0px 0px 0px |
| ctaSection | 0, 3435.75 | 1440 × 650 | block | row | none | 1 | normal | normal | normal | start | 100px 80px 100px 80px |
| ctaCard | 80, 3535.75 | 1280 × 450 | flex | column | none | 1 | 24px | center | center | center | 64px 64px 64px 64px |
| footer | 0, 4085.75 | 1440 × 668 | block | row | none | 1 | normal | normal | normal | start | 64px 80px 0px 80px |
| footerCols | 80, 4149.75 | 1280 × 334 | grid | column | 230.391px 230.406px 230.391px 230.406px 230.391px | 5 | 32px | normal | normal | start | 0px 0px 56px 0px |
| logo | 80, 16 | 236 × 80 | block | row | none | 1 | normal | normal | normal | start | 0px 0px 0px 0px |
| navPill | 343.28, 29 | 835.73 × 54 | flex | row | none | 7 | 24px | normal | center | start | 16px 16px 16px 16px |
| navButton | 1206.3, 35 | 153.7 × 42 | flex | row | none | 0 | normal | center | center | start | 12px 20px 12px 20px |
| heroButton | 80, 659 | 163.91 × 52 | flex | row | none | 0 | normal | center | center | center | 16px 24px 16px 24px |
| ctaButton | 610, 3881.75 | 220 × 40 | flex | row | none | 0 | normal | center | center | center | 8px 16px 8px 16px |
| ptCards | 80, 2065.75 | 302 × 320 | block | row | none | 0 | normal | normal | normal | start | 0px 0px 0px 0px |
| plRows | 718.13, 2930.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | start | 20px 20px 20px 20px |

## B2.4 Grid and flex containers on the page

| Element | x, y | Width × height | Display | Direction | Grid columns | Columns | Gap | justify | align | Padding |
|---|---|---|---|---|---|---|---|---|---|---|
| div.flex.w-full.items-center "Why Now The Platform Market Applications" | 80, 16 | 1280 × 80 | flex | row | none | 3 | normal | space-between | center | 0px 0px 0px 0px |
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | 343.28, 29 | 835.73 × 54 | flex | row | none | 7 | 24px | normal | center | 16px 16px 16px 16px |
| div.gm-fade-slide-up.flex.shrink-0 "Partner Sign in" | 1206.3, 35 | 153.7 × 42 | flex | row | none | 1 | 16px | normal | center | 0px 0px 0px 0px |
| a.gm-cta-hover.inline-flex.h-[34px] "Partner Sign in" | 1206.3, 35 | 153.7 × 42 | flex | row | none | 0 | normal | center | center | 12px 20px 12px 20px |
| div.relative.z-10.flex "Do Not Wait Years to Start from Zero. Th" | 0, 112 | 1440 × 663 | flex | column | none | 1 | 32px | normal | normal | 73px 80px 64px 80px |
| div.flex.flex-col.gap-4 "Do Not Wait Years to Start from Zero. Th" | 80, 185 | 720 × 402 | flex | column | none | 1 | 32px | normal | normal | 0px 0px 0px 0px |
| h1.gm-fade-slide-up.flex.max-w-full "Do Not Wait Years to Start from Zero." | 80, 185 | 720 × 258 | flex | column | none | 1 | 0px | normal | normal | 0px 0px 0px 0px |
| a.gm-fade-slide-up.gm-cta-hover.inline-flex "See Partner Fit" | 80, 659 | 163.91 × 52 | flex | row | none | 0 | normal | center | center | 16px 24px 16px 24px |
| div.mx-auto.flex.w-full "STRATEGIC ADVANTAGE What a Strategic Par" | 80, 954 | 1280 × 783.75 | flex | column | none | 1 | 40px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-4 "STRATEGIC ADVANTAGE What a Strategic Par" | 80, 954 | 1280 × 96 | flex | column | none | 1 | 16px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-3 "STRATEGIC ADVANTAGE" | 80, 954 | 1280 × 38 | flex | column | none | 1 | 12px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-8 "01 Access to an established energy platf" | 80, 1090 | 1280 × 647.75 | flex | row | none | 2 | 64px | normal | normal | 0px 0px 0px 0px |
| ul.flex.flex-1.flex-col "01 Access to an established energy platf" | 584, 1090 | 776 × 647.75 | flex | column | none | 1 | 24px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "01 Access to an established energy platf" | 584, 1090 | 776 × 77 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 24px 0px |
| div.flex.min-w-0.flex-1 "01 Access to an established energy platf" | 656, 1090 | 704 × 52 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "02 A structured technology deployment an" | 584, 1191 | 776 × 77 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 24px 0px |
| div.flex.min-w-0.flex-1 "02 A structured technology deployment an" | 656, 1191 | 704 × 52 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "03 Regional or territorial opportunities" | 584, 1292 | 776 × 101 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 24px 0px |
| div.flex.min-w-0.flex-1 "03 Regional or territorial opportunities" | 656, 1292 | 704 × 76 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "04 Ongoing deployment collaboration, upd" | 584, 1417 | 776 × 77 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 24px 0px |
| div.flex.min-w-0.flex-1 "04 Ongoing deployment collaboration, upd" | 656, 1417 | 704 × 52 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "05 Participation in common product and g" | 584, 1518 | 776 × 77 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 24px 0px |
| div.flex.min-w-0.flex-1 "05 Participation in common product and g" | 656, 1518 | 704 × 52 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| li.gm-slide-in-right.flex.items-start "06 The ability to combine existing custo" | 584, 1619 | 776 × 76 | flex | row | none | 2 | 24px | normal | flex-start | 0px 0px 0px 0px |
| div.flex.min-w-0.flex-1 "06 The ability to combine existing custo" | 656, 1619 | 704 × 76 | flex | column | none | 1 | 4px | normal | normal | 0px 0px 0px 0px |
| div.mx-auto.flex.w-full "IDEAL ALIGNMENT Who BargerTech Wants to " | 80, 1937.75 | 1280 × 792 | flex | column | none | 1 | 24px | normal | normal | 0px 0px 0px 0px |
| div.flex.w-full.flex-col "IDEAL ALIGNMENT Who BargerTech Wants to " | 80, 1937.75 | 1280 × 104 | flex | column | none | 1 | 24px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-3 "IDEAL ALIGNMENT" | 80, 1937.75 | 1280 × 38 | flex | column | none | 1 | 12px | normal | normal | 0px 0px 0px 0px |
| div.grid.grid-cols-1.gap-3 "OEM Parts Manufacturers and Supply Compo" | 80, 2065.75 | 1280 × 664 | grid | row | 302px 302px 302px 302px | 4 | 24px | normal | normal | 0px 0px 0px 0px |
| div.absolute.inset-x-0.bottom-0 "OEM Parts Manufacturers and Supply Compo" | 80, 2147.75 | 302 × 238 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.absolute.inset-x-0.bottom-0 "Generator Package Supply Partners & Powe" | 406, 2147.75 | 302 × 238 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.absolute.inset-x-0.bottom-0 "Energy-as-a-Service Providers - Power by" | 732, 2147.75 | 302 × 238 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.absolute.inset-x-0.bottom-0 "Natural-Gas & Resource Companies Fuel ac" | 1058, 2153.75 | 302 × 232 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.absolute.inset-x-0.bottom-0 "Strategic Capital Partners Technology-ca" | 80, 2497.75 | 302 × 232 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.absolute.inset-x-0.bottom-0 "Anchor Customers & Deployment Partners R" | 406, 2521.75 | 302 × 208 | flex | column | none | 1 | 12px | normal | normal | 32px 32px 32px 32px |
| div.relative.mx-auto.grid "PLATFORM VALUES Commercial Philosophy Lo" | 80, 2930.75 | 1280 × 404 | grid | row | 558.125px 641.859px | 2 | 80px | normal | flex-start | 0px 0px 0px 0px |
| div.flex.flex-col.gap-6 "PLATFORM VALUES Commercial Philosophy" | 80, 2930.75 | 558.13 × 108 | flex | column | none | 1 | 24px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-4 "PLATFORM VALUES" | 80, 2930.75 | 558.13 × 42 | flex | column | none | 1 | 16px | normal | normal | 0px 0px 0px 0px |
| ul.flex.w-full.flex-col "Long-term partnership rather than docume" | 718.13, 2930.75 | 641.86 × 404 | flex | column | none | 1 | 16px | normal | normal | 0px 0px 0px 0px |
| li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume" | 718.13, 2930.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | 20px 20px 20px 20px |
| li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c" | 718.13, 3014.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | 20px 20px 20px 20px |
| li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" | 718.13, 3098.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | 20px 20px 20px 20px |
| li.gm-checklist-row.gm-left-border-row.flex "Performance-based rights defined in fina" | 718.13, 3182.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | 20px 20px 20px 20px |
| li.gm-checklist-row.gm-left-border-row.flex "Continuous improvement and mutual long-t" | 718.13, 3266.75 | 641.86 × 68 | flex | row | none | 2 | 16px | normal | center | 20px 20px 20px 20px |
| div.gm-reveal.relative.mx-auto "The objective is not to collect the larg" | 80, 3535.75 | 1280 × 450 | flex | column | none | 1 | 24px | center | center | 64px 64px 64px 64px |
| div.relative.z-10.flex "The objective is not to collect the larg" | 144, 3599.75 | 1152 × 322 | flex | column | none | 1 | 40px | normal | center | 0px 0px 0px 0px |
| a.gm-cta-hover.inline-flex.h-[34px] "See Partner Fit & Process" | 610, 3881.75 | 220 × 40 | flex | row | none | 0 | normal | center | center | 8px 16px 8px 16px |
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | 80, 4149.75 | 1280 × 334 | grid | column | 230.391px 230.406px 230.391px 230.406px 230.391px | 5 | 32px | normal | normal | 0px 0px 56px 0px |
| div.flex.flex-col.gap-4 "BargerTech Powering the next generation " | 80, 4149.75 | 230.39 × 278 | flex | column | none | 1 | 16px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Explore Why Now The Platform Market Appl" | 342.39, 4149.75 | 230.41 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Partners Begin Partner Qualification Par" | 604.8, 4149.75 | 230.39 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Contact Business Development Contact Bus" | 867.19, 4149.75 | 230.41 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| a.flex.items-start.gap-2 "Contact Business Development" | 867.19, 4217.75 | 230.41 × 18 | flex | row | none | 2 | 8px | normal | flex-start | 0px 0px 0px 0px |
| a.flex.items-center.gap-2 "LinkedIn" | 867.19, 4247.75 | 230.41 × 18 | flex | row | none | 2 | 8px | normal | center | 0px 0px 0px 0px |
| div.flex.flex-col.gap-5 "Legal Privacy Terms of Use Cookie Notice" | 1129.59, 4149.75 | 230.39 × 278 | flex | column | none | 1 | 20px | normal | normal | 0px 0px 0px 0px |
| div.mt-10.flex.flex-col "Public information on this website is pr" | 80, 4539.75 | 1280 × 149 | flex | column | none | 1 | 24px | normal | normal | 32px 0px 32px 0px |
| div.flex.items-start.gap-4 "Public information on this website is pr" | 80, 4572.75 | 1280 × 42 | flex | row | none | 2 | 16px | normal | flex-start | 0px 0px 0px 0px |
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | 80, 4709.75 | 1280 × 24 | flex | row | none | 2 | 12px | center | center | 0px 0px 0px 0px |

## B2.5 DOM order vs visual order

| Parent | Element | DOM index | Visual index |
|---|---|---|---|
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | span "BargerTech Engines OEM Commercialization" | 0 | 1 |
| div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" | img.h-[24px].w-[75px].shrink-0 | 1 | 0 |
