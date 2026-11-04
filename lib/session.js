// UI Fidelity QA framework: browser sessions.
//
// Opens the Figma SVG export and the live page in Chromium, injects in-page.js,
// measures the named elements of a page definition on either side, and reads
// interaction states (real mouse hover + DevTools-style forced pseudo-classes).

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const IN_PAGE = fs.readFileSync(path.join(__dirname, 'in-page.js'), 'utf8');

async function inject(page) {
  await page.evaluate(IN_PAGE);
}

// The Figma export rendered as-is: 1 SVG unit = 1 CSS px.
async function openDesign(browser, pageDef) {
  const context = await browser.newContext({ viewport: { width: pageDef.design.width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(pathToFileURL(pageDef.design.svg).href);
  await inject(page);
  return { context, page };
}

// The live page, settled: fonts loaded, lazy images loaded, every running animation
// finished, scrolled back to the top. Reduced motion (the default here) makes reveal
// animations end in their final position straight away; the state audit (D2) passes
// 'no-preference' so it sees the real transitions.
async function openLive(browser, pageDef, width, { height = 900, reducedMotion = 'reduce' } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion });
  const page = await context.newPage();
  await page.goto(pageDef.url, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => null);
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => null);
  await page.evaluate(() =>
    Promise.race([
      Promise.all(document.getAnimations().map((a) => a.finished.catch(() => null))),
      new Promise((r) => setTimeout(r, 3000)), // infinite animations never finish
    ])
  );
  await page.waitForTimeout(500);
  await inject(page);
  return { context, page };
}

// side: 'figma' or 'ui'. Returns { name: measurement | [measurements] | null }.
async function measure(page, elements, side) {
  const out = {};
  for (const [name, def] of Object.entries(elements)) {
    const sel = def[side];
    if (!sel) {
      out[name] = def.all ? [] : null;
      continue;
    }
    let items = [];
    try {
      items = await page.locator(sel).evaluateAll((els) => Promise.all(els.map((el) => window.__pa.measure(el))));
    } catch (error) {
      console.warn(`[${side}] ${name}: ${sel} -> ${String(error).split('\n')[0]}`);
    }
    out[name] = def.all ? items : items.length ? { ...items[0], count: items.length } : null;
  }
  return out;
}

// Header measured again after scrolling, to see if it turns fixed/sticky.
async function measureAfterScroll(page, selector, y) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(500);
  const m = await page.locator(selector).first().evaluate(async (el) => {
    await window.__pa.settle(el);
    return window.__pa.measure(el);
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  return m;
}

// ---------- interaction states (D2) ----------
const FORCED = [
  ['focus', ['focus']],
  ['focus-visible', ['focus', 'focus-visible']],
  ['active', ['active']],
];

async function stateSession(page) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  return cdp;
}

async function nodeIdOf(cdp, locator, mark) {
  await locator.evaluate((el, m) => el.setAttribute('data-pa-state', m), mark);
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector: `[data-pa-state="${mark}"]` });
  return nodeId;
}

// default, hover (real mouse), then :focus, :focus-visible and :active forced
// the same way the DevTools ":hov" panel does. Transitions are allowed to finish
// before each read, so the values are the end state, not a frame mid-animation.
async function captureStates(page, cdp, locator, mark) {
  const read = () =>
    locator.evaluate(async (el) => {
      await window.__pa.settle(el);
      return window.__pa.measure(el);
    });
  const states = { default: await read(), errors: [] };
  if (!states.default.visible) return states;

  try {
    await locator.hover({ timeout: 5000 });
    states.hover = await read();
  } catch (error) {
    states.errors.push(`hover: ${String(error).split('\n')[0]}`);
  }
  await page.mouse.move(0, 0);
  await read();

  try {
    const nodeId = await nodeIdOf(cdp, locator, mark);
    for (const [state, classes] of FORCED) {
      await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: classes });
      states[state] = await read();
      await cdp.send('CSS.forcePseudoState', { nodeId, forcedPseudoClasses: [] });
    }
  } catch (error) {
    states.errors.push(`forced states: ${String(error).split('\n')[0]}`);
  }
  await read();
  return states;
}

// States that cannot be forced: look for any element that could show them.
async function stateSupport(page) {
  return page.evaluate(() => {
    const count = (sel) => document.querySelectorAll(sel).length;
    return {
      disabled: count('[disabled], [aria-disabled="true"]'),
      loading: count('[aria-busy="true"], [role="progressbar"], .spinner, .loading'),
      error: count('[aria-invalid="true"], [role="alert"], .error'),
      selected: count('[aria-current], [aria-selected="true"], [aria-pressed="true"]'),
      inputs: count('input, select, textarea'),
      checkboxesRadios: count('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]'),
      tabs: count('[role="tab"], [role="tablist"]'),
      toggles: count('[role="switch"], [aria-expanded]'),
      dropdowns: count('select, [role="listbox"], [role="combobox"], [aria-haspopup]'),
      reducedMotionRule: [...document.styleSheets].some((s) => {
        try {
          return [...s.cssRules].some((r) => r.conditionText && /prefers-reduced-motion/.test(r.conditionText));
        } catch (e) {
          return false;
        }
      }),
    };
  });
}

module.exports = { openDesign, openLive, measure, measureAfterScroll, stateSession, captureStates, stateSupport, inject };
