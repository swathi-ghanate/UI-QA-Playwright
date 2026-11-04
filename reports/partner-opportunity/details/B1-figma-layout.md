# B1: Figma layout analysis

- **Page:** Partner Opportunity (http://192.168.5.250:8081/oem-opportunity)
- **Figma export:** design/partner-opportunity-1440.svg
- **Frame:** 1440 × 4629
- **Generated:** 2026-11-04T13:35:22.952Z by the UI Fidelity QA framework (Playwright, Chromium)

All positions are px on the 1440 artboard. Text positions use the baselines and start x stored in the file (tspan x/y), not rendered glyph extents.

## B1.0 Page-level layout

- **Page width:** 1440. **Total height:** 4629.
- **Content container:** x 80 to x 1360, so 1280 wide.
- **Max-width and breakpoints:** Not specified (one 1440 frame only).
- **Grid:** no layout grid is stored in an SVG export. Per-section structures are measured below.
- **Sidebar:** none.
- **Header height and fixed/sticky behaviour:** Not specified.
- **Padding inside containers:** Not specified as values (no auto-layout in the export); the distances in B1.2 are measured between layers.

| Section | y range | Height | Background |
|---|---|---|---|
| Hero | 0–854 | 854 | image OEM Opportunity - hero alternate.png |
| Advantages | 854–1832 | 978 | #FAFBFD |
| Partners | 1832–2854 | 1022 | #FFFFFF |
| Platform architecture | 2854–3438 | 584 | gradient |
| CTA | 3438–4078 | 640 | #FAFBFD |
| Footer | 4078–4629 | 551 | #E8F2FA |

## B1.1 Element boxes, top to bottom

| Element | Layer | x | y | Width | Height | Right | Bottom | Count |
|---|---|---|---|---|---|---|---|---|
| hero | [id="g-energy-hero"] > rect:nth-of-type(1) | 0 | 0 | 1440 | 854 | 1440 | 854 | 1 |
| heroOverlay | [id="g-energy-hero"] > rect:nth-of-type(2) | 0 | 0 | 1440 | 854 | 1440 | 854 | 1 |
| navBlur | [id="Navigation_Top_Bar"] foreignObject div | 299 | 21.5 | 924 | 101 | 1223 | 122.5 | 1 |
| header | [id="Navigation_Top_Bar"] | 80 | 32 | 236 | 80 | 316 | 112 | 1 |
| logo | [id="BargerTech Engine LOGO PNG No BKGRND 2"] | 80 | 32 | 236 | 80 | 316 | 112 | 1 |
| navPill | [id="Nav_Pill_Container"] | 323 | 45.5 | 876 | 53 | 1199 | 98.5 | 1 |
| navButton | [id="Button"] | 1206 | 48 | 154 | 48 | 1360 | 96 | 1 |
| navLinks | [id="Nav_Links"] > text | 346 | 65.09 | 59.82 | 15 | 405.82 | 80.09 | 7 |
| navCurrent | [id="Partner Opportunity_2"] | 703 | 65.09 | 127.35 | 15 | 830.35 | 80.09 | 1 |
| heroContent | [id="Left_Content_Column"] | 80 | 199.09 | 581.39 | 504.16 | 661.39 | 703.25 | 1 |
| h1 | [id="hero-headline-1"] > text:nth-of-type(1) | 80 | 199.09 | 425.39 | 174 | 505.39 | 373.09 | 1 |
| h1Accent | [id="hero-headline-1"] > text:nth-of-type(2) | 80 | 371.09 | 517.63 | 88 | 597.63 | 459.09 | 1 |
| heroText | [id="hero-subtitle"] | 80 | 484.27 | 581.39 | 112 | 661.39 | 596.27 | 1 |
| heroButton | [id="Button_2"] | 80 | 648 | 163 | 56 | 243 | 704 | 1 |
| advSection | [id="advantages-section"] | 0 | 854 | 1440 | 978 | 1440 | 1832 | 1 |
| advEyebrow | [id="Eyebrow"] | 80 | 959.73 | 294.08 | 26 | 374.08 | 985.73 | 1 |
| advEyebrowLine | [id="Line"] | 80 | 1000 | 48 | 2 | 128 | 1002 | 1 |
| advH2 | [id="Headline"] | 80 | 1026.09 | 507.81 | 40 | 587.81 | 1066.09 | 1 |
| advSplit | [id="Split_Layout"] | 80 | 1112 | 1280 | 620 | 1360 | 1732 | 1 |
| advPanel | [id="Visual_Panel"] > rect | 80 | 1112 | 440 | 620 | 520 | 1732 | 1 |
| advPanelImg | [id="Visual_Panel"] > rect | 80 | 1112 | 440 | 620 | 520 | 1732 | 1 |
| advList | [id="Content_Column"] | 584 | 1112 | 776 | 616.82 | 1360 | 1728.82 | 1 |
| advIcons | [id^="Icon_Wrap"] | 584 | 1112 | 56 | 56 | 640 | 1168 | 6 |
| advNumbers | [id^="Text_Content"] > text:nth-of-type(1) | 664 | 1113.55 | 18 | 20 | 682 | 1133.55 | 6 |
| advIconImgs | [id^="Icon_Wrap"] > g | 601.07 | 1129 | 21.93 | 21.03 | 623 | 1150.03 | 6 |
| advBodies | [id^="Text_Content"] > text:nth-of-type(2) | 663 | 1145.82 | 470.33 | 17 | 1133.33 | 1162.82 | 6 |
| advRows | [id="Content_Column"] > g | 584 | 1191 | 776 | 2 | 1360 | 1193 | 6 |
| advBorders | [id^="Benefit_Row"] > path[fill] | 584 | 1191 | 776 | 2 | 1360 | 1193 | 5 |
| ptSection | [id="Partners_Section"] | 0 | 1832 | 1440 | 1022 | 1440 | 2854 | 1 |
| ptEyebrow | [id="Eyebrow_2"] | 80 | 1937.73 | 230.06 | 26 | 310.06 | 1963.73 | 1 |
| ptH2 | [id="Headline_2"] | 80 | 2004.09 | 464.11 | 40 | 544.11 | 2044.09 | 1 |
| ptGrid | [id="Bento Grid"] | 80 | 2090 | 1280.33 | 664 | 1360.33 | 2754 | 1 |
| ptRow1 | [id="Row 1"] | 80 | 2090 | 1280.33 | 320 | 1360.33 | 2410 | 1 |
| ptCards | [id="Bento Grid"] [id^="Card "] > g | 80 | 2090 | 410.67 | 320 | 490.67 | 2410 | 6 |
| ptCardImages | [id="Bento Grid"] [id^="Card "] > g | 80 | 2090 | 410.67 | 320 | 490.67 | 2410 | 6 |
| ptCardOverlays | [id^="Content Overlay"] > rect | 80 | 2090 | 410.67 | 320 | 490.67 | 2410 | 6 |
| ptHeadings | [id^="Heading"] | 112 | 2261 | 301.47 | 55 | 413.47 | 2316 | 6 |
| ptDescriptions | [id^="Description"] | 111 | 2333.82 | 244.8 | 41 | 355.8 | 2374.82 | 6 |
| plGlows | [id="Ellipse"], [id="Ellipse_2"] | -100 | 2754 | 500 | 500 | 400 | 3254 | 2 |
| plBorder | [id="platform-architecture"] > path | 0 | 2853 | 1440 | 586 | 1440 | 3439 | 1 |
| plSection | [id="platform-architecture"] > g > path[fill^="url("] | 0 | 2854 | 1440 | 584 | 1440 | 3438 | 1 |
| plList | [id="ArchitectureList"] | 754 | 2954 | 606 | 384 | 1360 | 3338 | 1 |
| plRows | [id^="BulletRow"] | 754 | 2954 | 606 | 64 | 1360 | 3018 | 5 |
| plEyebrow | [id="Eyebrow_3"] | 80 | 2959.73 | 235.38 | 26 | 315.38 | 2985.73 | 1 |
| plLeft | [id="Frame 19"] | 80 | 2959.73 | 349.98 | 106.36 | 429.98 | 3066.09 | 1 |
| plChecks | [id="ArchitectureList"] [id^="Frame_"] | 774 | 2974 | 24 | 24 | 798 | 2998 | 5 |
| plTexts | [id^="BulletRow"] > text | 813 | 2977.82 | 388.89 | 17 | 1201.89 | 2994.82 | 5 |
| plEyebrowLine | [id="Line_3"] | 80 | 3000 | 48 | 2 | 128 | 3002 | 1 |
| plStatement | [id="Statement"] | 80 | 3026.09 | 349.98 | 40 | 429.98 | 3066.09 | 1 |
| ctaSection | [id="CTA_Section"] | 0 | 3438 | 1440 | 640 | 1440 | 4078 | 1 |
| ctaCard | [id="Closing Statement Section"] > g > rect | 80 | 3538 | 1280 | 440 | 1360 | 3978 | 1 |
| ctaGlows | [id="bg-glow-left"], [id="bg-glow-right"] | -157 | 3554 | 400 | 400 | 243 | 3954 | 2 |
| ctaLine | [id="Line_4"] | 688 | 3616 | 64 | 2 | 752 | 3618 | 1 |
| ctaText | [id="Statement Container"] > text | 174.33 | 3664.64 | 923.23 | 132 | 1097.56 | 3796.64 | 1 |
| ctaButton | [id="Button_3"] | 598 | 3842 | 244 | 56 | 842 | 3898 | 1 |
| footer | [id="bargertech-footer"] | 0 | 4078 | 1440 | 551 | 1440 | 4629 | 1 |
| footerCols | [id="UpperContent"] | 79 | 4144.36 | 1257.28 | 252.23 | 1336.28 | 4396.59 | 1 |
| footerHeadings | [id="UpperContent"] [id$="Heading"] | 409 | 4144.36 | 59.02 | 14 | 468.02 | 4158.36 | 4 |
| footerCompany | [id="CompanyName"] | 80 | 4146.27 | 105.36 | 22 | 185.36 | 4168.27 | 1 |
| footerLinks | [id="UpperContent"] [id$="Links"] text:not([id="Business Development"]) | 409 | 4183.59 | 59.82 | 15 | 468.82 | 4198.59 | 16 |
| footerPlainLink | [id="Why Now_2"] | 409 | 4183.59 | 59.82 | 15 | 468.82 | 4198.59 | 1 |
| footerColumns | [id="UpperContent"] > g | 81.5 | 4185 | 37 | 3 | 118.5 | 4188 | 5 |
| footerBar | [id="GreenDivider"] | 81.5 | 4185 | 37 | 3 | 118.5 | 4188 | 1 |
| footerTagline | [id="BrandTagline"] | 79 | 4207.59 | 221.06 | 57 | 300.06 | 4264.59 | 1 |
| footerEmail | [id="Contact Business Development"] | 930 | 4216.59 | 176.86 | 15 | 1106.86 | 4231.59 | 1 |
| footerMailIcon | [id="mail"] > path | 910.42 | 4218.08 | 13.16 | 10.84 | 923.58 | 4228.92 | 1 |
| footerLinkedIn | [id="LinkedIn"] | 929 | 4249.59 | 53.32 | 15 | 982.32 | 4264.59 | 1 |
| footerDivider1 | [id="DividerLine1"] | 80 | 4450 | 1280 | 1 | 1360 | 4451 | 1 |
| footerDisclaimer | [id="DisclaimerText"] | 109 | 4481.36 | 1029.78 | 32 | 1138.78 | 4513.36 | 1 |
| footerShield | [id="shield-check"] > path | 84 | 4481.5 | 14 | 17 | 98 | 4498.5 | 1 |
| footerCopyright | [id="Copyright"] | 80 | 4525.36 | 212.02 | 14 | 292.02 | 4539.36 | 1 |
| footerDivider2 | [id="DividerLine2"] | 80 | 4564 | 1280 | 1 | 1360 | 4565 | 1 |
| poweredRow | [id="Frame_10"] | 455.17 | 4585 | 528.33 | 24 | 983.5 | 4609 | 1 |
| beeLogo | [id="BeeHyv New Logo 2"] | 922.43 | 4585 | 1.75 | 2 | 924.18 | 4587 | 1 |
| poweredBy | [id="PoweredBy"] | 455.17 | 4590.09 | 390.5 | 15 | 845.67 | 4605.09 | 1 |

## B1.2 Spacing, padding and alignment

The Figma side of every layout check (offsets inside a section are measured from that section's top):

| Element | Value |
|---|---|
| Page — width | 1440px |
| Content container — left edge | 80px |
| Content container — width | 1280px |
| Sections — order top to bottom | [hero, advantages, partners, platform, cta, footer] |
| Sections — gaps between sections | [0, 0, 0, 0, 0] |
| Hero section — height | 854px |
| Advantages section — height | 978px |
| Partners section — height | 1022px |
| Platform section — height | 584px |
| CTA section — height | 640px |
| Footer — height | 551px |
| Logo — x | 80px |
| Logo — y | 32px |
| Logo — width | 236px |
| Logo — height | 80px |
| Nav pill — x | 323px |
| Nav pill — y | 45.5px |
| Nav pill — width | 876px |
| Nav pill — height | 53px |
| Nav button — x | 1206px |
| Nav button — y | 48px |
| Nav button — width | 154px |
| Nav button — height | 48px |
| Logo → nav pill — gap | 7px |
| Nav pill → nav button — gap | 7px |
| Header row — vertical centre line (logo) | 72px |
| Header row — vertical centre line (nav pill) | 72px |
| Header row — vertical centre line (nav button) | 72px |
| Nav links — first link inset from pill edge | 24px |
| Hero headline (H1) — text left edge | 80px |
| Hero headline (H1) — first baseline from hero top | 270.09px |
| Hero headline (H1) — text-align | left |
| Hero subtitle — text left edge | 80px |
| Hero subtitle — first baseline from hero top | 502.27px |
| Hero button — x | 80px |
| Hero button — y from hero top | 648px |
| Hero button — width | 163px |
| Hero button — height | 56px |
| Hero button — space below, to hero bottom | 150px |
| Advantages eyebrow — baseline from section top | 126.73px |
| Advantages eyebrow line — top from section top | 146px |
| Advantages eyebrow line — width | 48px |
| Advantages eyebrow line — thickness | 2px |
| Advantages headline (H2) — baseline from section top | 204.09px |
| Advantages split layout — top from section top | 258px |
| Advantages image panel — x | 80px |
| Advantages image panel — width | 440px |
| Advantages image panel — height | 620px |
| Advantages image → benefit list — gap | 64px |
| Benefit list — x | 584px |
| Benefit list — width | 776px |
| Benefit rows — pitch (row 1 top → row 2 top) | 104px |
| Benefit icon circle — size | 56px |
| Benefit icon → text — gap | 24px |
| Benefit number — baseline from row top | 17.55px |
| Benefit number → text — baseline distance | 30.27px |
| Advantages section — bottom padding | 100px |
| Partners eyebrow — baseline from section top | 126.73px |
| Partners headline (H2) — baseline from section top | 204.09px |
| Partner card grid — top from section top | 258px |
| Partner card grid — columns | 3 |
| Partner card — width | 410.67px |
| Partner card — height | 320px |
| Partner card grid — column gap | 24px |
| Partner card grid — row gap | 24px |
| Partner card text — left inset | 32px |
| Partner card text — last baseline → card bottom | 38.18px |
| Partner card heading → description — baseline distance | 36.82px |
| Partners section — bottom padding | 100px |
| Platform layout — columns | 2 |
| Platform eyebrow — baseline from section top | 126.73px |
| Platform statement (H2) — baseline from section top | 204.09px |
| Bullet list — x | 754px |
| Bullet list — width | 606px |
| Bullet list — top from section top | 100px |
| Bullet row — height | 64px |
| Bullet rows — gap | 16px |
| Check circle — inset from row left | 20px |
| Check circle — vertical centring in row (offset) | 0px |
| Check circle → bullet text — gap | 16px |
| Platform section — bottom padding | 100px |
| CTA card — top from section top | 100px |
| CTA card — x | 80px |
| CTA card — width | 1280px |
| CTA card — height | 440px |
| CTA section — bottom padding | 100px |
| CTA line — top from card top | 78px |
| CTA line — width | 64px |
| CTA statement — first baseline from card top | 155.64px |
| CTA statement — text-align | center |
| CTA button — width | 244px |
| CTA button — height | 56px |
| CTA button — horizontal centre | 720px |
| CTA button — space below, to card bottom | 80px |
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

1. **Hero** ([id="g-energy-hero"] > rect:nth-of-type(1), y 0–854): heroOverlay, navBlur, header, logo, navPill, navButton, navLinks, navCurrent, heroContent, h1, h1Accent, heroText, heroButton
2. **Advantages** ([id="advantages-section"], y 854–1832): advEyebrow, advEyebrowLine, advH2, advSplit, advPanel, advPanelImg, advList, advIcons, advNumbers, advIconImgs, advBodies, advRows, advBorders
3. **Partners** ([id="Partners_Section"], y 1832–2854): ptEyebrow, ptH2, ptGrid, ptRow1, ptCards, ptCardImages, ptCardOverlays, ptHeadings, ptDescriptions, plGlows, plBorder
4. **Platform architecture** ([id="platform-architecture"] > g > path[fill^="url("], y 2854–3438): plList, plRows, plEyebrow, plLeft, plChecks, plTexts, plEyebrowLine, plStatement
5. **CTA** ([id="CTA_Section"], y 3438–4078): ctaCard, ctaGlows, ctaLine, ctaText, ctaButton
6. **Footer** ([id="bargertech-footer"], y 4078–4629): footerCols, footerHeadings, footerCompany, footerLinks, footerPlainLink, footerColumns, footerBar, footerTagline, footerEmail, footerMailIcon, footerLinkedIn, footerDivider1, footerDisclaimer, footerShield, footerCopyright, footerDivider2, poweredRow, beeLogo, poweredBy
