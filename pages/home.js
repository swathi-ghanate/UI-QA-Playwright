// Home page: what the framework measures and compares.
//
// elements: one entry per named thing on the page
//   figma: CSS selector inside the Figma SVG export (Figma layer ids)
//   ui:    Playwright selector in the live page
//   all:   true = measure every match (links, rows, cards), else the first match
// checks.A / B / C / D: the comparisons behind prompts A3, B3, C3 and D3 (audit E, text, needs nothing here)
//   (in home.checks.js).

// Live-page sections. The hero has no id, so it is the section that holds the header.
const HERO = 'section:has(> header)';
const MK = 'section#why-now';
const PF = 'section#platform';
const WP = 'section#oem-opportunity';
const CT = 'section#partner-opportunity';

const elements = {
  // ---- header / hero ----
  hero: { figma: '[id="g-energy-hero"] > rect:nth-of-type(1)', ui: HERO },
  heroBg: { figma: '[id="g-energy-hero"] > rect:nth-of-type(1)', ui: `${HERO} > .gm-hero-bg-zoom` },
  heroOverlay: { figma: '[id="g-energy-hero"] > rect:nth-of-type(2)', ui: `${HERO} > div.inset-0:not(.gm-hero-bg-zoom)` },
  header: { figma: '[id="Navigation_Top_Bar"]', ui: 'header' },
  logo: { figma: '[id="BargerTech Engine LOGO PNG No BKGRND 1"]', ui: 'header a:has(img)' },
  navPill: { figma: '[id="Nav_Pill_Container"]', ui: 'header nav' },
  navBlur: { figma: '[id="Navigation_Top_Bar"] foreignObject div' },
  navLinks: { figma: '[id="Nav_Links"] > text', ui: 'header nav a', all: true },
  navButton: { figma: '[id="Button"]', ui: 'header a:has-text("Partner Sign in")' },
  menuToggle: { ui: 'header button' },
  heroContent: { figma: '[id="Left_Content_Column"]', ui: `${HERO} > div.z-10` },
  h1: { figma: '[id="hero-headline-1"] > text:nth-of-type(1)', ui: `${HERO} h1` },
  h1Accent: { figma: '[id="hero-headline-1"] > text:nth-of-type(2)', ui: `${HERO} h1 span span` },
  heroText: { figma: '[id="hero-subtitle"]', ui: `${HERO} h1 ~ p` },
  heroButton: { figma: '[id="Button_2"]', ui: `${HERO} a:has-text("Begin Partner Qualification")` },
  heroArrow: { figma: '[id="cta-arrow-circle"] > rect', ui: `${HERO} .gm-cta-hover-arrow` },

  // ---- market (stats) ----
  mkSection: { figma: '[id="stats-section-redesign"]', ui: MK },
  mkHeader: { figma: '[id="Header Area"]', ui: `${MK} h2 >> xpath=..` },
  mkGrid: { ui: `${MK} > div.grid` },
  mkEyebrow: { figma: '[id="Eyebrow"]', ui: `${MK} p.uppercase` },
  mkEyebrowLine: { figma: '[id="Line"]', ui: `${MK} p.uppercase + span` },
  mkH2: { figma: '[id="Headline"]', ui: `${MK} h2` },
  mkList: { figma: '[id="Container"]', ui: `${MK} ul` },
  mkRows: { figma: '[id="Container"] > g', ui: `${MK} ul > li`, all: true },
  mkBorders: { figma: '[id^="HorizontalBorder"] > path', all: true },
  mkNumbers: { figma: '[id="Container"] text[id^="0"]', ui: `${MK} li > span`, all: true },
  mkHeadings: { figma: '[id^="Heading 3"] > text', ui: `${MK} li h3`, all: true },
  mkBodies: { figma: '[id="Container"] text[font-size="16"]', ui: `${MK} li p`, all: true },

  // ---- products (platform) ----
  pfSection: { figma: '[id="products-section-redesign"]', ui: PF },
  pfGrid: { figma: '[id="split-grid"]', ui: `${PF} > div.grid` },
  pfKicker: { figma: '[id="Glass_Kicker_Bar"]', ui: `${PF} > div.z-10` },
  pfKickerBlur: { figma: '[id="Overlaid_Section_Header"] foreignObject div' },
  pfKickerText: { figma: '[id="A platform for energy reliability and control"]', ui: `${PF} > div.z-10 p` },
  pfCards: { figma: '[id="split-grid"] > g', ui: `${PF} .gm-product-card`, all: true },
  pfImages: { figma: '[id="split-grid"] > g > rect:nth-of-type(1)', ui: `${PF} .gm-product-card-media > img`, all: true },
  pfTints: { figma: '[id="split-grid"] > g > rect:nth-of-type(2)', ui: `${PF} .gm-product-card-media > div`, all: true },
  pfPanel: { figma: '[id="Glass_Dashboard_Panel"]', ui: `${PF} .gm-product-card > div.relative` },
  pfPanels: { figma: '[id^="Glass_Dashboard_Panel"]', ui: `${PF} .gm-product-card > div.relative`, all: true },
  pfPanelBlurs: { figma: '[id^="Product_"] > foreignObject div', all: true },
  pfBadges: { figma: '[id^="Brand_Badge"]', ui: `${PF} .gm-product-card span.rounded-full`, all: true },
  pfTitles: { figma: '[id^="Product_Title"]', ui: `${PF} .gm-product-card h3`, all: true },
  pfSpecs: { figma: '[id^="Product_Spec"]', ui: `${PF} .gm-product-card h3 + p`, all: true },
  pfDividers: { figma: '[id="Line_2"], [id="Line_3"]', ui: `${PF} .gm-product-card div.h-px`, all: true },
  pfDescs: { figma: '[id="Frame_3"] > text, [id="Frame_6"] > text', ui: `${PF} .gm-product-card > div.relative > p`, all: true },

  // ---- why partner ----
  wpSection: { figma: '[id="why-partner-section"]', ui: WP },
  wpEyebrow: { figma: '[id="Eyebrow_2"]', ui: `${WP} p.uppercase` },
  wpEyebrowLine: { figma: '[id="Line_4"]', ui: `${WP} p.uppercase + span` },
  wpH2: { figma: '[id="Headline_2"]', ui: `${WP} h2` },
  wpGrid: { figma: '[id="Frame 13"]', ui: `${WP} div.grid` },
  wpCards: { figma: '[id="Frame 13"] > g', ui: `${WP} .gm-partner-card`, all: true },
  wpIcons: { figma: '[id^="icon-wrap"]', ui: `${WP} .gm-partner-card > span`, all: true },
  wpIconImgs: { figma: '[id^="icon-wrap"] > g', ui: `${WP} .gm-partner-card > span > img`, all: true },
  wpTexts: { figma: '[id^="card-desc"]', ui: `${WP} .gm-partner-card p`, all: true },

  // ---- CTA ----
  ctaSection: { figma: '[id="cta-section"] > g > path[fill^="url("]', ui: CT },
  ctaBorder: { figma: '[id="cta-section"] > path' },
  ctaContent: { figma: '[id="Content Column"]', ui: `${CT} .gm-reveal` },
  ctaEyebrow: { figma: '[id="Eyebrow_3"]', ui: `${CT} p.uppercase` },
  ctaEyebrowLine: { figma: '[id="Line_5"]', ui: `${CT} p.uppercase + span` },
  ctaStatement: { figma: '[id="Statement"]', ui: `${CT} h2` },
  ctaSubtext: { figma: '[id="Subtext"]', ui: `${CT} h2 + p` },
  ctaButton: { figma: '[id="Button_3"]', ui: `${CT} a` },
  ctaMedia: { figma: '[id="Media Frame"] > rect', ui: `${CT} div.border-2` },
  ctaImage: { figma: '[id="Industrial Turbine Image"] > rect:nth-of-type(1)', ui: `${CT} div.border-2 img` },
  ctaImageShade: { figma: '[id="Industrial Turbine Image"] > rect:nth-of-type(2)', ui: `${CT} div.border-2 img + div` },
  ctaGlows: { figma: '[id="Ellipse"], [id="Ellipse_2"]', ui: `${CT} > div.rounded-full`, all: true },

  // ---- footer (the same component as on Partner Opportunity) ----
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
  poweredRow: { figma: '[id="Frame_7"]', ui: 'footer > div > div:nth-child(3) > div' },
  poweredBy: { figma: '[id="PoweredBy"]', ui: 'footer > div > div:nth-child(3) span' },
  beeLogo: { figma: '[id="BeeHyv New Logo 2"]', ui: 'footer > div > div:nth-child(3) img' },
};

module.exports = {
  name: 'home',
  title: 'Home',
  path: '/', // on the site from BASE_URL
  svg: 'home-1440.svg', // in design/
  elements,
  checks: require('./home.checks'),

  // Sections top to bottom (B1, C1, C2).
  sections: [
    ['Hero', 'hero'],
    ['Market', 'mkSection'],
    ['Products', 'pfSection'],
    ['Why partner', 'wpSection'],
    ['CTA', 'ctaSection'],
    ['Footer', 'footer'],
  ],
  // Text roles for the typography tables (A1, A2, C1, C2).
  textRoles: [
    ['Nav link', 'navLinks'],
    ['Nav button label', 'navButton'],
    ['Hero headline (H1)', 'h1'],
    ['Hero headline accent', 'h1Accent'],
    ['Hero subtitle', 'heroText'],
    ['Hero button label', 'heroButton'],
    ['Eyebrow', 'mkEyebrow'],
    ['Section headline (H2)', 'mkH2'],
    ['Market number', 'mkNumbers'],
    ['Market heading (H3)', 'mkHeadings'],
    ['Market text', 'mkBodies'],
    ['Kicker bar text', 'pfKickerText'],
    ['Product badge', 'pfBadges'],
    ['Product title (H3)', 'pfTitles'],
    ['Product spec', 'pfSpecs'],
    ['Product description', 'pfDescs'],
    ['Why partner headline (H2)', 'wpH2'],
    ['Card text', 'wpTexts'],
    ['CTA eyebrow', 'ctaEyebrow'],
    ['CTA statement (H2)', 'ctaStatement'],
    ['CTA subtext', 'ctaSubtext'],
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
    'header', 'heroContent', 'mkSection', 'mkGrid', 'mkList', 'pfSection', 'pfGrid', 'pfPanel', 'wpSection', 'wpGrid',
    'ctaSection', 'ctaContent', 'footer', 'footerCols',
  ],
  // Interactive components for the state audit (D1, D2, D3).
  components: [
    { name: 'Nav links', element: 'navLinks' },
    { name: 'Primary button (nav)', element: 'navButton' },
    { name: 'Hero button', element: 'heroButton' },
    { name: 'CTA button', element: 'ctaButton' },
    { name: 'Footer links', element: 'footerLinks' },
    { name: 'Logo link', element: 'logo' },
    { name: 'Mobile menu toggle', element: 'menuToggle', viewport: 1024 },
  ],
  // Viewports for the responsive audit, from prompt C4 (1440 first: the only Figma frame).
  viewports: [1440, 1280, 1279, 1024, 1023, 768, 375],
  // Page-specific rows in the extraction reports (A1.5, A1.6, A2.6, B1, B2, C1.4, C1.7, C3 per-width notes).
  report: {
    icons: [['wpIconImgs', 'Card icon glyph'], ['heroArrow', 'Hero button arrow circle'], ['footerMailIcon', 'Footer mail icon'], ['footerShield', 'Footer shield icon']],
    figmaComponents: [
      ['Primary button (nav)', 'navButton'], ['Hero button', 'heroButton'], ['CTA button', 'ctaButton'], ['Nav pill', 'navPill'],
      ['Kicker bar', 'pfKicker'], ['Product panel', 'pfPanels'], ['Product badge', 'pfBadges'], ['Partner card', 'wpCards'],
      ['Card icon circle', 'wpIcons'],
    ],
    uiComponents: [
      ['Primary button (nav)', 'navButton'], ['Hero button', 'heroButton'], ['CTA button', 'ctaButton'], ['Nav link', 'navLinks'],
      ['Footer link', 'footerPlainLink'], ['Product badge', 'pfBadges'], ['Partner card', 'wpCards'],
    ],
    contentContainer: ['wpGrid', 'Why partner cards'],
    boxed: ['logo', 'navPill', 'navButton', 'heroButton', 'ctaButton', 'pfPanels', 'wpCards'],
    sizes: ['logo', 'navPill', 'navButton', 'heroButton', 'ctaButton', 'mkList', 'pfKicker', 'pfPanels', 'pfBadges', 'wpCards', 'wpIcons', 'ctaMedia', 'footer'],
    cards: { items: 'wpCards', row: 'wpGrid' },
    widthColumns: [['card grid', 'wpGrid'], ['market', 'mkGrid'], ['products', 'pfGrid']],
  },
};
