# C2: UI responsive analysis at 375px

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Viewport:** 375 × 900 (client width 375px). **Document:** 375 × 6111.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** none.
- **Screenshot:** ../screenshots/C2-375.jpg
- **Generated:** 2026-11-04T13:36:00.405Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 12px 32px 12px 32px |
| heroContent | flex | column | none | 1 | 24px | 90px 32px 48px 32px |
| advSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| advSplit | flex | column | none | 1 | 32px | 0px 0px 0px 0px |
| advList | flex | column | none | 1 | 16px | 0px 0px 0px 0px |
| ptSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| ptGrid | grid | row | 311px | 1 | 12px | 0px 0px 0px 0px |
| plSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| plGrid | grid | row | 311px | 1 | 40px | 0px 0px 0px 0px |
| plList | flex | column | none | 1 | 16px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| ctaCard | flex | column | none | 1 | 24px | 24px 24px 24px 24px |
| footer | block | row | none | 1 | normal | 56px 32px 0px 32px |
| footerCols | flex | column | none | 1 | 40px | 0px 0px 48px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 580 |
| 2 | Advantages | 580 | 1293.3 |
| 3 | Partners | 1873.3 | 1606 |
| 4 | Platform architecture | 3479.3 | 698 |
| 5 | CTA | 4177.3 | 514 |
| 6 | Footer | 4691.3 | 1420 |

DOM vs visual order differences: span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Long-term partnership rather than docume" in li.gm-checklist-row.gm-left-border-row.flex "Long-term partnership rather than docume" (DOM 1, visual 0); span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Regional manufacturing is supported by c" in li.gm-checklist-row.gm-left-border-row.flex "Regional manufacturing is supported by c" (DOM 1, visual 0); span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Shared investment in successful commerci" in li.gm-checklist-row.gm-left-border-row.flex "Shared investment in successful commerci" (DOM 1, visual 0); span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Performance-based rights defined in fina" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Performance-based rights defined in fina" in li.gm-checklist-row.gm-left-border-row.flex "Performance-based rights defined in fina" (DOM 1, visual 0); span.gm-checklist-icon.flex.h-6 in li.gm-checklist-row.gm-left-border-row.flex "Continuous improvement and mutual long-t" (DOM 0, visual 1); p.flex-1.font-['Inter'].text-[12px] "Continuous improvement and mutual long-t" in li.gm-checklist-row.gm-left-border-row.flex "Continuous improvement and mutual long-t" (DOM 1, visual 0).

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
| advIcons | 0 of 6 shown |
| advIconImgs | 0 of 6 shown |
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
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| span.hidden.h-12.w-12 | hidden sm:flex | none | no |
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | flex sm:grid | flex | yes |

## C2.4 Element sizes, spacing and padding

| Element | x, y | Width × height | Padding (t r b l) | Margin (t r b l) |
|---|---|---|---|---|
| header | 0, 0 | 375 × 64 | 12px 32px 12px 32px | 0px 0px 0px 0px |
| logo | 32, 12 | 120 × 40 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 0, 0 | 0 × 0 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 189, 15 | 118 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| heroContent | 0, 64 | 375 × 444 | 90px 32px 48px 32px | 0px 0px 0px 0px |
| heroButton | 87.5, 426 | 200 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| advPanel | 37.5, 776 | 300 × 442.3 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advList | 32, 1250.3 | 311 × 567 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| advIcons | 0, 0 | 0 × 0 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ptCards | 32, 2043.3 | 311 × 220 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| plRows | 32, 3666.3 | 311 × 78 | 20px 20px 20px 20px | 0px 0px 0px 0px |
| plChecks | 54, 3693.3 | 24 × 24 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| ctaCard | 32, 4233.3 | 311 × 402 | 24px 24px 24px 24px | 0px 0px 0px 0px |
| ctaButton | 90, 4577.3 | 195 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| footer | 0, 4691.3 | 375 × 1420 | 56px 32px 0px 32px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 0 | no |
| Nav link (current page) | 14px | 20px | 700 | 0 | no |
| Nav button label | 14px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 36px | 36px | 500 | 3 | yes |
| Hero subtitle | 12px | 18px | 400 | 6 | yes |
| Hero button label | 12px | 18px | 600 | 1 | yes |
| Eyebrow | 12px | 18px | 700 | 1 | yes |
| Section headline (H2) | 20px | 30px | 500 | 2 | yes |
| Benefit number | 16px | 24px | 700 | 1 | yes |
| Benefit text | 12px | 18px | 400 | 2 | yes |
| Card heading (H3) | 16px | 24px | 700 | 2 | yes |
| Card description | 12px | 18px | 400 | 2 | yes |
| Platform statement (H2) | 20px | 30px | 500 | 1 | yes |
| Bullet row text | 12px | 18px | 400 | 2 | yes |
| CTA statement | 20px | 30px | 500 | 9 | yes |
| CTA button label | 12px | 18px | 600 | 1 | yes |
| Footer company name | 20px | 30px | 700 | 1 | yes |
| Footer column heading | 12px | 18px | 700 | 1 | yes |
| Footer link | 12px | 18px | 400 | 1 | yes |
| Footer tagline | 12px | 18px | 400 | 2 | yes |
| Footer disclaimer | 12px | 18px | 400 | 5 | yes |
| Footer copyright | 12px | 18px | 400 | 1 | yes |

## C2.6 Images: dimensions, aspect ratios, object-fit

| Element | Source | Natural size (aspect) | Frame (aspect) | Rendered | Offset | object-fit / background-size | Position |
|---|---|---|---|---|---|---|---|
| section#oem-opportunity.relative.min-h-[580px].overflow-hidden "Partner Sign in Do Not Wait Years to Sta" | oem-opportunity-hero-alternate-CcBVTvsW.jpg | 1536×1024 (1.5) | 375×580 (0.647) | 870×580 | x -321.75, y 0 | cover | 65% 65% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 120×40 (3) | 117.76×40 | x 1.12, y 0 | contain | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-full.w-full.object-cover | bargertech-oem-oppr-boardroom-DxYjxcro.jpg | 1033×1523 (0.678) | 298×440.3 (0.677) | 298.64×440.3 | x -0.32, y 0 | cover | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-manufacturers-BvHPPOf_.jpg | 1152×896 (1.286) | 311×220 (1.414) | 311×241.89 | x 0, y -10.94 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-packagers-DQHBj4HG.jpg | 1152×896 (1.286) | 311×220 (1.414) | 311×241.89 | x 0, y -10.94 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-onsite-gen-BHFFWNk_.jpg | 1337×1058 (1.264) | 311×220 (1.414) | 311×246.1 | x 0, y -13.05 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | bargertech-oem-refinery-OK8LJ0rb.jpg | 1336×1074 (1.244) | 311×220 (1.414) | 311×250.01 | x 0, y -15.01 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-capital-partners-BLXqvxK6.jpg | 1152×896 (1.286) | 311×220 (1.414) | 311×241.89 | x 0, y -10.94 | cover | 50% 50% |
| img.gm-partner-image-card-media.absolute.inset-0 | oem-card-anchor-customers-BXs-cbIT.jpg | 1152×896 (1.286) | 311×220 (1.414) | 311×241.89 | x 0, y -10.94 | cover | 50% 50% |
| img.h-0.5.w-12 | svg%3e | 48×2 (24) | 48×2 (24) | 48×2 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-3.w-3 | svg%3e | 12×12 (1) | 12×12 (1) | 12×12 | x 0, y 0 | fill | 50% 50% |
| img.h-[24px].w-[75px].shrink-0 | Ae829YvTmpzNAAAAAElFTkSuQmCC | 150×48 (3.125) | 75×24 (3.125) | 75×24 | x 0, y 0 | contain | 50% 50% |

## C2.7 Overflow, truncation and overlap

- Horizontal scrolling: no (document 375px, client 375px).
- Elements past the right edge and not clipped: none.
- Truncated text (clipped, ellipsis or line-clamp): none.
- Overlapping in-flow siblings: none.

## C2.8 Breakpoints (media queries in the stylesheets)

| Media query | Active at this width |
|---|---|
| (width >= 40rem (640px)) | no |
| (width >= 48rem (768px)) | no |
| (width >= 64rem (1024px)) | no |
| (width >= 80rem (1280px)) | no |
| (width >= 96rem (1536px)) | no |

## C2.9 Header behaviour

| When | position | top | Background | backdrop-filter | Height | Padding (t r) |
|---|---|---|---|---|---|---|
| At the top of the page | relative | 0px | transparent | none | 64px | 12px 32px |
| After scrolling 600px | fixed | 0px | #050A16 @0.9 | blur(12px) | 64px | 12px 32px |
