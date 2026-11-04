# C2: UI responsive analysis at 1280px

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Viewport:** 1280 × 900 (client width 1280px). **Document:** 1280 × 4835.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** (width >= 40rem), (width >= 48rem), (width >= 64rem), (width >= 80rem).
- **Screenshot:** ../screenshots/C2-1280.jpg
- **Generated:** 2026-11-04T13:35:34.162Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 16px 80px 16px 80px |
| heroContent | flex | column | none | 1 | 32px | 73px 80px 64px 80px |
| advSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| advSplit | flex | row | none | 2 | 64px | 0px 0px 0px 0px |
| advList | flex | column | none | 1 | 24px | 0px 0px 0px 0px |
| ptSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| ptGrid | grid | row | 262px 262px 262px 262px | 4 | 24px | 0px 0px 0px 0px |
| plSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| plGrid | grid | row | 483.719px 556.281px | 2 | 80px | 0px 0px 0px 0px |
| plList | flex | column | none | 1 | 16px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| ctaCard | flex | column | none | 1 | 24px | 64px 64px 64px 64px |
| footer | block | row | none | 1 | normal | 64px 80px 0px 80px |
| footerCols | grid | column | 198.391px 198.406px 198.391px 198.406px 198.391px | 5 | 32px | 0px 0px 56px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 854 |
| 2 | Advantages | 854 | 1013 |
| 3 | Partners | 1867 | 992 |
| 4 | Platform architecture | 2859 | 658 |
| 5 | CTA | 3517 | 650 |
| 6 | Footer | 4167 | 668 |

DOM vs visual order differences: span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Shared investment in successful commerci" in li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" (DOM 1, visual 0); span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Continuous improvement and mutual long-t" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Continuous improvement and mutual long-t" in li.gm-checklist-row.gm-left-border-row.flex "Continuous improvement and mutual long-t" (DOM 1, visual 0); span "BargerTech Engines OEM Commercialization" in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 0, visual 1); img.h-[24px].w-[75px].shrink-0 in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 1, visual 0).

## C2.3 Hidden, shown, collapsed or replaced

| Element | State at this width |
|---|---|
| hero | shown |
| heroOverlay | shown |
| header | shown |
| logo | shown |
| navPill | shown |
| navLinks | 7 of 7 shown |
| navCurrent | shown |
| navButton | shown |
| menuToggle | hidden |
| heroContent | shown |
| h1 | shown |
| h1Accent | shown |
| heroText | shown |
| heroButton | shown |
| advSection | shown |
| advEyebrow | shown |
| advEyebrowLine | shown |
| advH2 | shown |
| advSplit | shown |
| advPanel | shown |
| advPanelImg | shown |
| advList | shown |
| advRows | 6 of 6 shown |
| advIcons | 6 of 6 shown |
| advIconImgs | 6 of 6 shown |
| advNumbers | 6 of 6 shown |
| advBodies | 6 of 6 shown |
| ptSection | shown |
| ptEyebrow | shown |
| ptH2 | shown |
| ptGrid | shown |
| ptCards | 6 of 6 shown |
| ptCardImages | 6 of 6 shown |
| ptCardOverlays | 6 of 6 shown |
| ptHeadings | 6 of 6 shown |
| ptDescriptions | 6 of 6 shown |
| plSection | shown |
| plEyebrow | shown |
| plEyebrowLine | shown |
| plStatement | shown |
| plLeft | shown |
| plGrid | shown |
| plList | shown |
| plRows | 5 of 5 shown |
| plChecks | 5 of 5 shown |
| plTexts | 5 of 5 shown |
| plGlows | 2 of 2 shown |
| ctaSection | shown |
| ctaCard | shown |
| ctaLine | shown |
| ctaText | shown |
| ctaButton | shown |
| ctaGlows | 2 of 2 shown |
| footer | shown |
| footerCols | shown |
| footerColumns | 5 of 5 shown |
| footerCompany | shown |
| footerBar | shown |
| footerTagline | shown |
| footerHeadings | 4 of 4 shown |
| footerLinks | 16 of 16 shown |
| footerPlainLink | shown |
| footerEmail | shown |
| footerLinkedIn | shown |
| footerMailIcon | shown |
| footerDivider1 | shown |
| footerDisclaimer | shown |
| footerShield | shown |
| footerCopyright | shown |
| footerDivider2 | shown |
| poweredRow | shown |
| poweredBy | shown |
| beeLogo | shown |

### Elements with responsive display classes

| Element | Classes | Computed display | Visible |
|---|---|---|---|
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | hidden xl:flex | flex | yes |
| button.flex.h-5.w-5 | flex xl:hidden | none | no |
| div.hidden.lg:block.lg:h-20 | hidden lg:block | block | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| span.hidden.h-12.w-12 | hidden sm:flex | flex | yes |
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | flex sm:grid | grid | yes |

## C2.4 Element sizes, spacing and padding

| Element | x, y | Width × height | Padding (t r b l) | Margin (t r b l) |
|---|---|---|---|---|
| header | 0, 0 | 1280 × 112 | 16px 80px 16px 80px | 0px 0px 0px 0px |
| logo | 80, 16 | 236 × 80 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 316, 29 | 835.73 × 54 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 1151.73, 35 | 153.7 × 42 | 12px 20px 12px 20px | 0px 0px 0px 0px |
| heroContent | 0, 112 | 1280 × 663 | 73px 80px 64px 80px | 0px 0px 0px 0px |
| heroButton | 80, 659 | 163.91 × 52 | 16px 24px 16px 24px | 40px 0px 0px 0px |
| advPanel | 80, 1090 | 440 × 677 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advList | 584, 1090 | 616 × 677 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advIcons | 584, 1090 | 48 × 48 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ptCards | 80, 2095 | 262 × 320 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| plRows | 643.72, 2960 | 556.28 × 68 | 20px 20px 20px 20px | 0px 0px 0px 0px |
| plChecks | 665.72, 2982 | 24 × 24 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ctaCard | 80, 3617 | 1120 × 450 | 64px 64px 64px 64px | 0px 0px 0px 0px |
| ctaButton | 530, 3963 | 220 × 40 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| footer | 0, 4167 | 1280 × 668 | 64px 80px 0px 80px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 1 | yes |
| Nav link (current page) | 14px | 20px | 700 | 1 | yes |
| Nav button label | 16px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 80px | 86px | 500 | 3 | yes |
| Hero subtitle | 20px | 28px | 400 | 4 | yes |
| Hero button label | 16px | 18px | 600 | 1 | yes |
| Eyebrow | 24px | 24px | 700 | 1 | yes |
| Section headline (H2) | 28px | 42px | 500 | 1 | yes |
| Benefit number | 16px | 24px | 700 | 1 | yes |
| Benefit text | 16px | 24px | 400 | 2 | yes |
| Card heading (H3) | 22px | 30px | 700 | 4 | yes |
| Card description | 16px | 24px | 400 | 3 | yes |
| Platform statement (H2) | 28px | 42px | 500 | 1 | yes |
| Bullet row text | 16px | 26px | 500 | 1 | yes |
| CTA statement | 28px | 40px | 500 | 5 | yes |
| CTA button label | 14px | 20px | 600 | 1 | yes |
| Footer company name | 20px | 30px | 700 | 1 | yes |
| Footer column heading | 12px | 18px | 700 | 1 | yes |
| Footer link | 12px | 18px | 400 | 1 | yes |
| Footer tagline | 14px | 21px | 400 | 4 | yes |
| Footer disclaimer | 14px | 21px | 400 | 2 | yes |
| Footer copyright | 12px | 18px | 400 | 1 | yes |

## C2.6 Images: dimensions, aspect ratios, object-fit

| Element | Source | Natural size (aspect) | Frame (aspect) | Rendered | Offset | object-fit / background-size | Position |
|---|---|---|---|---|---|---|---|
| section#oem-opportunity.relative.min-h-[580px].overflow-hidden "Why Now The Platform Market Applications" | oem-opportunity-hero-alternate-CcBVTvsW.jpg | 1536×1024 (1.5) | 1280×854 (1.499) | 1281×854 | x -0.65, y 0 | cover | 65% 65% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 236×80 (2.95) | 235.51×80 | x 0.24, y 0 | contain | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-full.w-full.object-cover | bargertech-oem-oppr-boardroom-DxYjxcro.jpg | 1033×1523 (0.678) | 438×675 (0.649) | 457.83×675 | x -9.91, y 0 | cover | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | oem-shield-icon-4-BG41MZKt.svg | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-manufacturers-BvHPPOf_.jpg | 1152×896 (1.286) | 262×320 (0.819) | 411.43×320 | x -74.71, y 0 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-packagers-DQHBj4HG.jpg | 1152×896 (1.286) | 262×320 (0.819) | 411.43×320 | x -74.71, y 0 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-onsite-gen-BHFFWNk_.jpg | 1337×1058 (1.264) | 262×320 (0.819) | 404.39×320 | x -71.19, y 0 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-refinery-OK8LJ0rb.jpg | 1336×1074 (1.244) | 262×320 (0.819) | 398.06×320 | x -68.03, y 0 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-capital-partners-BLXqvxK6.jpg | 1152×896 (1.286) | 262×320 (0.819) | 411.43×320 | x -74.71, y 0 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-anchor-customers-BXs-cbIT.jpg | 1152×896 (1.286) | 262×320 (0.819) | 411.43×320 | x -74.71, y 0 | cover | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-[24px].w-[75px].shrink-0 | Ae829YvTmpzNAAAAAElFTkSuQmCC | 150×48 (3.125) | 75×24 (3.125) | 75×24 | x 0, y 0 | contain | 50% 50% |

## C2.7 Overflow, truncation and overlap

- Horizontal scrolling: no (document 1280px, client 1280px).
- Elements past the right edge and not clipped: none.
- Truncated text (clipped, ellipsis or line-clamp): none.
- Overlapping in-flow siblings: none.

## C2.8 Breakpoints (media queries in the stylesheets)

| Media query | Active at this width |
|---|---|
| (width >= 40rem (640px)) | yes |
| (width >= 48rem (768px)) | yes |
| (width >= 64rem (1024px)) | yes |
| (width >= 80rem (1280px)) | yes |
| (width >= 96rem (1536px)) | no |

## C2.9 Header behaviour

| When | position | top | Background | backdrop-filter | Height | Padding (t r) |
|---|---|---|---|---|---|---|
| At the top of the page | relative | 0px | transparent | none | 112px | 16px 80px |
| After scrolling 600px | fixed | 0px | #050A16 @0.9 | blur(12px) | 112px | 16px 80px |
