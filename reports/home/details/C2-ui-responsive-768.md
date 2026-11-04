# C2: UI responsive analysis at 768px

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Viewport:** 768 × 900 (client width 768px). **Document:** 768 × 4589.
- **Horizontal scrolling:** no.
- **Active width breakpoints:** (width >= 40rem), (width >= 48rem).
- **Screenshot:** ../screenshots/C2-768.jpg
- **Generated:** 2026-11-04T13:35:52.606Z by the UI Fidelity QA framework (Playwright, Chromium)

## C2.1 Layout structure and columns

| Container | Display | Flex direction | Grid columns | Columns (measured) | Gap | Padding (t r b l) |
|---|---|---|---|---|---|---|
| header | block | row | none | 1 | normal | 12px 40px 12px 40px |
| heroContent | flex | column | none | 1 | 32px | 24px 40px 48px 40px |
| mkSection | block | row | none | 1 | normal | 100px 40px 100px 40px |
| mkGrid | grid | row | 688px | 1 | 48px | 0px 0px 0px 0px |
| mkList | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfSection | block | row | none | 1 | normal | 0px 0px 0px 0px |
| pfGrid | grid | row | 768px | 1 | normal | 0px 0px 0px 0px |
| pfPanel | flex | column | none | 1 | 20px | 24px 40px 40px 40px |
| wpSection | block | row | none | 1 | normal | 100px 40px 100px 40px |
| wpGrid | grid | row | 332px 332px | 2 | 24px | 0px 0px 0px 0px |
| ctaSection | block | row | none | 1 | normal | 64px 40px 64px 40px |
| ctaContent | flex | row | none | 2 | 24px | 0px 0px 0px 0px |
| footer | block | row | none | 1 | normal | 64px 40px 0px 40px |
| footerCols | grid | column | 154px 154px 154px 154px | 1 | 24px | 0px 0px 48px 0px |

## C2.2 Stacking order

| # | Section | y | Height |
|---|---|---|---|
| 1 | Hero | 0 | 580 |
| 2 | Market | 580 | 815 |
| 3 | Products | 1395 | 1120 |
| 4 | Why partner | 2515 | 738 |
| 5 | CTA | 3253 | 540 |
| 6 | Footer | 3793 | 796 |

DOM vs visual order differences: span.text-left "Begin Partner Qualification and Explore " in a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " (DOM 0, visual 1); span.gm-cta-hover-arrow.flex.h-6 in a.gm-cta-hover.flex.h-auto "Begin Partner Qualification and Explore " (DOM 1, visual 0); span "BargerTech Engines OEM Commercialization" in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 0, visual 1); img.h-[24px].w-[75px].shrink-0 in div.flex.items-center.justify-center "BargerTech Engines OEM Commercialization" (DOM 1, visual 0).

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
| div.flex.flex-col.gap-10 "BargerTech Powering the next generation " | flex sm:grid | grid | yes |

## C2.4 Element sizes, spacing and padding

| Element | x, y | Width × height | Padding (t r b l) | Margin (t r b l) |
|---|---|---|---|---|
| header | 0, 0 | 768 × 68 | 12px 40px 12px 40px | 0px 0px 0px 0px |
| logo | 40, 12 | 135 × 44 | 0px 0px 0px 0px | 0px 0px 0px 0px |
| navPill | 0, 0 | 0 × 0 | 16px 16px 16px 16px | 0px 0px 0px 0px |
| navButton | 574, 17 | 118 × 34 | 8px 16px 8px 16px | 0px 0px 0px 0px |
| heroContent | 0, 68 | 768 × 484.66 | 24px 40px 48px 40px | 0px 0px 0px 0px |
| heroButton | 40, 470.66 | 435.88 × 34 | 8px 8px 8px 16px | 0px 0px 0px 0px |
| advPanel | Not found | — | — | — |
| advList | Not found | — | — | — |
| advIcons | Not found | — | — | — |
| ptCards | Not found | — | — | — |
| plRows | Not found | — | — | — |
| plChecks | Not found | — | — | — |
| ctaCard | Not found | — | — | — |
| ctaButton | 40, 3658 | 197 × 34 | 0px 0px 0px 0px | 32px 0px 0px 0px |
| footer | 0, 3793 | 768 × 796 | 64px 40px 0px 40px | 0px 0px 0px 0px |

## C2.5 Font sizes and line-heights

| Role | Font size | Line-height | Weight | Rendered lines | Visible |
|---|---|---|---|---|---|
| Nav link | 14px | 20px | 500 | 0 | no |
| Nav button label | 14px | 18px | 600 | 1 | yes |
| Hero headline (H1) | 48px | 48px | 500 | 3 | yes |
| Hero headline accent | 48px | 48px | 500 | 1 | yes |
| Hero subtitle | 16px | 24px | 400 | 6 | yes |
| Hero button label | 14px | 18px | 700 | 1 | yes |
| Eyebrow | 12px | 18px | 700 | 1 | yes |
| Section headline (H2) | 28px | 42px | 500 | 2 | yes |
| Market number | 112px | 112px | 800 | 1 | yes |
| Market heading (H3) | 20px | 30px | 500 | 1 | yes |
| Market text | 12px | 18px | 400 | 1 | yes |
| Kicker bar text | 20px | 30px | 600 | 1 | yes |
| Product badge | 12px | 16px | 600 | 1 | yes |
| Product title (H3) | 24px | 36px | 700 | 1 | yes |
| Product spec | 16px | 24px | 400 | 1 | yes |
| Product description | 16px | 24px | 400 | 2 | yes |
| Why partner headline (H2) | 28px | 42px | 500 | 1 | yes |
| Card text | 16px | 24px | 400 | 3 | yes |
| CTA eyebrow | 12px | 18px | 700 | 1 | yes |
| CTA statement (H2) | 24px | 36px | 500 | 4 | yes |
| CTA subtext | 20px | 30px | 400 | 3 | yes |
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
| div.gm-hero-bg-zoom.absolute.inset-0 | market-applications-hero-B6lqIDLK.jpg | 1672×941 (1.777) | 768×580 (1.324) | 1030.56×580 | x -189.05, y 0 | cover | 72% 100% |
| img.h-full.w-full.object-contain | logo-BwAhwZKT.png | 2152×731 (2.944) | 135×44 (3.068) | 129.53×44 | x 2.73, y 0 | contain | 50% 50% |
| img.absolute.inset-0.h-full | 40-BusXswKX.jpg | 1254×1254 (1) | 883.2×644 (1.371) | 883.2×883.2 | x 0, y -83.72 | cover | 50% 35% |
| img.absolute.inset-0.h-full | 350-OP0LuFUh.jpg | 1254×1254 (1) | 768×560 (1.371) | 768×768 | x 0, y -41.6 | cover | 50% 20% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.h-6.w-6 | svg%3e | 24×24 (1) | 24×24 (1) | 24×24 | x 0, y 0 | fill | 50% 50% |
| img.absolute.inset-0.h-full | co-oppurtunity-BzghXGdO.jpg | 1402×1122 (1.25) | 224×372 (0.602) | 464.83×372 | x -120.42, y 0 | cover | 50% 50% |
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
