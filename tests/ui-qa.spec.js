// UI Design Fidelity QA Framework v2.1 - Enhanced evidence extractor (Section 19.5)
// Clean copy of the tested reference, with the post-test "footer" patch applied.
// To add a page, add one line to CASES below. Each page runs as its own test.

const { test } = require('@playwright/test');
const fs = require('fs');

// ---------------- CONFIG ----------------
const BASE_URL = 'https://bargertechenergy.com';
const VIEWPORT = { width: 1440, height: 900 };

// One entry per page. Each becomes its own independent test.
// name must match your design files: design/<name>-1440.svg / .png
const CASES = [
  { route: '/', name: 'home' },
  { route: '/oem-opportunity', name: 'partner-opportunity' },
];
// ----------------------------------------

for (const pageCase of CASES) {
const URL = BASE_URL + pageCase.route;
const NAME = `${pageCase.name}-${VIEWPORT.width}`; // used for output file names

test(`${NAME} - enhanced UI fidelity evidence`, async ({ browser }) => {
  test.setTimeout(5 * 60 * 1000);

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'domcontentloaded' });

  // Wait for fonts.
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  // Prefer deterministic rendering.
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // Scroll once so lazy-loaded images/content render.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.documentElement.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(800);

  fs.mkdirSync('output', { recursive: true });
  fs.mkdirSync('screenshots', { recursive: true });

  // Full-page visual evidence for screenshot/Figma-PNG comparison.
  await page.screenshot({
    path: `screenshots/${NAME}-enhanced.png`,
    fullPage: true,
    animations: 'disabled',
  });

  const evidence = await page.evaluate(() => {
    const transparent = (value) =>
      !value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)';

    const pxNumber = (value) => {
      const n = parseFloat(value);
      return Number.isFinite(n) ? n : 0;
    };

    const cleanText = (text) =>
      (text || '').replace(/\s+/g, ' ').trim().slice(0, 500);

    const isVisible = (el) => {
      const css = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return (
        css.display !== 'none' &&
        css.visibility !== 'hidden' &&
        css.opacity !== '0' &&
        r.width > 0 &&
        r.height > 0
      );
    };

    const pseudoSnapshot = (el, pseudo) => {
      const css = getComputedStyle(el, pseudo);
      const content = css.content;
      if (!content || content === 'none' || content === 'normal' || css.display === 'none') {
        return null;
      }
      return {
        content,
        display: css.display,
        position: css.position,
        width: css.width,
        height: css.height,
        color: css.color,
        backgroundColor: css.backgroundColor,
        backgroundImage: css.backgroundImage,
        borderRadius: css.borderRadius,
        boxShadow: css.boxShadow,
        transform: css.transform,
        opacity: css.opacity,
      };
    };

    const snapshot = (el, index, category = 'element') => {
      const r = el.getBoundingClientRect();
      const css = getComputedStyle(el);
      const borderWidths = {
        top: css.borderTopWidth,
        right: css.borderRightWidth,
        bottom: css.borderBottomWidth,
        left: css.borderLeftWidth,
      };
      const borderColors = {
        top: css.borderTopColor,
        right: css.borderRightColor,
        bottom: css.borderBottomColor,
        left: css.borderLeftColor,
      };
      return {
        index,
        category,
        tag: el.tagName,
        id: el.id || '',
        className:
          typeof el.className === 'string' ? el.className : el.className?.baseVal || '',
        role: el.getAttribute('role') || '',
        ariaLabel: el.getAttribute('aria-label') || '',
        text: cleanText(el.innerText || el.textContent),
        x: Math.round(r.x * 100) / 100,
        y: Math.round((r.y + window.scrollY) * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
        display: css.display,
        position: css.position,
        zIndex: css.zIndex,
        fontFamily: css.fontFamily,
        fontSize: css.fontSize,
        fontWeight: css.fontWeight,
        lineHeight: css.lineHeight,
        letterSpacing: css.letterSpacing,
        textAlign: css.textAlign,
        textTransform: css.textTransform,
        textDecoration: css.textDecorationLine,
        color: css.color,
        backgroundColor: css.backgroundColor,
        backgroundImage: css.backgroundImage,
        backgroundSize: css.backgroundSize,
        backgroundPosition: css.backgroundPosition,
        backgroundRepeat: css.backgroundRepeat,
        backgroundBlendMode: css.backgroundBlendMode,
        marginTop: css.marginTop,
        marginRight: css.marginRight,
        marginBottom: css.marginBottom,
        marginLeft: css.marginLeft,
        paddingTop: css.paddingTop,
        paddingRight: css.paddingRight,
        paddingBottom: css.paddingBottom,
        paddingLeft: css.paddingLeft,
        gap: css.gap,
        rowGap: css.rowGap,
        columnGap: css.columnGap,
        borderWidths,
        borderColors,
        borderRadius: css.borderRadius,
        boxShadow: css.boxShadow,
        filter: css.filter,
        backdropFilter: css.backdropFilter || css.webkitBackdropFilter || 'none',
        transform: css.transform,
        transformOrigin: css.transformOrigin,
        objectFit: css.objectFit,
        objectPosition: css.objectPosition,
        overflow: css.overflow,
        overflowX: css.overflowX,
        overflowY: css.overflowY,
        opacity: css.opacity,
        naturalWidth: el instanceof HTMLImageElement ? el.naturalWidth : undefined,
        naturalHeight: el instanceof HTMLImageElement ? el.naturalHeight : undefined,
        currentSrc: el instanceof HTMLImageElement ? el.currentSrc : undefined,
        before: pseudoSnapshot(el, '::before'),
        after: pseudoSnapshot(el, '::after'),
      };
    };

    // "footer" added per the framework's post-test patch.
    const primarySelectors = [
      'header', 'nav', 'main', 'section', 'footer',
      'h1', 'h2', 'h3', 'p', 'span', 'a', 'button', 'img', 'svg',
    ];

    const primary = [...document.querySelectorAll(primarySelectors.join(','))]
      .filter(isVisible)
      .map((el, i) => snapshot(el, i, 'primary'));

    // Capture only meaningful DIV containers so the JSON does not explode.
    const divs = [...document.querySelectorAll('div')].filter((el) => {
      if (!isVisible(el)) return false;
      const css = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const hasBackground = !transparent(css.backgroundColor) || css.backgroundImage !== 'none';
      const hasBorder =
        pxNumber(css.borderTopWidth) > 0 ||
        pxNumber(css.borderRightWidth) > 0 ||
        pxNumber(css.borderBottomWidth) > 0 ||
        pxNumber(css.borderLeftWidth) > 0;
      const hasRadius = pxNumber(css.borderRadius) > 0;
      const hasShadow = css.boxShadow !== 'none';
      const hasFilter =
        css.filter !== 'none' ||
        (css.backdropFilter || css.webkitBackdropFilter || 'none') !== 'none';
      const layoutContainer = ['flex', 'grid', 'inline-flex', 'inline-grid'].includes(css.display);
      // Avoid capturing tiny or purely structural wrappers.
      const substantial = r.width >= 80 && r.height >= 32;
      return (
        substantial &&
        (hasBackground || hasBorder || hasRadius || hasShadow || hasFilter || layoutContainer)
      );
    });
    const containers = divs.map((el, i) => snapshot(el, i, 'meaningful-container'));

    // Capture inline-vector bounds without treating every path as a defect.
    const vectors = [...document.querySelectorAll('svg')].filter(isVisible).map((svg, i) => {
      const r = svg.getBoundingClientRect();
      return {
        index: i,
        tag: 'SVG',
        id: svg.id || '',
        className:
          typeof svg.className === 'string' ? svg.className : svg.className?.baseVal || '',
        x: Math.round(r.x * 100) / 100,
        y: Math.round((r.y + window.scrollY) * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
        viewBox: svg.getAttribute('viewBox') || '',
        pathCount: svg.querySelectorAll('path').length,
        rectCount: svg.querySelectorAll('rect').length,
        circleCount: svg.querySelectorAll('circle').length,
        lineCount: svg.querySelectorAll('line').length,
      };
    });

    return {
      metadata: {
        url: location.href,
        title: document.title,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio,
        },
        document: {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        },
      },
      primary,
      containers,
      vectors,
    };
  });

  // Mark interactive elements with temporary QA IDs so we can inspect
  // real default / hover / focus / disabled states.
  const interactiveIds = await page.evaluate(() => {
    const selectors = [
      'a[href]', 'button', '[role="button"]', 'input', 'select', 'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const visible = (el) => {
      const css = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return (
        css.display !== 'none' &&
        css.visibility !== 'hidden' &&
        css.opacity !== '0' &&
        r.width > 0 &&
        r.height > 0
      );
    };
    const items = [...document.querySelectorAll(selectors.join(','))].filter(visible);
    return items.map((el, i) => {
      const id = `uiqa-${i}`;
      el.setAttribute('data-uiqa-id', id);
      return id;
    });
  });

  const stateEvidence = [];

  const getState = async (locator) => {
    return await locator.evaluate((el) => {
      const css = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        text: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 250),
        tag: el.tagName,
        id: el.id || '',
        role: el.getAttribute('role') || '',
        ariaLabel: el.getAttribute('aria-label') || '',
        x: Math.round(r.x * 100) / 100,
        y: Math.round((r.y + window.scrollY) * 100) / 100,
        width: Math.round(r.width * 100) / 100,
        height: Math.round(r.height * 100) / 100,
        color: css.color,
        backgroundColor: css.backgroundColor,
        backgroundImage: css.backgroundImage,
        borderTopColor: css.borderTopColor,
        borderRightColor: css.borderRightColor,
        borderBottomColor: css.borderBottomColor,
        borderLeftColor: css.borderLeftColor,
        borderTopWidth: css.borderTopWidth,
        borderRightWidth: css.borderRightWidth,
        borderBottomWidth: css.borderBottomWidth,
        borderLeftWidth: css.borderLeftWidth,
        borderRadius: css.borderRadius,
        boxShadow: css.boxShadow,
        outline: css.outline,
        outlineColor: css.outlineColor,
        outlineWidth: css.outlineWidth,
        outlineOffset: css.outlineOffset,
        opacity: css.opacity,
        transform: css.transform,
        filter: css.filter,
        cursor: css.cursor,
        disabled: 'disabled' in el ? Boolean(el.disabled) : false,
        ariaDisabled: el.getAttribute('aria-disabled'),
      };
    });
  };

  for (const id of interactiveIds) {
    const locator = page.locator(`[data-uiqa-id="${id}"]`);
    try {
      const defaultState = await getState(locator);

      await locator.hover({ timeout: 3000 });
      await page.waitForTimeout(50);
      const hoverState = await getState(locator);

      await locator.focus({ timeout: 3000 });
      await page.waitForTimeout(50);
      const focusState = await getState(locator);

      stateEvidence.push({
        qaId: id,
        default: defaultState,
        hover: hoverState,
        focus: focusState,
        disabled:
          defaultState.disabled || defaultState.ariaDisabled === 'true' ? defaultState : null,
      });

      // Reset between controls.
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
      await page.mouse.move(1, 1);
    } catch (error) {
      stateEvidence.push({ qaId: id, error: String(error) });
    }
  }

  evidence.states = stateEvidence;

  fs.writeFileSync(`output/${NAME}-enhanced.json`, JSON.stringify(evidence, null, 2), 'utf8');

  console.log(
    `Saved:
- screenshots/${NAME}-enhanced.png
- output/${NAME}-enhanced.json
- ${evidence.primary.length} primary elements
- ${evidence.containers.length} meaningful containers
- ${evidence.vectors.length} inline SVGs
- ${stateEvidence.length} interactive-state records`
  );

  await context.close();
});
}
