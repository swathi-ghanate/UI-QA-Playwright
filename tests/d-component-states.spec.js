// UI Fidelity QA framework, audit D: component states.
//   D1  Figma component states -> default (and selected) styles of every interactive layer in the SVG export
//   D2  UI component states    -> default, real mouse hover, then :focus, :focus-visible and :active forced through
//                                 the Chrome DevTools Protocol (what the DevTools ":hov" panel does), at 1440
//   D3  Figma vs UI            -> checks.D (default + selected) plus the state lists the prompt asks for
// Outputs: reports/<page>/details/D1-figma-component-states.md, D2-ui-component-states.md, D3.md (+ .json)

const { test } = require('@playwright/test');
const PAGES = require('../pages');
const { openDesign, openLive, measure, stateSession, captureStates, stateSupport } = require('../lib/session');
const { runChecks, parseColor, colorText, parseShadows, shadowText, round, toNum } = require('../lib/rules');
const { table, bullets, header, save, comparisonMarkdown, saveComparison } = require('../lib/report');

const VIEWPORT = 1440;
const ALL_STATES = ['default', 'hover', 'focus', 'focus-visible', 'active', 'selected', 'disabled', 'loading', 'error', 'empty'];
const FORCED_STATES = ['hover', 'focus', 'focus-visible', 'active'];
const hex = (v) => colorText(parseColor(v));
const first = (m) => (Array.isArray(m) ? m[0] : m);

// How each state property is shown; a state "changes" a property when the shown value differs.
const STATE_VIEW = {
  background: (m) => hex(m.backgroundColor),
  'text color': (m) => hex(m.color),
  border: (m) => (parseFloat(m.borderTopWidth) ? `${m.borderTopWidth} ${m.borderTopStyle} ${hex(m.borderTopColor)}` : 'none'),
  'border-radius': (m) => m.borderTopLeftRadius,
  'box-shadow': (m) => shadowText(parseShadows(m.boxShadow)),
  outline: (m) => (m.outlineStyle === 'none' ? 'none' : `${m.outlineStyle} ${m.outlineWidth} ${hex(m.outlineColor)} (offset ${m.outlineOffset})`),
  opacity: (m) => m.opacity,
  transform: (m) => m.transform,
  filter: (m) => m.filter,
  'text-decoration': (m) => m.textDecorationLine,
  'font-weight': (m) => m.fontWeight,
  cursor: (m) => m.cursor,
  size: (m) => `${m.box.width}×${m.box.height}`,
};
const changes = (a, b) =>
  a && b ? Object.entries(STATE_VIEW).filter(([, f]) => f(a) !== f(b)).map(([k, f]) => `${k}: ${f(a)} → ${f(b)}`) : [];
// Chromium shortens a zero-length transition to "all", so the durations decide whether one exists.
const hasTransition = (t) => Boolean(t && String(t.duration).split(',').some((d) => parseFloat(d) > 0));
const transitionText = (t) =>
  !t ? 'Not verified' : hasTransition(t) ? t.value : t.value === 'none' ? 'none' : `none (${t.value}, duration 0s)`;
const transitionOf = (m) => m && { value: m.transition, duration: m.transitionDuration };

// ---------- WCAG contrast ----------
const luminance = ({ r, g, b }) => {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
function contrast(fgValue, bgValue) {
  const fg = parseColor(fgValue);
  const bg = parseColor(bgValue);
  if (!fg || !bg) return null;
  const mix = { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) };
  const [hi, lo] = [luminance(mix), luminance(bg)].sort((p, q) => q - p);
  return round((hi + 0.05) / (lo + 0.05), 2);
}
// WCAG "large text": 24px+, or 18.66px+ bold.
const isLarge = (size, weight) => toNum(size) >= 24 || (toNum(size) >= 18.66 && toNum(weight) >= 700);
const contrastRow = (pair, ratio, size, weight) =>
  ratio === null
    ? [pair, 'Not specified', '', '']
    : [pair, `${ratio}:1`, `${size} / ${weight}${isLarge(size, weight) ? ' (large)' : ''}`,
      ratio >= 4.5 ? 'Pass' : isLarge(size, weight) && ratio >= 3 ? 'Pass (large text only)' : 'Fail'];

// ---------------- D1 ----------------
function figmaDefaultRow(name, state, m) {
  if (!m) return [name, state, 'Not found', '', '', '', '', '', '', '', ''];
  if (m.tag === 'text') {
    return [name, state, 'none', hex(m.color), 'none', '—', 'none', round(parseColor(m.color).a, 3), 'Not specified', 'text only',
      `${m.fontSize} / ${m.fontWeight}${m.textDecorationLine !== 'none' ? `, ${m.textDecorationLine}` : ''}`];
  }
  return [name, state, hex(m.backgroundColor), m.label ? hex(m.label.color) : '—',
    m.borderWidth ? `${m.borderWidth}px ${hex(m.borderColor)}` : 'none', `${m.radius}`, m.shadow ? shadowText(parseShadows(m.shadow)) : 'none',
    m.opacity, 'Not specified', `${m.box.width}×${m.box.height}`, m.label ? `${m.label.fontSize} / ${m.label.fontWeight}` : '—'];
}

function figmaStates(pageDef, inv, d) {
  const comps = pageDef.components.filter((c) => pageDef.elements[c.element].figma);
  const designed = comps.length + (d.navCurrent ? 1 : 0);
  return [
    header('D1', 'Figma component states', pageDef),
    bullets([
      'Only the default state is drawn, plus the bold current-page nav link (a selected state). Every other state is **State not designed**.',
      `Layer names describing states: ${inv.file.stateLayerNames.length ? inv.file.stateLayerNames.join(', ') : 'none'}.`,
      'Cursor is **Not specified** everywhere: an SVG export carries no cursor.',
    ]),
    '## D1.1 Interactive components on this screen',
    '',
    table(['Component', 'Count', 'Figma layers'], pageDef.components.map((c) => {
      const v = d[c.element];
      const count = Array.isArray(v) ? v.length : v ? 1 : 0;
      return [c.name, count || 'not in the design', pageDef.elements[c.element].figma || '—'];
    })),
    'Inputs, dropdowns, checkboxes, radio buttons, tabs and toggles: none on this screen, so all their states are State not designed.',
    '',
    '## D1.2 Designed states',
    '',
    table(['Component', 'State', 'Background', 'Text colour', 'Border', 'Radius', 'Shadow', 'Opacity', 'Cursor', 'Size', 'Font'], [
      ...comps.map((c) => figmaDefaultRow(c.name, 'Default', first(d[c.element]))),
      ...(d.navCurrent ? [figmaDefaultRow('Nav link (current page)', 'Selected', d.navCurrent)] : []),
    ]),
    '## D1.3 States not designed',
    '',
    table(['Component', 'States'], comps.map((c) => [c.name, `${ALL_STATES.filter((s) => s !== 'default' && !(c.element === 'navLinks' && s === 'selected')).join(', ')}: State not designed`])),
    '## D1.4 State coverage',
    '',
    `${comps.length} components × ${ALL_STATES.length} states = ${comps.length * ALL_STATES.length} state cells, of which **${designed} are designed** ` +
      `(${comps.length} default + ${designed - comps.length} selected). No component has a focus style, so keyboard focus styling is not designed.\n`,
    '## D1.5 Contrast of the designed states',
    '',
    table(['Pair', 'Ratio', 'Text size / weight', 'WCAG AA'], [
      contrastRow('Primary button: label on fill', contrast(d.navButton.label.color, d.navButton.backgroundColor), d.navButton.label.fontSize, d.navButton.label.fontWeight),
      contrastRow('Secondary button (hero): label on fill', contrast(d.heroButton.label.color, d.heroButton.backgroundColor), d.heroButton.label.fontSize, d.heroButton.label.fontWeight),
      contrastRow('Secondary button (CTA): label on fill', contrast(d.ctaButton.label.color, d.ctaButton.backgroundColor), d.ctaButton.label.fontSize, d.ctaButton.label.fontWeight),
      contrastRow('Footer link on footer background', contrast(d.footerPlainLink.color, d.footer.backgroundColor), d.footerPlainLink.fontSize, d.footerPlainLink.fontWeight),
      ['Nav links on the translucent pill over the hero photo', 'Not specified (varies with the image)', '', ''],
    ]),
  ].join('\n');
}

// ---------------- D2 ----------------
function stateTable(states) {
  const present = ['default', ...FORCED_STATES].filter((s) => states[s]);
  return table(['Property', ...present], Object.entries(STATE_VIEW).map(([k, f]) => [k, ...present.map((s) => f(states[s]))]));
}

function uiStates(pageDef, captured, support) {
  const sections = captured.map(({ comp, items, width, reducedTransition }) => {
    const s = items[0];
    if (!s) return `## ${comp.name}\n\nNot verified: not found (${pageDef.elements[comp.element].ui}).\n`;
    if (!s.default.visible) {
      return `## ${comp.name} (${width}px)\n\nHidden at ${width}px (display ${s.default.display}), so its states were Not verified at this width.\n`;
    }
    const signature = (st) => FORCED_STATES.map((k) => changes(st.default, st[k]).map((c) => c.split(':')[0]).join(',')).join('|');
    const same = items.filter((st) => st.hover && signature(st) === signature(s)).length;
    return [
      `## ${comp.name} (${items.length} item${items.length > 1 ? 's' : ''}, ${width}px; table shows "${s.default.text || s.default.tag}")`,
      '',
      stateTable(s),
      ...FORCED_STATES.map((k) => `- **${k}:** ${changes(s.default, s[k]).join('; ') || 'no visible change'}`),
      `- **Transition:** ${transitionText(transitionOf(s.default))}`,
      `- **Transition with prefers-reduced-motion: reduce:** ${transitionText(reducedTransition)}`,
      `- **All items change the same properties:** ${same === items.length ? 'yes' : `no (${same} of ${items.length})`}`,
      ...items.flatMap((st, i) => (st.errors || []).map((e) => `- **Not verified (item ${i + 1}):** ${e}`)),
      '',
    ].join('\n');
  });
  const nv = (n, what) => (n ? `${n} found` : `Not verified (no ${what} on the page)`);
  return [
    header('D2', 'UI component states (live UI)', pageDef, [`**Viewport:** ${VIEWPORT}px (mobile menu toggle at the width given per component)`]),
    'Method: page loaded with normal motion; default read first; **hover** with the real mouse (so parent :hover rules apply too); ' +
      '**focus**, **focus-visible** and **active** forced on the element with CSS.forcePseudoState, as the DevTools ":hov" panel does. ' +
      'Transitions are allowed to finish before every read, so values are end states.',
    '',
    ...sections,
    '## States that cannot be forced',
    '',
    table(['State', 'Result'], [
      ['Selected / current', nv(support.selected, 'aria-current / aria-selected / aria-pressed elements')],
      ['Disabled', nv(support.disabled, 'disabled or aria-disabled elements')],
      ['Loading', nv(support.loading, 'aria-busy, progressbar or spinner elements')],
      ['Error', nv(support.error, 'aria-invalid or alert elements')],
      ['Empty', nv(support.inputs, 'inputs, so no empty state')],
      ['Inputs, dropdowns, checkboxes/radios, tabs, toggles', `${support.inputs} inputs, ${support.dropdowns} dropdowns, ${support.checkboxesRadios} checkboxes/radios, ${support.tabs} tabs, ${support.toggles} toggles (aria-expanded/switch)`],
    ]),
    '## General notes',
    '',
    bullets([
      `prefers-reduced-motion rule in the stylesheets: ${support.reducedMotionRule ? 'yes' : 'no'}.`,
      'Cursor, transition and box-shadow values for every component are in the tables above.',
    ]),
  ].join('\n');
}

for (const pageDef of PAGES) {
  test(`${pageDef.name} - D: component states (D1, D2, D3)`, async ({ browser }, testInfo) => {
    test.skip(!pageDef.checks, `${pageDef.name}: no element map or checks yet, so only audit E (text) runs. See README.md, "Add a page".`);
    test.setTimeout(8 * 60 * 1000);

    const d = await test.step('D1 Figma component states (SVG export)', async () => {
      const { context, page } = await openDesign(browser, pageDef);
      const measured = await measure(page, pageDef.elements, 'figma');
      const inv = await page.evaluate(() => window.__pa.figmaInventory());
      await context.close();
      await save(testInfo, pageDef, 'D1-figma-component-states.md', figmaStates(pageDef, inv, measured));
      await save(testInfo, pageDef, 'D1-figma-component-states.json', { stateLayerNames: inv.file.stateLayerNames, measured });
      return measured;
    });

    const { u, captured } = await test.step('D2 UI component states (live page)', async () => {
      const widths = [...new Set(pageDef.components.map((c) => c.viewport || VIEWPORT))];
      const captured = [];
      let measured = null;
      let support = null;
      for (const width of widths) {
        // Normal motion, so the real transitions are read (each read waits for them to finish).
        const { context, page } = await openLive(browser, pageDef, width, { reducedMotion: 'no-preference' });
        if (width === VIEWPORT) {
          measured = await measure(page, pageDef.elements, 'ui');
          support = await stateSupport(page);
        }
        const cdp = await stateSession(page);
        for (const comp of pageDef.components.filter((c) => (c.viewport || VIEWPORT) === width)) {
          const loc = page.locator(pageDef.elements[comp.element].ui);
          const n = await loc.count();
          const items = [];
          for (let i = 0; i < n; i++) items.push(await captureStates(page, cdp, loc.nth(i), `${comp.element}-${i}`));
          // Same element with prefers-reduced-motion: reduce, to see if the transition is switched off.
          await page.emulateMedia({ reducedMotion: 'reduce' });
          const reducedTransition = n
            ? await loc.first().evaluate((e) => ({ value: getComputedStyle(e).transition, duration: getComputedStyle(e).transitionDuration }))
            : null;
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          captured.push({ comp, items, width, reducedTransition });
        }
        await context.close();
      }
      await save(testInfo, pageDef, 'D2-ui-component-states.md', uiStates(pageDef, captured, support));
      await save(testInfo, pageDef, 'D2-ui-component-states.json', { support, captured });
      return { u: measured, captured };
    });

    await test.step('D3 Figma vs UI (component states)', async () => {
      const results = runChecks('D', pageDef.checks.D, d, u, pageDef.elements);

      // States Figma designs (default per component + selected nav link) and whether the UI has them.
      const other = (u.navLinks || []).find((l) => u.navCurrent && l.text !== u.navCurrent.text);
      const designedRows = [
        ...pageDef.components.filter((c) => d[c.element] && (!Array.isArray(d[c.element]) || d[c.element].length))
          .map((c) => [c.name, 'Default', first(u[c.element]) ? 'present' : 'MISSING (not found in the UI)']),
        ...(d.navCurrent ? [['Nav link (current page)', 'Selected (bold)', u.navCurrent && other && u.navCurrent.fontWeight !== other.fontWeight
          ? `present (font-weight ${u.navCurrent.fontWeight} vs ${other.fontWeight}${u.navCurrent.ariaCurrent ? `, aria-current="${u.navCurrent.ariaCurrent}"` : ', no aria-current'})`
          : 'MISSING (current link not styled differently)']] : []),
      ];
      // States the UI has that Figma does not design.
      const extraRows = [];
      for (const { comp, items, width } of captured) {
        const s = items[0];
        if (!s) continue;
        if (!d[comp.element] || (Array.isArray(d[comp.element]) && !d[comp.element].length)) {
          extraRows.push([comp.name, `Component (${width}px)`, `Not in the design at all; ${s.default.visible ? 'visible' : `hidden at ${width}px`}`]);
        }
        for (const k of FORCED_STATES) {
          const c = changes(s.default, s[k]);
          if (c.length) extraRows.push([comp.name, k, c.join('; ')]);
        }
        if (hasTransition(transitionOf(s.default))) extraRows.push([comp.name, 'Transition', s.default.transition]);
        if (s.default && s.default.cursor === 'pointer') extraRows.push([comp.name, 'Cursor', 'pointer (Figma: Not specified)']);
      }
      const focusRows = captured.filter(({ items }) => items[0] && items[0]['focus-visible']).map(({ comp, items }) => {
        const c = changes(items[0].default, items[0]['focus-visible']).filter((x) => /^(outline|box-shadow|border|background)/.test(x));
        return [comp.name, c.length ? `yes: ${c.join('; ')}` : 'NO visible focus indicator'];
      });
      const motionRows = captured.filter(({ items }) => items[0]).map(({ comp, items, reducedTransition }) => {
        const normal = transitionOf(items[0].default);
        return [comp.name, transitionText(normal), transitionText(reducedTransition),
          !hasTransition(normal) ? 'no transition to reduce' : hasTransition(reducedTransition) ? 'NO' : 'yes'];
      });
      const uiContrast = (label, m, bg) => contrastRow(label, contrast(m.color, bg), m.fontSize, m.fontWeight);
      const sections = [
        '## States designed in Figma but missing in the UI',
        '',
        table(['Component', 'Figma state', 'In the UI'], designedRows),
        '## States in the UI that are not in the design',
        '',
        table(['Component', 'UI state', 'What changes'], extraRows),
        '## Accessibility notes',
        '',
        table(['Component', 'Visible keyboard focus (:focus-visible)'], focusRows),
        table(['Component', 'Transition', 'With prefers-reduced-motion: reduce', 'Respects reduced motion'], motionRows),
        table(['Pair (UI)', 'Ratio', 'Text size / weight', 'WCAG AA'], [
          uiContrast('Primary button: label on fill', u.navButton, u.navButton.backgroundColor),
          uiContrast('Secondary button (hero): label on fill', u.heroButton, u.heroButton.backgroundColor),
          uiContrast('Secondary button (CTA): label on fill', u.ctaButton, u.ctaButton.backgroundColor),
          uiContrast('Footer link on footer background', u.footerPlainLink, u.footerPlainLink.effectiveBackground.color),
        ]),
      ];
      const md = comparisonMarkdown({
        code: 'D3',
        title: 'Figma vs implemented UI (component states)',
        pageDef,
        audit: 'D',
        results,
        headerLines: [`**Viewport:** ${VIEWPORT}px`],
        intro: 'Figma designs the default state of each component and a selected (bold) current-page nav link. Hover, focus, active, disabled, loading, error and empty are not designed, so they cannot be scored; they are listed below as UI states that are not in the design.\n',
        sections,
        devtools: [
          'Tab through the page and confirm the focus indicator on every link and button (forced :focus-visible values are in D2).',
          'Hover each card and button: D2 records the transform/filter/box-shadow end values of the transitions.',
          'Below 1280px, check the mobile menu toggle states (open/closed, aria-expanded).',
          'Check whether transitions respect prefers-reduced-motion.',
        ],
      });
      await saveComparison(testInfo, pageDef, 'D3', 'Figma vs implemented UI (component states)', results, md);
    });
  });
}
