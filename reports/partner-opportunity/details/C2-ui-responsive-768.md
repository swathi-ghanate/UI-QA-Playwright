# C2: UI responsive analysis at 768px

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Viewport:** 768 × 900 (client width 768px). **Document:** 768 × 6401.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** (width >= 40rem), (width >= 48rem).
- **Screenshot:** ../screenshots/C2-768.jpg
- **Generated:** 2026-11-04T13:35:55.493Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 12px 40px 12px 40px |
| heroContent | flex | column | none | 1 | 32px | 36px 40px 64px 40px |
| advSection | block | row | none | 1 | normal | 80px 40px 80px 40px |
| advSplit | flex | column | none | 1 | 40px | 0px 0px 0px 0px |
| advList | flex | column | none | 1 | 24px | 0px 0px 0px 0px |
| ptSection | block | row | none | 1 | normal | 80px 40px 80px 40px |
| ptGrid | grid | row | 688px | 1 | 12px | 0px 0px 0px 0px |
| plSection | block | row | none | 1 | normal | 100px 40px 100px 40px |
| plGrid | grid | row | 688px | 1 | 40px | 0px 0px 0px 0px |
| plList | flex | column | none | 1 | 16px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 80px 40px 80px 40px |
| ctaCard | flex | column | none | 1 | 24px | 60px 40px 60px 40px |
| footer | block | row | none | 1 | normal | 64px 40px 0px 40px |
| footerCols | grid | column | 154px 154px 154px 154px | 1 | 24px | 0px 0px 48px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 620 |
| 2 | Advantages | 620 | 1430.78 |
| 3 | Partners | 2050.78 | 2262 |
| 4 | Platform architecture | 4312.78 | 748 |
| 5 | CTA | 5060.78 | 544 |
| 6 | Footer | 5604.78 | 796 |

DOM vs visual order differences: span "BargerTech Engines OEM Commercialization" in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 0, visual 1); img.h-[24px].w-[75px].shrink-0 in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 1, visual 0).

## C2.3 Hidden, shown, collapsed or replaced

| Element | State at this width |
|---|---|
| hero | shown |
| heroOverlay | shown |
| header | shown |
| logo | shown |
| navPill | hidden |
| navLinks | 0 of 7 shown |
| navCurrent | hidden |
| navButton | shown |
| menuToggle | shown |
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
| nav.gm-fade-slide-up.hidden.shrink-0 "Why NowThe PlatformMarket ApplicationsPa" | hidden xl:flex | none | no |
| button.flex.h-5.w-5 | flex xl:hidden | flex | yes |
| div.hidden.lg:block.lg:h-20 | hidden lg:block | none | no |
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
| header | 0, 0 | 768 × 68 | 12px 40px 12px 40px | 0px 0px 0px 0px |
| logo | 40, 12 | 135 × 44 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 0, 0 | 0 × 0 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 574, 17 | 118 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| heroContent | 0, 68 | 768 × 476 | 36px 40px 64px 40px | 0px 0px 0px 0px |
| heroButton | 40, 446 | 133.67 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| advPanel | 224, 830 | 320 × 471.78 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advList | 40, 1341.78 | 688 × 629 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advIcons | 40, 1341.78 | 48 × 48 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ptCards | 40, 2252.78 | 688 × 320 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| plRows | 40, 4555.78 | 688 × 68 | 20px 20px 20px 20px | 0px 0px 0px 0px |
| plChecks | 62, 4577.78 | 24 × 24 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ctaCard | 40, 5140.78 | 688 × 384 | 60px 40px 60px 40px | 0px 0px 0px 0px |
| ctaButton | 286.5, 5430.78 | 195 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| footer | 0, 5604.78 | 768 × 796 | 64px 40px 0px 40px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 0 | no |
| Nav link (current page) | 14px | 20px | 700 | 0 | no |
| Nav button label | 14px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 48px | 48px | 500 | 3 | yes |
| Hero subtitle | 16px | 24px | 400 | 5 | yes |
| Hero button label | 14px | 18px | 600 | 1 | yes |
| Eyebrow | 12px | 18px | 700 | 1 | yes |
| Section headline (H2) | 28px | 42px | 500 | 1 | yes |
| Benefit number | 16px | 24px | 700 | 1 | yes |
| Benefit text | 16px | 24px | 400 | 1 | yes |
| Card heading (H3) | 22px | 30px | 700 | 1 | yes |
| Card description | 16px | 24px | 400 | 1 | yes |
| Platform statement (H2) | 28px | 42px | 500 | 1 | yes |
| Bullet row text | 16px | 26px | 500 | 1 | yes |
| CTA statement | 24px | 36px | 500 | 5 | yes |
| CTA button label | 12px | 18px | 600 | 1 | yes |
| Footer company name | 20px | 30px | 700 | 1 | yes |
| Footer column heading | 12px | 18px | 700 | 1 | yes |
| Footer link | 12px | 18px | 400 | 1 | yes |
| Footer tagline | 12px | 18px | 400 | 1 | yes |
| Footer disclaimer | 12px | 18px | 400 | 3 | yes |
| Footer copyright | 12px | 18px | 400 | 1 | yes |

## C2.6 Images: dimensions, aspect ratios, object-fit

| Element | Source | Natural size (aspect) | Frame (aspect) | Rendered | Offset | object-fit / background-size | Position |
|---|---|---|---|---|---|---|---|
| section#oem-opportunity.relative.min-h-[580px].overflow-hidden "Partner Sign in Do Not Wait Years to Sta" | oem-opportunity-hero-alternate-CcBVTvsW.jpg | 1536×1024 (1.5) | 768×620 (1.239) | 930×620 | x -105.3, y 0 | cover | 65% 65% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 135×44 (3.068) | 129.53×44 | x 2.73, y 0 | contain | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-full.w-full.object-cover | bargertech-oem-oppr-boardroom-DxYjxcro.jpg | 1033×1523 (0.678) | 318×469.78 (0.677) | 318.64×469.78 | x -0.32, y 0 | cover | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | oem-shield-icon-4-BG41MZKt.svg | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-manufacturers-BvHPPOf_.jpg | 1152×896 (1.286) | 688×320 (2.15) | 688×535.11 | x 0, y -107.56 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-packagers-DQHBj4HG.jpg | 1152×896 (1.286) | 688×320 (2.15) | 688×535.11 | x 0, y -107.56 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-onsite-gen-BHFFWNk_.jpg | 1337×1058 (1.264) | 688×320 (2.15) | 688×544.43 | x 0, y -112.22 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-refinery-OK8LJ0rb.jpg | 1336×1074 (1.244) | 688×320 (2.15) | 688×553.08 | x 0, y -116.54 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-capital-partners-BLXqvxK6.jpg | 1152×896 (1.286) | 688×320 (2.15) | 688×535.11 | x 0, y -107.56 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-anchor-customers-BXs-cbIT.jpg | 1152×896 (1.286) | 688×320 (2.15) | 688×535.11 | x 0, y -107.56 | cover | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-[24px].w-[75px].shrink-0 | Ae829YvTmpzNAAAAAElFTkSuQmCC | 150×48 (3.125) | 75×24 (3.125) | 75×24 | x 0, y 0 | contain | 50% 50% |

## C2.7 Overflow, truncation and overlap

- Horizontal scrolling: no (document 768px, client 768px).
- Elements past the right edge and not clipped: none.
- Truncated text (clipped, ellipsis or line-clamp): none.
- Overlapping in-flow siblings: none.

## C2.8 Breakpoints (media queries in the stylesheets)

| Media query | Active at this width |
|---|---|
| (width >= 40rem (640px)) | yes |
| (width >= 48rem (768px)) | yes |
| (width >= 64rem (1024px)) | no |
| (width >= 80rem (1280px)) | no |
| (width >= 96rem (1536px)) | no |

## C2.9 Header behaviour

| When | position | top | Background | backdrop-filter | Height | Padding (t r) |
|---|---|---|---|---|---|---|
| At the top of the page | relative | 0px | transparent | none | 68px | 12px 40px |
| After scrolling 600px | fixed | 0px | #050A16 @0.9 | blur(12px) | 68px | 12px 40px |
