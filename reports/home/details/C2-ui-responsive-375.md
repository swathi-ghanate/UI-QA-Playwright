# C2: UI responsive analysis at 375px

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 375 × 900 (client width 375px). **Document:** 375 × 5879.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** none.
- **Screenshot:** ../screenshots/C2-375.jpg
- **Generated:** 2026-11-04T13:35:57.594Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 12px 32px 12px 32px |
| heroContent | flex | column | none | 1 | normal | 38px 32px 48px 32px |
| mkSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| mkGrid | grid | row | 311px | 1 | 28px | 0px 0px 0px 0px |
| mkList | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfSection | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfGrid | grid | row | 375px | 1 | normal | 0px 0px 0px 0px |
| pfPanel | flex | column | none | 1 | 16px | 24px 24px 24px 24px |
| wpSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| wpGrid | grid | row | 311px | 1 | 24px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 56px 32px 56px 32px |
| ctaContent | flex | column | none | 1 | 32px | 0px 0px 0px 0px |
| footer | block | row | none | 1 | normal | 56px 32px 0px 32px |
| footerCols | flex | column | none | 1 | 40px | 0px 0px 48px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 580 |
| 2 | Market | 580 | 797 |
| 3 | Products | 1377 | 1350 |
| 4 | Why partner | 2727 | 982 |
| 5 | CTA | 3709 | 750 |
| 6 | Footer | 4459 | 1420 |

DOM vs visual order differences: none.

## C2.3 Hidden, shown, collapsed or replaced

| Element | State at this width |
|---|---|
| hero | shown |
| heroBg | shown |
| heroOverlay | shown |
| header | shown |
| logo | shown |
| navPill | hidden |
| navLinks | 0 of 7 shown |
| navButton | shown |
| menuToggle | shown |
| heroContent | shown |
| h1 | shown |
| h1Accent | shown |
| heroText | shown |
| heroButton | shown |
| heroArrow | shown |
| mkSection | shown |
| mkHeader | shown |
| mkGrid | shown |
| mkEyebrow | shown |
| mkEyebrowLine | shown |
| mkH2 | shown |
| mkList | shown |
| mkRows | 4 of 4 shown |
| mkNumbers | 4 of 4 shown |
| mkHeadings | 4 of 4 shown |
| mkBodies | 4 of 4 shown |
| pfSection | shown |
| pfGrid | shown |
| pfKicker | shown |
| pfKickerText | shown |
| pfCards | 2 of 2 shown |
| pfImages | 2 of 2 shown |
| pfTints | 2 of 2 shown |
| pfPanel | shown |
| pfPanels | 2 of 2 shown |
| pfBadges | 2 of 2 shown |
| pfTitles | 2 of 2 shown |
| pfSpecs | 2 of 2 shown |
| pfDividers | 2 of 2 shown |
| pfDescs | 2 of 2 shown |
| wpSection | shown |
| wpEyebrow | shown |
| wpEyebrowLine | shown |
| wpH2 | shown |
| wpGrid | shown |
| wpCards | 4 of 4 shown |
| wpIcons | 4 of 4 shown |
| wpIconImgs | 4 of 4 shown |
| wpTexts | 4 of 4 shown |
| ctaSection | shown |
| ctaContent | shown |
| ctaEyebrow | shown |
| ctaEyebrowLine | shown |
| ctaStatement | shown |
| ctaSubtext | shown |
| ctaButton | shown |
| ctaMedia | shown |
| ctaImage | shown |
| ctaImageShade | shown |
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
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | flex sm:grid | flex | yes |

## C2.4 Element sizes, spacing and padding

| Element | x, y | Width × height | Padding (t r b l) | Margin (t r b l) |
|---|---|---|---|---|
| header | 0, 0 | 375 × 64 | 12px 32px 12px 32px | 0px 0px 0px 0px |
| logo | 32, 12 | 120 × 40 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 0, 0 | 0 × 0 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 189, 15 | 118 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| heroContent | 0, 64 | 375 × 452 | 38px 32px 48px 32px | 0px 0px 0px 0px |
| heroButton | 57.5, 416 | 260 × 52 | 8px 8px 8px 16px | 0px 0px 0px 0px |
| advPanel | Not found | — | — | — |
| advList | Not found | — | — | — |
| advIcons | Not found | — | — | — |
| ptCards | Not found | — | — | — |
| plRows | Not found | — | — | — |
| plChecks | Not found | — | — | — |
| ctaCard | Not found | — | — | — |
| ctaButton | 32, 4148 | 311 × 34 | 8px 16px 8px 16px | 32px 0px 0px 0px |
| footer | 0, 4459 | 375 × 1420 | 56px 32px 0px 32px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 0 | no |
| Nav button label | 14px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 36px | 36px | 500 | 3 | yes |
| Hero headline accent | 36px | 36px | 500 | 1 | yes |
| Hero subtitle | 12px | 18px | 400 | 7 | yes |
| Hero button label | 12px | 18px | 700 | 2 | yes |
| Eyebrow | 12px | 18px | 700 | 1 | yes |
| Section headline (H2) | 20px | 30px | 500 | 4 | yes |
| Market number | 112px | 112px | 800 | 1 | yes |
| Market heading (H3) | 16px | 24px | 500 | 1 | yes |
| Market text | 12px | 18px | 400 | 3 | yes |
| Kicker bar text | 12px | 18px | 400 | 1 | yes |
| Product badge | 12px | 16px | 600 | 1 | yes |
| Product title (H3) | 20px | 30px | 700 | 1 | yes |
| Product spec | 12px | 18px | 400 | 1 | yes |
| Product description | 12px | 18px | 400 | 2 | yes |
| Why partner headline (H2) | 20px | 30px | 500 | 1 | yes |
| Card text | 16px | 24px | 400 | 3 | yes |
| CTA eyebrow | 12px | 18px | 700 | 1 | yes |
| CTA statement (H2) | 20px | 30px | 500 | 5 | yes |
| CTA subtext | 20px | 30px | 400 | 4 | yes |
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
| div.gm-hero-bg-zoom.absolute.inset-0 | market-applications-hero-B6lqIDLK.jpg | 1672×941 (1.777) | 375×580 (0.647) | 1030.56×580 | x -472.01, y 0 | cover | 72% 100% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 120×40 (3) | 117.76×40 | x 1.12, y 0 | contain | 50% 50% |
| img.absolute.inset-0.h-full | 40-BusXswKX.jpg | 1254×1254 (1) | 431.25×776.25 (0.556) | 776.25×776.25 | x -172.5, y 0 | cover | 50% 35% |
| img.absolute.inset-0.h-full | 350-OP0LuFUh.jpg | 1254×1254 (1) | 375×675 (0.556) | 675×675 | x -150, y 0 | cover | 50% 20% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.absolute.inset-0.h-full | co-oppurtunity-BzghXGdO.jpg | 1402×1122 (1.25) | 307×144.09 (2.131) | 307×245.69 | x 0, y -50.8 | cover | 50% 50% |
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
