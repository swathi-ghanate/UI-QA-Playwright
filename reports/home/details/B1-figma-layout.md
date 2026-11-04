# B1: Figma layout analysis

- **Page:** Home (http://192.168.5.250:8081/)
- **Figma export:** design/home-1440.svg
- **Frame:** 1440 × 4372
- **Generated:** 2026-11-04T13:35:22.561Z by the UI Fidelity QA framework (Playwright, Chromium)

All positions are px on the 1440 artboard. Text positions use the baselines and start x stored in the file (tspan x/y), not rendered glyph extents.

## B1.0 Page-level layout

- **Page width:** 1440. **Total height:** 4372.
- **Content container:** x 80 to x 1360, so 1280 wide.
- **Max-width and breakpoints:** Not specified (one 1440 frame only).
- **Grid:** no layout grid is stored in an SVG export. Per-section structures are measured below.
- **Sidebar:** none.
- **Header height and fixed/sticky behaviour:** Not specified.
- **Padding inside containers:** Not specified as values (no auto-layout in the export); the distances in B1.2 are measured between layers.

| Section | y range | Height | Background |
|---|---|---|---|
| Hero | 0–940 | 940 | image Screenshot 2026-09-16 223033.png |
| Market | 940–1883 | 943 | #FAFBFD |
| Products | 1883–2643 | 760 | #FFFFFF |
| Why partner | 2643–3217 | 574 | #FAFBFD |
| CTA | 3217–3821 | 604 | gradient |
| Footer | 3821–4372 | 551 | #E8F2FA |

## B1.1 Element boxes, top to bottom

| Element | Layer | x | y | Width | Height | Right | Bottom | Count |
|---|---|---|---|---|---|---|---|---|
| hero | [id="g-energy-hero"] > rect:nth-of-type(1) | 0 | 0 | 1440 | 940 | 1440 | 940 | 1 |
| heroBg | [id="g-energy-hero"] > rect:nth-of-type(1) | 0 | 0 | 1440 | 940 | 1440 | 940 | 1 |
| heroOverlay | [id="g-energy-hero"] > rect:nth-of-type(2) | 0 | 0 | 1440 | 940 | 1440 | 940 | 1 |
| navBlur | [id="Navigation_Top_Bar"] foreignObject div | 301 | 21.5 | 920 | 101 | 1221 | 122.5 | 1 |
| header | [id="Navigation_Top_Bar"] | 80 | 32 | 236 | 80 | 316 | 112 | 1 |
| logo | [id="BargerTech Engine LOGO PNG No BKGRND 1"] | 80 | 32 | 236 | 80 | 316 | 112 | 1 |
| navPill | [id="Nav_Pill_Container"] | 325 | 45.5 | 872 | 53 | 1197 | 98.5 | 1 |
| navButton | [id="Button"] | 1206 | 48 | 154 | 48 | 1360 | 96 | 1 |
| navLinks | [id="Nav_Links"] > text | 348 | 65.09 | 59.82 | 15 | 407.82 | 80.09 | 7 |
| heroContent | [id="Left_Content_Column"] | 79 | 187.59 | 626 | 558.41 | 705 | 746 | 1 |
| h1 | [id="hero-headline-1"] > text:nth-of-type(1) | 80 | 187.59 | 625 | 282 | 705 | 469.59 | 1 |
| h1Accent | [id="hero-headline-1"] > text:nth-of-type(2) | 253.36 | 284.59 | 205.77 | 88 | 459.13 | 372.59 | 1 |
| heroText | [id="hero-subtitle"] | 79 | 496.27 | 546.34 | 142 | 625.34 | 638.27 | 1 |
| heroButton | [id="Button_2"] | 80 | 690 | 516 | 56 | 596 | 746 | 1 |
| heroArrow | [id="cta-arrow-circle"] > rect | 544 | 702 | 32 | 32 | 576 | 734 | 1 |
| mkSection | [id="stats-section-redesign"] | 0 | 940 | 1440 | 943 | 1440 | 1883 | 1 |
| mkList | [id="Container"] | 619 | 1022.9 | 665 | 716.92 | 1284 | 1739.82 | 1 |
| mkRows | [id="Container"] > g | 619 | 1022.9 | 650.66 | 158.92 | 1269.66 | 1181.82 | 4 |
| mkNumbers | [id="Container"] text[id^="0"] | 1157.66 | 1022.9 | 112 | 124 | 1269.66 | 1146.9 | 4 |
| mkHeader | [id="Header Area"] | 80 | 1045.73 | 359.86 | 268.36 | 439.86 | 1314.09 | 1 |
| mkEyebrow | [id="Eyebrow"] | 80 | 1045.73 | 359.39 | 26 | 439.39 | 1071.73 | 1 |
| mkEyebrowLine | [id="Line"] | 80 | 1086 | 48 | 2 | 128 | 1088 | 1 |
| mkHeadings | [id^="Heading 3"] > text | 620 | 1086.41 | 139.14 | 33 | 759.14 | 1119.41 | 4 |
| mkH2 | [id="Headline"] | 80 | 1112.09 | 359.86 | 202 | 439.86 | 1314.09 | 1 |
| mkBodies | [id="Container"] text[font-size="16"] | 619 | 1140.82 | 383.95 | 41 | 1002.95 | 1181.82 | 4 |
| mkBorders | [id^="HorizontalBorder"] > path | 620 | 1224 | 664 | 2 | 1284 | 1226 | 3 |
| pfSection | [id="products-section-redesign"] | 0 | 1883 | 1440 | 760 | 1440 | 2643 | 1 |
| pfGrid | [id="split-grid"] | 0 | 1883 | 1440 | 760 | 1440 | 2643 | 1 |
| pfCards | [id="split-grid"] > g | 0 | 1883 | 720 | 760 | 720 | 2643 | 2 |
| pfImages | [id="split-grid"] > g > rect:nth-of-type(1) | 0 | 1883 | 720 | 760 | 720 | 2643 | 2 |
| pfTints | [id="split-grid"] > g > rect:nth-of-type(2) | 0 | 1883 | 720 | 760 | 720 | 2643 | 2 |
| pfKickerBlur | [id="Overlaid_Section_Header"] foreignObject div | 458 | 1907 | 524 | 94 | 982 | 2001 | 1 |
| pfKicker | [id="Glass_Kicker_Bar"] | 474 | 1923 | 492 | 62 | 966 | 1985 | 1 |
| pfKickerText | [id="A platform for energy reliability and control"] | 509 | 1943.27 | 383.75 | 22 | 892.75 | 1965.27 | 1 |
| pfPanelBlurs | [id^="Product_"] > foreignObject div | 32 | 2251 | 656 | 360 | 688 | 2611 | 2 |
| pfPanel | [id="Glass_Dashboard_Panel"] | 64 | 2283 | 592 | 296 | 656 | 2579 | 1 |
| pfPanels | [id^="Glass_Dashboard_Panel"] | 64 | 2283 | 592 | 296 | 656 | 2579 | 2 |
| pfBadges | [id^="Brand_Badge"] | 104 | 2323 | 120 | 30 | 224 | 2353 | 2 |
| pfTitles | [id^="Product_Title"] | 104 | 2379.64 | 298.31 | 36 | 402.31 | 2415.64 | 2 |
| pfSpecs | [id^="Product_Spec"] | 104 | 2430.55 | 267.11 | 20 | 371.11 | 2450.55 | 2 |
| pfDividers | [id="Line_2"], [id="Line_3"] | 104 | 2470 | 512 | 1 | 616 | 2471 | 2 |
| pfDescs | [id="Frame_3"] > text, [id="Frame_6"] > text | 104 | 2494.82 | 423.88 | 41 | 527.88 | 2535.82 | 2 |
| wpSection | [id="why-partner-section"] | 0 | 2643 | 1440 | 574 | 1440 | 3217 | 1 |
| wpEyebrow | [id="Eyebrow_2"] | 80 | 2748.73 | 500.16 | 26 | 580.16 | 2774.73 | 1 |
| wpEyebrowLine | [id="Line_4"] | 80 | 2789 | 48 | 2 | 128 | 2791 | 1 |
| wpH2 | [id="Headline_2"] | 80 | 2815.09 | 430.64 | 40 | 510.64 | 2855.09 | 1 |
| wpGrid | [id="Frame 13"] | 80 | 2901 | 1280 | 216 | 1360 | 3117 | 1 |
| wpCards | [id="Frame 13"] > g | 80 | 2901 | 302 | 216 | 382 | 3117 | 4 |
| wpIcons | [id^="icon-wrap"] | 108 | 2929 | 48 | 48 | 156 | 2977 | 4 |
| wpIconImgs | [id^="icon-wrap"] > g | 121 | 2947 | 22 | 12 | 143 | 2959 | 4 |
| wpTexts | [id^="card-desc"] | 107 | 2996.82 | 188.5 | 89 | 295.5 | 3085.82 | 4 |
| ctaGlows | [id="Ellipse"], [id="Ellipse_2"] | -200 | 3117 | 600 | 600 | 400 | 3717 | 2 |
| ctaBorder | [id="cta-section"] > path | 0 | 3216 | 1440 | 2 | 1440 | 3218 | 1 |
| ctaSection | [id="cta-section"] > g > path[fill^="url("] | 0 | 3217 | 1440 | 604 | 1440 | 3821 | 1 |
| ctaMedia | [id="Media Frame"] > rect | 800 | 3297 | 560 | 444 | 1360 | 3741 | 1 |
| ctaImage | [id="Industrial Turbine Image"] > rect:nth-of-type(1) | 800 | 3297 | 560 | 444 | 1360 | 3741 | 1 |
| ctaImageShade | [id="Industrial Turbine Image"] > rect:nth-of-type(2) | 800 | 3297 | 560 | 444 | 1360 | 3741 | 1 |
| ctaContent | [id="Content Column"] | 79 | 3302.73 | 546.58 | 438.27 | 625.58 | 3741 | 1 |
| ctaEyebrow | [id="Eyebrow_3"] | 80 | 3302.73 | 360.07 | 26 | 440.07 | 3328.73 | 1 |
| ctaEyebrowLine | [id="Line_5"] | 80 | 3343 | 48 | 2 | 128 | 3345 | 1 |
| ctaStatement | [id="Statement"] | 79 | 3369.09 | 530.25 | 202 | 609.25 | 3571.09 | 1 |
| ctaSubtext | [id="Subtext"] | 79 | 3605.27 | 546.58 | 52 | 625.58 | 3657.27 | 1 |
| ctaButton | [id="Button_3"] | 80 | 3693 | 259 | 48 | 339 | 3741 | 1 |
| footer | [id="bargertech-footer"] | 0 | 3821 | 1440 | 551 | 1440 | 4372 | 1 |
| footerCols | [id="UpperContent"] | 79 | 3887.36 | 1257.28 | 252.23 | 1336.28 | 4139.59 | 1 |
| footerHeadings | [id="UpperContent"] [id$="Heading"] | 409 | 3887.36 | 59.02 | 14 | 468.02 | 3901.36 | 4 |
| footerCompany | [id="CompanyName"] | 80 | 3889.27 | 105.36 | 22 | 185.36 | 3911.27 | 1 |
| footerLinks | [id="UpperContent"] [id$="Links"] text:not([id="Business Development"]) | 409 | 3926.59 | 59.82 | 15 | 468.82 | 3941.59 | 16 |
| footerPlainLink | [id="Why Now_2"] | 409 | 3926.59 | 59.82 | 15 | 468.82 | 3941.59 | 1 |
| footerColumns | [id="UpperContent"] > g | 81.5 | 3928 | 37 | 3 | 118.5 | 3931 | 5 |
| footerBar | [id="GreenDivider"] | 81.5 | 3928 | 37 | 3 | 118.5 | 3931 | 1 |
| footerTagline | [id="BrandTagline"] | 79 | 3950.59 | 221.06 | 57 | 300.06 | 4007.59 | 1 |
| footerEmail | [id="Contact Business Development"] | 930 | 3959.59 | 176.86 | 15 | 1106.86 | 3974.59 | 1 |
| footerMailIcon | [id="mail"] > path | 910.42 | 3961.08 | 13.16 | 10.84 | 923.58 | 3971.92 | 1 |
| footerLinkedIn | [id="LinkedIn"] | 929 | 3992.59 | 53.32 | 15 | 982.32 | 4007.59 | 1 |
| footerDivider1 | [id="DividerLine1"] | 80 | 4193 | 1280 | 1 | 1360 | 4194 | 1 |
| footerDisclaimer | [id="DisclaimerText"] | 109 | 4224.36 | 1029.78 | 32 | 1138.78 | 4256.36 | 1 |
| footerShield | [id="shield-check"] > path | 84 | 4224.5 | 14 | 17 | 98 | 4241.5 | 1 |
| footerCopyright | [id="Copyright"] | 80 | 4268.36 | 212.02 | 14 | 292.02 | 4282.36 | 1 |
| footerDivider2 | [id="DividerLine2"] | 80 | 4307 | 1280 | 1 | 1360 | 4308 | 1 |
| poweredRow | [id="Frame_7"] | 455.17 | 4328 | 528.33 | 24 | 983.5 | 4352 | 1 |
| beeLogo | [id="BeeHyv New Logo 2"] | 922.42 | 4328 | 1.76 | 2 | 924.18 | 4330 | 1 |
| poweredBy | [id="PoweredBy"] | 455.17 | 4333.09 | 390.5 | 15 | 845.67 | 4348.09 | 1 |

## B1.2 Spacing, padding and alignment

The Figma side of every layout check (offsets inside a section are measured from that section's top):

| Element | Value |
|---|---|
| Page — width | 1440px |
| Content container — left edge | 80px |
| Content container — width | 1280px |
| Sections — order top to bottom | [hero, market, products, why partner, cta, footer] |
| Sections — gaps between sections | [0, 0, 0, 0, 0] |
| Hero section — height | 940px |
| Market section — height | 943px |
| Products section — height | 760px |
| Why partner section — height | 574px |
| CTA section — height | 604px |
| Footer — height | 551px |
| Logo — x | 80px |
| Logo — y | 32px |
| Logo — width | 236px |
| Logo — height | 80px |
| Nav pill — x | 325px |
| Nav pill — y | 45.5px |
| Nav pill — width | 872px |
| Nav pill — height | 53px |
| Nav button — x | 1206px |
| Nav button — y | 48px |
| Nav button — width | 154px |
| Nav button — height | 48px |
| Logo → nav pill — gap | 9px |
| Nav pill → nav button — gap | 9px |
| Header row — vertical centre line (logo) | 72px |
| Header row — vertical centre line (nav pill) | 72px |
| Header row — vertical centre line (nav button) | 72px |
| Nav links — first link inset from pill edge | 24px |
| Hero headline (H1) — text left edge | 80px |
| Hero headline (H1) — first baseline from hero top | 258.59px |
| Hero subtitle — text left edge | 80px |
| Hero subtitle — first baseline from hero top | 514.27px |
| Hero subtitle — width | 546.34px |
| Hero button — x | 80px |
| Hero button — y from hero top | 690px |
| Hero button — width | 516px |
| Hero button — height | 56px |
| Hero button — space below, to hero bottom | 194px |
| Market eyebrow — baseline from section top | 126.73px |
| Market eyebrow line — top from section top | 146px |
| Market eyebrow line — width | 48px |
| Market headline (H2) — baseline from section top | 204.09px |
| Market list — x | 619px |
| Market list — width | 665px |
| Market list — top from section top | 82.9px |
| Market rows — pitch (row 1 heading → row 2 heading) | 186px |
| Market heading → text — baseline distance | 41.41px |
| Market text — width | 383.95px |
| Market number — right edge | 1269.66px |
| Market section — bottom padding | 143.18px |
| Kicker bar — width | 492px |
| Kicker bar — height | 62px |
| Kicker bar — top from section top | 40px |
| Kicker bar — horizontal centre | 720px |
| Product cards — width | 720px |
| Product cards — height | 760px |
| Product panel — x | 64px |
| Product panel — top from section top | 400px |
| Product panel — width | 592px |
| Product panel — height | 296px |
| Product panel text — left inset | 40px |
| Product badge — top inset in panel | 40px |
| Product badge — width | 120px |
| Product badge — height | 30px |
| Product title → spec — baseline distance | 37.91px |
| Product spec → description — baseline distance | 62.27px |
| Product divider — width | 512px |
| Product panel — last baseline → panel bottom | 46.18px |
| Why partner eyebrow — baseline from section top | 126.73px |
| Why partner headline (H2) — baseline from section top | 204.09px |
| Partner card grid — top from section top | 258px |
| Partner card grid — columns | 4 |
| Partner card — width | 302px |
| Partner card — height | 216px |
| Partner card grid — column gap | 24px |
| Card icon — inset from card top | 28px |
| Card icon — inset from card left | 28px |
| Card icon → text — gap | 19.82px |
| Card text — left inset | 28px |
| Why partner section — bottom padding | 100px |
| CTA eyebrow — baseline from section top | 106.73px |
| CTA statement (H2) — baseline from section top | 184.09px |
| CTA subtext — baseline from section top | 406.27px |
| CTA button — x | 80px |
| CTA button — y from section top | 476px |
| CTA button — width | 259px |
| CTA button — height | 48px |
| CTA media frame — x | 800px |
| CTA media frame — top from section top | 80px |
| CTA media frame — width | 560px |
| CTA media frame — height | 444px |
| CTA section — bottom padding | 80px |
| Footer columns — count | 5 |
| Footer column 2 (Explore) — x | 410px |
| Footer column 3 (Partners) — x | 660px |
| Footer column 4 (Contact) — x | 910px |
| Footer column 5 (Legal) — x | 1180px |
| Footer company name — baseline from footer top | 86.27px |
| Footer column headings — baseline from footer top | 77.36px |
| Footer heading → first link — baseline distance | 40.23px |
| Footer links — row pitch | 33px |
| Footer divider 1 — top from footer top | 372px |
| Footer disclaimer — baseline below divider 1 | 42.36px |
| Footer divider 2 — top from footer top | 486px |
| Footer bottom bar — space below divider 2 | 20px |
| Footer bottom bar — space to page bottom | 20px |
| Footer bottom bar — horizontal centre | 719.34px |

## B1.3 Order and hierarchy (top to bottom)

1. **Hero** ([id="g-energy-hero"] > rect:nth-of-type(1), y 0–940): heroBg, heroOverlay, navBlur, header, logo, navPill, navButton, navLinks, heroContent, h1, h1Accent, heroText, heroButton, heroArrow
2. **Market** ([id="stats-section-redesign"], y 940–1883): mkList, mkRows, mkNumbers, mkHeader, mkEyebrow, mkEyebrowLine, mkHeadings, mkH2, mkBodies, mkBorders
3. **Products** ([id="products-section-redesign"], y 1883–2643): pfGrid, pfCards, pfImages, pfTints, pfKickerBlur, pfKicker, pfKickerText, pfPanelBlurs, pfPanel, pfPanels, pfBadges, pfTitles, pfSpecs, pfDividers, pfDescs
4. **Why partner** ([id="why-partner-section"], y 2643–3217): wpEyebrow, wpEyebrowLine, wpH2, wpGrid, wpCards, wpIcons, wpIconImgs, wpTexts, ctaGlows, ctaBorder
5. **CTA** ([id="cta-section"] > g > path[fill^="url("], y 3217–3821): ctaMedia, ctaImage, ctaImageShade, ctaContent, ctaEyebrow, ctaEyebrowLine, ctaStatement, ctaSubtext, ctaButton
6. **Footer** ([id="bargertech-footer"], y 3821–4372): footerCols, footerHeadings, footerCompany, footerLinks, footerPlainLink, footerColumns, footerBar, footerTagline, footerEmail, footerMailIcon, footerLinkedIn, footerDivider1, footerDisclaimer, footerShield, footerCopyright, footerDivider2, poweredRow, beeLogo, poweredBy
