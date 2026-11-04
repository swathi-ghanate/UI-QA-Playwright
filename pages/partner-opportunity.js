// Partner Opportunity page: what the framework measures and compares.
//
// elements: one entry per named thing on the page
//   figma: CSS selector inside the Figma SVG export (Figma layer ids)
//   ui:    Playwright selector in the live page
//   all:   true = measure every match (links, rows, cards), else the first match
// checks.A / B / C / D: the comparisons behind prompts A3, B3, C3 and D3 (audit E, text, needs nothing here)
//   (in partner-opportunity.checks.js).

// Live-page sections, found by their headline text so they survive class changes.
const ADV = 'section:has-text("What a Strategic Partner May Gain")';
const PT = 'section:has-text("Who BargerTech Wants to Meet")';
const PL = 'section:has-text("Commercial Philosophy")';
const CTA = 'section:has-text("The objective is not to collect")';

const elements = {
  // ---- header / hero ----
  hero: { figma: '[id="g-energy-hero"] > rect:nth-of-type(1)', ui: 'section#oem-opportunity' },
  heroOverlay: { figma: '[id="g-energy-hero"] > rect:nth-of-type(2)', ui: 'section#oem-opportunity > div.inset-0' },
  header: { figma: '[id="Navigation_Top_Bar"]', ui: 'header' },
  logo: { figma: '[id="BargerTech Engine LOGO PNG No BKGRND 2"]', ui: 'header a:has(img)' },
  navPill: { figma: '[id="Nav_Pill_Container"]', ui: 'header nav' },
  navBlur: { figma: '[id="Navigation_Top_Bar"] foreignObject div' },
  navLinks: { figma: '[id="Nav_Links"] > text', ui: 'header nav a', all: true },
  navCurrent: { figma: '[id="Partner Opportunity_2"]', ui: 'header nav a:has-text("Partner Opportunity")' },
  navButton: { figma: '[id="Button"]', ui: 'header a:has-text("Partner Sign in")' },
  menuToggle: { ui: 'header button' },
  heroContent: { figma: '[id="Left_Content_Column"]', ui: 'section#oem-opportunity > div.z-10' },
  h1: { figma: '[id="hero-headline-1"] > text:nth-of-type(1)', ui: '#oem-opportunity h1' },
  h1Accent: { figma: '[id="hero-headline-1"] > text:nth-of-type(2)', ui: '#oem-opportunity h1 > span:last-child' },
  heroText: { figma: '[id="hero-subtitle"]', ui: '#oem-opportunity h1 ~ p' },
  heroButton: { figma: '[id="Button_2"]', ui: '#oem-opportunity a:has-text("See Partner Fit")' },

  // ---- advantages ----
  advSection: { figma: '[id="advantages-section"]', ui: ADV },
  advEyebrow: { figma: '[id="Eyebrow"]', ui: `${ADV} p:has-text("Strategic Advantage")` },
  advEyebrowLine: { figma: '[id="Line"]', ui: `${ADV} p:has-text("Strategic Advantage") + img` },
  advH2: { figma: '[id="Headline"]', ui: `${ADV} h2` },
  advSplit: { figma: '[id="Split_Layout"]', ui: `${ADV} ul >> xpath=..` },
  advPanel: { figma: '[id="Visual_Panel"] > rect', ui: `${ADV} .gm-scale-in` },
  advPanelImg: { figma: '[id="Visual_Panel"] > rect', ui: `${ADV} .gm-scale-in img` },
  advList: { figma: '[id="Content_Column"]', ui: `${ADV} ul` },
  advRows: { figma: '[id="Content_Column"] > g', ui: `${ADV} ul > li`, all: true },
  advBorders: { figma: '[id^="Benefit_Row"] > path[fill]', all: true },
  advIcons: { figma: '[id^="Icon_Wrap"]', ui: `${ADV} ul > li > span:first-child`, all: true },
  advIconImgs: { figma: '[id^="Icon_Wrap"] > g', ui: `${ADV} ul > li > span:first-child > *`, all: true },
  advNumbers: { figma: '[id^="Text_Content"] > text:nth-of-type(1)', ui: `${ADV} ul > li div > span:first-child`, all: true },
  advBodies: { figma: '[id^="Text_Content"] > text:nth-of-type(2)', ui: `${ADV} ul > li p`, all: true },

  // ---- partners ----
  ptSection: { figma: '[id="Partners_Section"]', ui: PT },
  ptEyebrow: { figma: '[id="Eyebrow_2"]', ui: `${PT} p:has-text("Ideal Alignment")` },
  ptH2: { figma: '[id="Headline_2"]', ui: `${PT} h2` },
  ptGrid: { figma: '[id="Bento Grid"]', ui: `${PT} div.grid` },
  ptRow1: { figma: '[id="Row 1"]' },
  ptCards: { figma: '[id="Bento Grid"] [id^="Card "] > g', ui: `${PT} .gm-partner-image-card`, all: true },
  ptCardImages: { figma: '[id="Bento Grid"] [id^="Card "] > g', ui: `${PT} .gm-partner-image-card img`, all: true },
  ptCardOverlays: { figma: '[id^="Content Overlay"] > rect', ui: `${PT} .gm-partner-image-card > div.inset-0`, all: true },
  ptHeadings: { figma: '[id^="Heading"]', ui: `${PT} .gm-partner-image-card h3`, all: true },
  ptDescriptions: { figma: '[id^="Description"]', ui: `${PT} .gm-partner-image-card p`, all: true },

  // ---- platform architecture ----
  plSection: { figma: '[id="platform-architecture"] > g > path[fill^="url("]', ui: PL },
  plBorder: { figma: '[id="platform-architecture"] > path' },
  plEyebrow: { figma: '[id="Eyebrow_3"]', ui: `${PL} p:has-text("Platform Values")` },
  plEyebrowLine: { figma: '[id="Line_3"]', ui: `${PL} p:has-text("Platform Values") + img` },
  plStatement: { figma: '[id="Statement"]', ui: `${PL} h2` },
  plLeft: { figma: '[id="Frame 19"]', ui: `${PL} h2 >> xpath=..` },
  plGrid: { ui: `${PL} ul >> xpath=..` },
  plList: { figma: '[id="ArchitectureList"]', ui: `${PL} ul` },
  plRows: { figma: '[id^="BulletRow"]', ui: `${PL} li`, all: true },
  plChecks: { figma: '[id="ArchitectureList"] [id^="Frame_"]', ui: `${PL} .gm-checklist-icon`, all: true },
  plTexts: { figma: '[id^="BulletRow"] > text', ui: `${PL} li p`, all: true },
  plGlows: { figma: '[id="Ellipse"], [id="Ellipse_2"]', ui: `${PL} > div.rounded-full`, all: true },

  // ---- CTA ----
  ctaSection: { figma: '[id="CTA_Section"]', ui: CTA },
  ctaCard: { figma: '[id="Closing Statement Section"] > g > rect', ui: `${CTA} .gm-reveal` },
  ctaLine: { figma: '[id="Line_4"]', ui: `${CTA} .gm-reveal .z-10 > div:first-child` },
  ctaText: { figma: '[id="Statement Container"] > text', ui: `${CTA} .gm-reveal p` },
  ctaButton: { figma: '[id="Button_3"]', ui: `${CTA} a` },
  ctaGlows: { figma: '[id="bg-glow-left"], [id="bg-glow-right"]', ui: `${CTA} .gm-reveal > div.rounded-full`, all: true },

  // ---- footer ----
  footer: { figma: '[id="bargertech-footer"]', ui: 'footer' },
  footerCols: { figma: '[id="UpperContent"]', ui: 'footer > div > div:nth-child(1)' },
  footerColumns: { figma: '[id="UpperContent"] > g', ui: 'footer > div > div:nth-child(1) > div', all: true },
  footerCompany: { figma: '[id="CompanyName"]', ui: 'footer h3' },
  footerBar: { figma: '[id="GreenDivider"]', ui: 'footer h3 + div' },
  footerTagline: { figma: '[id="BrandTagline"]', ui: 'footer h3 ~ p' },
  footerHeadings: { figma: '[id="UpperContent"] [id$="Heading"]', ui: 'footer p.font-bold', all: true },
  // "Business Development" is a label above the contact links in Figma, not a link.
  footerLinks: { figma: '[id="UpperContent"] [id$="Links"] text:not([id="Business Development"])', ui: 'footer ul a', all: true },
  footerPlainLink: { figma: '[id="Why Now_2"]', ui: 'footer ul a:has-text("Why Now")' },
  footerEmail: { figma: '[id="Contact Business Development"]', ui: 'footer a[href^="mailto:"]' },
  footerLinkedIn: { figma: '[id="LinkedIn"]', ui: 'footer a[href*="linkedin"]' },
  footerMailIcon: { figma: '[id="mail"] > path', ui: 'footer a[href^="mailto:"] svg, footer a[href^="mailto:"] img' },
  footerDivider1: { figma: '[id="DividerLine1"]', ui: 'footer > div > div:nth-child(2)' },
  footerDisclaimer: { figma: '[id="DisclaimerText"]', ui: 'footer > div > div:nth-child(2) > div:first-child p' },
  footerShield: { figma: '[id="shield-check"] > path', ui: 'footer > div > div:nth-child(2) svg, footer > div > div:nth-child(2) img' },
  footerCopyright: { figma: '[id="Copyright"]', ui: 'footer p:has-text("©")' },
  footerDivider2: { figma: '[id="DividerLine2"]', ui: 'footer > div > div:nth-child(3)' },
  poweredRow: { figma: '[id="Frame_10"]', ui: 'footer > div > div:nth-child(3) > div' },
  poweredBy: { figma: '[id="PoweredBy"]', ui: 'footer > div > div:nth-child(3) span' },
  beeLogo: { figma: '[id="BeeHyv New Logo 2"]', ui: 'footer > div > div:nth-child(3) img' },
};

module.exports = {
  name: 'partner-opportunity',
  title: 'Partner Opportunity',
  path: '/oem-opportunity', // on the site from BASE_URL
  svg: 'partner-opportunity-1440.svg', // in design/
  elements,
  checks: require('./partner-opportunity.checks'),

  // Sections top to bottom (B1, C1, C2).
  sections: [
    ['Hero', 'hero'],
    ['Advantages', 'advSection'],
    ['Partners', 'ptSection'],
    ['Platform architecture', 'plSection'],
    ['CTA', 'ctaSection'],
    ['Footer', 'footer'],
  ],
  // Text roles for the typography tables (A1, A2, C1, C2).
  textRoles: [
    ['Nav link', 'navLinks'],
    ['Nav link (current page)', 'navCurrent'],
    ['Nav button label', 'navButton'],
    ['Hero headline (H1)', 'h1'],
    ['Hero subtitle', 'heroText'],
    ['Hero button label', 'heroButton'],
    ['Eyebrow', 'advEyebrow'],
    ['Section headline (H2)', 'advH2'],
    ['Benefit number', 'advNumbers'],
    ['Benefit text', 'advBodies'],
    ['Card heading (H3)', 'ptHeadings'],
    ['Card description', 'ptDescriptions'],
    ['Platform statement (H2)', 'plStatement'],
    ['Bullet row text', 'plTexts'],
    ['CTA statement', 'ctaText'],
    ['CTA button label', 'ctaButton'],
    ['Footer company name', 'footerCompany'],
    ['Footer column heading', 'footerHeadings'],
    ['Footer link', 'footerPlainLink'],
    ['Footer tagline', 'footerTagline'],
    ['Footer disclaimer', 'footerDisclaimer'],
    ['Footer copyright', 'footerCopyright'],
  ],
  // Containers whose padding / gap / layout method is reported (A2, B2, C2).
  containers: [
    'header', 'heroContent', 'advSection', 'advSplit', 'advList', 'ptSection', 'ptGrid',
    'plSection', 'plGrid', 'plList', 'ctaSection', 'ctaCard', 'footer', 'footerCols',
  ],
  // Interactive components for the state audit (D1, D2, D3).
  components: [
    { name: 'Nav links', element: 'navLinks' },
    { name: 'Primary button (nav)', element: 'navButton' },
    { name: 'Secondary button (hero)', element: 'heroButton' },
    { name: 'Secondary button (CTA)', element: 'ctaButton' },
    { name: 'Footer links', element: 'footerLinks' },
    { name: 'Logo link', element: 'logo' },
    { name: 'Mobile menu toggle', element: 'menuToggle', viewport: 1024 },
  ],
  // Viewports for the responsive audit, from prompt C4 (1440 first: the only Figma frame).
  viewports: [1440, 1280, 1279, 1024, 1023, 768, 375],
  // Page-specific rows in the extraction reports (A1.5, A1.6, A2.6, B1, B2, C1.4, C1.7, C3 per-width notes).
  report: {
    icons: [['advIconImgs', 'Benefit icon glyph'], ['plChecks', 'Check circle'], ['footerMailIcon', 'Footer mail icon'], ['footerShield', 'Footer shield icon']],
    figmaComponents: [
      ['Primary button (nav)', 'navButton'], ['Secondary button (hero)', 'heroButton'], ['Secondary button (CTA)', 'ctaButton'],
      ['Nav pill', 'navPill'], ['Partner card', 'ptCards'], ['Bullet row', 'plRows'], ['Benefit icon circle', 'advIcons'],
    ],
    uiComponents: [
      ['Primary button (nav)', 'navButton'], ['Secondary button (hero)', 'heroButton'], ['Secondary button (CTA)', 'ctaButton'],
      ['Nav link', 'navLinks'], ['Footer link', 'footerPlainLink'], ['Partner card', 'ptCards'],
    ],
    contentContainer: ['advSplit', 'Advantages'],
    boxed: ['logo', 'navPill', 'navButton', 'heroButton', 'ctaButton', 'ptCards', 'plRows'],
    sizes: ['logo', 'navPill', 'navButton', 'heroButton', 'ctaButton', 'advPanel', 'advIcons', 'ptCards', 'plRows', 'plChecks', 'ctaCard', 'footer'],
    cards: { items: 'ptCards', row: 'ptRow1' },
    widthColumns: [['partner grid', 'ptGrid'], ['advantages', 'advSplit']],
  },
};
