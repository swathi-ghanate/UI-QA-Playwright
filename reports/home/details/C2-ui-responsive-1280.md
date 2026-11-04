# C2: UI responsive analysis at 1280px

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 1280 × 900 (client width 1280px). **Document:** 1280 × 4409.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** (width >= 40rem), (width >= 48rem), (width >= 64rem), (width >= 80rem).
- **Screenshot:** ../screenshots/C2-1280.jpg
- **Generated:** 2026-11-04T13:35:33.252Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 16px 80px 16px 80px |
| heroContent | flex | column | none | 1 | 32px | 73px 80px 48px 80px |
| mkSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| mkGrid | grid | row | 460px 580px | 2 | 80px | 0px 0px 0px 0px |
| mkList | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfSection | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfGrid | grid | row | 640px 640px | 2 | normal | 0px 0px 0px 0px |
| pfPanel | flex | column | none | 1 | 20px | 32px 64px 64px 64px |
| wpSection | block | row | none | 1 | normal | 100px 80px 100px 80px |
| wpGrid | grid | row | 262px 262px 262px 262px | 4 | 24px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 80px 80px 80px 80px |
| ctaContent | flex | row | none | 2 | 64px | 0px 0px 0px 0px |
| footer | block | row | none | 1 | normal | 64px 80px 0px 80px |
| footerCols | grid | column | 198.391px 198.406px 198.391px 198.406px 198.391px | 5 | 32px | 0px 0px 56px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 889 |
| 2 | Market | 889 | 831 |
| 3 | Products | 1720 | 760 |
| 4 | Why partner | 2480 | 588 |
| 5 | CTA | 3068 | 673 |
| 6 | Footer | 3741 | 668 |

DOM vs visual order differences: span.text-left "Begin Partner Qualification and Explore " in a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " (DOM 0, visual 1); span.gm-cta-hover-arrow.flex.h-6 in a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " (DOM 1, visual 0); span "BargerTech Engines OEM Commercialization" in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 0, visual 1); img.h-[24px].w-[75px].shrink-0 in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 1, visual 0).

## C2.3 Hidden, shown, collapsed or replaced

| Element | State at this width |
|---|---|
| hero | shown |
| heroBg | shown |
| heroOverlay | shown |
| header | shown |
| logo | shown |
| navPill | shown |
| navLinks | 7 of 7 shown |
| navButton | shown |
| menuToggle | hidden |
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
| nav.gm-fade-slide-up.hidden.shrink-0 "Why Now The Platform Market Applications" | hidden xl:flex | flex | yes |
| button.flex.h-5.w-5 | flex xl:hidden | none | no |
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | flex sm:grid | grid | yes |

## C2.4 Element sizes, spacing and padding

| Element | x, y | Width × height | Padding (t r b l) | Margin (t r b l) |
|---|---|---|---|---|
| header | 0, 0 | 1280 × 112 | 16px 80px 16px 80px | 0px 0px 0px 0px |
| logo | 80, 16 | 236 × 80 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 316, 29 | 831.8 × 54 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 1147.8, 35 | 153.7 × 42 | 12px 20px 12px 20px | 0px 0px 0px 0px |
| heroContent | 0, 112 | 1280 × 777 | 73px 80px 48px 80px | 0px 0px 0px 0px |
| heroButton | 80, 793 | 494.14 × 48 | 12px 8px 12px 20px | 0px 0px 0px 0px |
| advPanel | Not found | — | — | — |
| advList | Not found | — | — | — |
| advIcons | Not found | — | — | — |
| ptCards | Not found | — | — | — |
| plRows | Not found | — | — | — |
| plChecks | Not found | — | — | — |
| ctaCard | Not found | — | — | — |
| ctaButton | 80, 3619 | 282.81 × 42 | 12px 32px 12px 32px | 32px 0px 0px 0px |
| footer | 0, 3741 | 1280 × 668 | 64px 80px 0px 80px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 1 | yes |
| Nav button label | 16px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 80px | 96px | 500 | 3 | yes |
| Hero headline accent | 80px | 96px | 500 | 1 | yes |
| Hero subtitle | 20px | 28px | 400 | 8 | yes |
| Hero button label | 16px | 18px | 700 | 1 | yes |
| Eyebrow | 24px | 24px | 700 | 1 | yes |
| Section headline (H2) | 36px | 54px | 500 | 4 | yes |
| Market number | 112px | 112px | 800 | 1 | yes |
| Market heading (H3) | 30px | 45px | 500 | 1 | yes |
| Market text | 16px | 26px | 400 | 2 | yes |
| Kicker bar text | 20px | 30px | 600 | 1 | yes |
| Product badge | 12px | 16px | 600 | 1 | yes |
| Product title (H3) | 32px | 48px | 700 | 1 | yes |
| Product spec | 16px | 20px | 400 | 1 | yes |
| Product description | 16px | 20px | 400 | 2 | yes |
| Why partner headline (H2) | 36px | 54px | 500 | 1 | yes |
| Card text | 16px | 24px | 400 | 5 | yes |
| CTA eyebrow | 24px | 24px | 700 | 1 | yes |
| CTA statement (H2) | 36px | 54px | 500 | 5 | yes |
| CTA subtext | 20px | 30px | 400 | 3 | yes |
| CTA button label | 16px | 18px | 600 | 1 | yes |
| Footer company name | 20px | 30px | 700 | 1 | yes |
| Footer column heading | 12px | 18px | 700 | 1 | yes |
| Footer link | 12px | 18px | 400 | 1 | yes |
| Footer tagline | 14px | 21px | 400 | 4 | yes |
| Footer disclaimer | 14px | 21px | 400 | 2 | yes |
| Footer copyright | 12px | 18px | 400 | 1 | yes |

## C2.6 Images: dimensions, aspect ratios, object-fit

| Element | Source | Natural size (aspect) | Frame (aspect) | Rendered | Offset | object-fit / background-size | Position |
|---|---|---|---|---|---|---|---|
| div.gm-hero-bg-zoom.absolute.inset-0 | market-applications-hero-B6lqIDLK.jpg | 1672×941 (1.777) | 1280×889 (1.44) | 1579.6×889 | x -149.8, y 0 | cover | 50% 100% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 236×80 (2.95) | 235.51×80 | x 0.24, y 0 | contain | 50% 50% |
| img.absolute.inset-0.h-full | 40-BusXswKX.jpg | 1254×1254 (1) | 736×874 (0.842) | 874×874 | x -69, y 0 | cover | 50% 35% |
| img.absolute.inset-0.h-full | 350-OP0LuFUh.jpg | 1254×1254 (1) | 640×760 (0.842) | 760×760 | x -60, y 0 | cover | 50% 20% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.absolute.inset-0.h-full | co-oppurtunity-BzghXGdO.jpg | 1402×1122 (1.25) | 556×458 (1.214) | 572.3×458 | x -8.15, y 0 | cover | 50% 50% |
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
