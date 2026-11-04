// UI Fidelity QA framework, audit A: style guide.
//   A1  Figma style guide  -> measured from the Figma SVG export in Chromium
//   A2  UI style guide     -> computed CSS of the live page at 1440
//   A3  Figma vs UI        -> checks.A in pages/<page>.checks.js, scored
// Outputs: reports/<page>/details/A1-figma-style-guide.md, A2-ui-style-guide.md, A3.md (+ .json)

const { test } = require('@playwright/test');
const PAGES = require('../pages');
const { openDesign, openLive, measure } = require('../lib/session');
const { runChecks, parseColor, colorText, colorDistance } = require('../lib/rules');
const { table, bullets, header, save, comparisonMarkdown, saveComparison } = require('../lib/report');

const VIEWPORT = 1440;
// Two opaque colours closer than this RGB distance are listed as near-duplicates.
const NEAR = 40;

const hex = (v) => colorText(parseColor(v));
const first = (m) => (Array.isArray(m) ? m[0] : m);
const textOf = (m) => (m && m.label ? m.label : m); // Figma groups carry their text as .label
const px = (v) => (v === null || v === undefined ? '—' : `${parseFloat(v)}px`);

// Opaque colours used for the same role (text, fill, border...) that are close but not equal.
function nearDuplicates(entries) {
  const pairs = [];
  for (const role of new Set(entries.map((e) => e.role))) {
    const opaque = [...new Set(entries.filter((e) => e.role === role).map((e) => hex(e.value)))]
      .filter((h) => /^#[0-9A-F]{6}$/.test(h))
      .map((h) => ({ h, c: parseColor(h) }));
    for (let i = 0; i < opaque.length; i++) {
      for (let j = i + 1; j < opaque.length; j++) {
        const dist = colorDistance(opaque[i].c, opaque[j].c);
        if (dist > 0 && dist <= NEAR) pairs.push(`${role}: ${opaque[i].h} and ${opaque[j].h} (RGB distance ${Math.round(dist)}; check it is intentional)`);
      }
    }
  }
  return pairs;
}

function typographyRow(role, m) {
  if (!m) return [role, 'Not found', '', '', '', '', '', ''];
  const t = textOf(m);
  return [
    role,
    (t.fontFamily || '').split(',')[0].replace(/"/g, ''),
    px(t.fontSize),
    t.fontWeight,
    t.lineHeight || (t.linePitch ? `${t.linePitch}px (pitch)` : 'single line'),
    t.letterSpacing,
    t.textTransform || 'none',
    hex(t.color),
  ];
}

// ---------------- A1 ----------------
function figmaStyleGuide(pageDef, inv, d, spacing) {
  const f = inv.file;
  const strokeWidths = inv.strokes.map((s) => s.width);
  const stretched = inv.images.filter((i) => Math.abs(i.renderedWidth / i.sourceWidth - i.renderedHeight / i.sourceHeight) > 0.002);
  const icon = (name, label, m) =>
    m
      ? [label, m.borderColor !== 'transparent' && m.backgroundColor === 'transparent' ? 'outline' : 'filled',
        m.borderWidth ? `${m.borderWidth}px` : 'none', hex(m.borderColor !== 'transparent' ? m.borderColor : m.backgroundColor),
        `${m.box.width}×${m.box.height}`]
      : [label, 'Not found', '', '', ''];
  const comp = (label, m) =>
    m
      ? [label, hex(m.backgroundColor), m.label ? hex(m.label.color) : '—',
        m.borderWidth ? `${m.borderWidth}px ${hex(m.borderColor)}` : 'none', `${m.radius}`, `${m.box.width}×${m.box.height}`,
        m.label ? `${px(m.label.fontSize)} / ${m.label.fontWeight}` : '—']
      : [label, 'Not found', '', '', '', '', ''];

  return [
    header('A1', 'Figma style guide', pageDef, [`**Frame:** ${f.width} × ${f.height}`]),
    '## A1.0 What the file contains',
    '',
    bullets([
      f.liveTextElements
        ? `**Text:** ${f.liveTextElements} live text layers, so font family, size, weight, line pitch and letter-spacing are read from the file.`
        : '**Text:** no live text (outlined). Typography is Not specified; re-export with "Outline text" off.',
      `**Images:** ${f.images} embedded. **Filters:** ${f.filters}. **Gradients:** ${f.gradients}. **Paths:** ${f.paths}.`,
      f.stateLayerNames.length
        ? `**State layers:** ${f.stateLayerNames.join(', ')}`
        : '**States:** no layer names describe hover, focus, pressed, disabled, error or loading states, so only the default state is drawn.',
      '**Tokens:** an SVG export carries no Figma variable names. Token names are Not specified.',
      `**Sections (background layers):** ${pageDef.sections.filter(([, n]) => d[n]).map(([label, n]) => `${label} (y ${d[n].box.y}–${d[n].box.bottom})`).join('; ')}`,
    ]),
    '## A1.1 Colours',
    '',
    table(['Colour', 'Role', 'Count', 'Used on'], inv.colors.map((c) => [hex(c.color), c.role, c.count, c.usedOn.join('; ')])),
    'Error, success, warning and disabled colours: Not specified (no such layers).',
    '',
    '## A1.2 Typography',
    '',
    '### By role',
    '',
    table(['Role', 'Family', 'Size', 'Weight', 'Line pitch', 'Letter-spacing', 'Transform', 'Colour'],
      pageDef.textRoles.map(([role, name]) => typographyRow(role, first(d[name])))),
    '### All text styles in the file',
    '',
    table(['Family', 'Size', 'Weight', 'Letter-spacing', 'Decoration', 'Colours', 'Line pitch', 'Count', 'Used on'],
      inv.textStyles.map((t) => [t.fontFamily, t.fontSize, t.fontWeight, t.letterSpacing, t.textDecorationLine,
        t.colors.map(hex).join(', '), t.linePitches.join(', ') || 'single line', t.count, t.usedOn.join('; ')])),
    '## A1.3 Spacing',
    '',
    'No spacing scale is declared in the file. Values measured between layers:',
    '',
    table(['Item', 'Value'], spacing.map((r) => [`${r.element} — ${r.property}`, r.figmaText])),
    '## A1.4 Borders, radius, shadows, effects',
    '',
    table(['Corner radius', 'Count', 'Used on'], inv.radii.map((r) => [`${r.radius}${r.full ? ' (fully rounded)' : ''}`, r.count, r.usedOn.join('; ')])),
    table(['Stroke width', 'Count', 'Used on'], inv.strokes.map((s) => [s.width, s.count, s.usedOn.join('; ')])),
    table(['Effect', 'Value', 'Count', 'Used on'], inv.effects.map((e) => [e.type, typeof e.value === 'object'
      ? `x ${e.value.x}, y ${e.value.y}, blur ${e.value.blur}, spread ${e.value.spread}, ${hex(e.value.color)}`
      : e.value, e.count, e.usedOn.join('; ')])),
    table(['Gradient', 'Angle', 'Stops', 'Used on'], inv.gradients.map((g) => [g.id, `${g.angle}deg`,
      g.stops.map((s) => `${hex(s.color)} ${Math.round(s.offset * 100)}%`).join(', '), g.usedOn.join('; ')])),
    '## A1.5 Icons',
    '',
    table(['Icon', 'Style', 'Stroke', 'Colour', 'Glyph / frame size'],
      pageDef.report.icons.map(([name, label]) => icon(name, label, first(d[name])))),
    '## A1.6 Components (default state only)',
    '',
    table(['Component', 'Background', 'Text', 'Border', 'Radius', 'Size', 'Label font'],
      pageDef.report.figmaComponents.map(([label, name]) => comp(label, first(d[name])))),
    'Inputs, dropdowns, checkboxes, tabs, toggles: none in the file. Hover, focus, pressed, disabled: Not specified.',
    '',
    '## A1.7 Inconsistencies inside the Figma design',
    '',
    bullets([
      ...nearDuplicates(inv.colors.map((c) => ({ role: c.role, value: c.color }))).map((p) => `Near-duplicate colours, ${p}.`),
      `${inv.radii.length} different corner radii: ${inv.radii.map((r) => `${r.radius}${r.full ? ' (full)' : ''}`).join(', ')}.`,
      `${strokeWidths.length} different stroke widths: ${strokeWidths.join(', ')}.`,
      `${inv.textStyles.length} text styles for ${f.liveTextElements} text layers.`,
      ...stretched.map((i) => `Image "${i.src}" in ${i.usedOn} is scaled non-uniformly (${i.renderedWidth}×${i.renderedHeight} from ${i.sourceWidth}×${i.sourceHeight}), so it is stretched.`),
    ]),
  ].join('\n');
}

// ---------------- A2 ----------------
function uiStyleGuide(pageDef, inv, u) {
  // Merge colours that are the same once normalised (rgb() and oklab() spell the same colour differently).
  const palette = new Map();
  for (const c of inv.colors) {
    const key = `${c.role}|${hex(c.value)}`;
    if (!palette.has(key)) palette.set(key, { role: c.role, hex: hex(c.value), raw: c.value, count: 0, examples: [] });
    const p = palette.get(key);
    p.count += c.count;
    for (const e of c.examples) if (p.examples.length < 3) p.examples.push(e);
  }
  const colorTokens = inv.tokens.customProperties.filter((t) => parseColor(t.value));
  const tokensFor = (h) => colorTokens.filter((t) => hex(t.value) === h).map((t) => t.name).slice(0, 3).join(', ');
  const headingWeights = ['H1', 'H2', 'H3'].map((tag) => [tag, [...new Set(inv.typography.filter((t) => t.tags.includes(tag)).map((t) => t.fontWeight))]]);
  const comp = (label, m) =>
    m
      ? [label, hex(m.backgroundColor), hex(m.color), `${m.borderTopWidth} ${m.borderTopStyle} ${hex(m.borderTopColor)}`,
        m.borderTopLeftRadius, m.boxShadow === 'none' ? 'none' : 'yes (see A2.4)',
        `${m.paddingTop} ${m.paddingRight} ${m.paddingBottom} ${m.paddingLeft}`, `${m.fontSize} / ${m.fontWeight}`, m.cursor, m.transition]
      : [label, 'Not found', '', '', '', '', '', '', '', ''];

  return [
    header('A2', 'UI style guide (live UI)', pageDef, [`**Viewport:** ${inv.page.viewport.width} × ${inv.page.viewport.height}`, `**Font family (body):** ${u.footer ? u.footer.fontFamily : 'Not verified'}`]),
    'All values are computed CSS read with getComputedStyle (no visual estimates). Colours are shown as hex, with alpha after "@".',
    '',
    '## A2.1 Colour palette',
    '',
    table(['Role', 'Colour', 'Computed value', 'Count', 'CSS variable with this value', 'Examples'],
      [...palette.values()].sort((a, b) => a.role.localeCompare(b.role) || b.count - a.count)
        .map((p) => [p.role, p.hex, p.raw, p.count, tokensFor(p.hex) || 'none (hard-coded)', p.examples.join('; ')])),
    'Error / success / warning colours: Not verified (no status messages in the DOM).',
    '',
    '## A2.2 Typography',
    '',
    '### By role',
    '',
    table(['Role', 'Family', 'Size', 'Weight', 'Line-height', 'Letter-spacing', 'Transform', 'Colour'],
      pageDef.textRoles.map(([role, name]) => typographyRow(role, first(u[name])))),
    '### Every text style on the page',
    '',
    table(['Family', 'Size', 'Weight', 'Line-height', 'Letter-spacing', 'Transform', 'Tags', 'Count'],
      inv.typography.map((t) => [t.fontFamily.split(',')[0], t.fontSize, t.fontWeight, t.lineHeight, t.letterSpacing, t.textTransform, t.tags.join(' '), t.count])),
    '## A2.3 Layout and spacing (key containers)',
    '',
    table(['Element', 'Display', 'Padding (t r b l)', 'Gap', 'Margin (t r b l)', 'Max-width'],
      pageDef.containers.map((name) => {
        const m = u[name];
        return m
          ? [name, m.display, `${m.paddingTop} ${m.paddingRight} ${m.paddingBottom} ${m.paddingLeft}`, m.gap,
            `${m.marginTop} ${m.marginRight} ${m.marginBottom} ${m.marginLeft}`, m.maxWidth]
          : [name, 'Not found', '', '', '', ''];
      })),
    '## A2.4 Borders, radius, shadows',
    '',
    table(['Border-radius', 'Count', 'Examples'], inv.radii.map((r) => [r.value, r.count, r.examples.join('; ')])),
    table(['Box-shadow (visible layers)', 'Count', 'Examples'], inv.shadows.map((s) => [s.value, s.count, s.examples.join('; ')])),
    '## A2.5 Icons',
    '',
    table(['Type', 'Size', 'Colour', 'Fill', 'Stroke', 'Stroke width', 'Background', 'Source', 'Where'],
      inv.icons.map((i) => [i.type, `${i.width}×${i.height}`, hex(i.color), i.fill, i.stroke, i.strokeWidth, i.background ? hex(i.background) : '', i.src, i.where])),
    '## A2.6 Base components (default state; hover, focus and active are in D2)',
    '',
    table(['Component', 'Background', 'Text', 'Border', 'Radius', 'Shadow', 'Padding', 'Font', 'Cursor', 'Transition'],
      pageDef.report.uiComponents.map(([label, name]) => comp(label, first(u[name])))),
    'Inputs: Not verified (none on the page).',
    '',
    '## A2.7 Tokens vs hard-coded values',
    '',
    bullets([
      `${inv.tokens.customProperties.length} CSS custom properties are defined (${colorTokens.length} of them colours).`,
      `${inv.tokens.arbitraryClasses.length} distinct arbitrary-value classes (hard-coded values such as \`bg-[#1B6AAA]\`) are used ${inv.tokens.arbitraryClasses.reduce((n, a) => n + a.count, 0)} times.`,
      `Most used hard-coded classes: ${inv.tokens.arbitraryClasses.slice(0, 20).map((a) => `\`${a.name}\` ×${a.count}`).join(', ')}`,
      inv.tokens.blockedStylesheets.length ? `Stylesheets that could not be read (cross-origin): ${inv.tokens.blockedStylesheets.join(', ')}` : 'All stylesheets were readable.',
    ]),
    '## A2.8 Inconsistencies on the live page',
    '',
    bullets([
      ...nearDuplicates([...palette.values()].map((p) => ({ role: p.role, value: p.hex }))).map((p) => `Near-duplicate colours, ${p}.`),
      `${inv.radii.length} different border radii: ${inv.radii.map((r) => r.value).join(', ')}.`,
      ...headingWeights.map(([tag, w]) => `${tag} font weights: ${w.join(', ') || 'none'}${w.length > 1 ? ' (inconsistent)' : ''}.`),
      `${new Set(inv.typography.map((t) => t.fontSize)).size} different font sizes in ${inv.typography.length} text styles.`,
    ]),
  ].join('\n');
}

for (const pageDef of PAGES) {
  test(`${pageDef.name} - A: style guide (A1, A2, A3)`, async ({ browser }, testInfo) => {
    test.skip(!pageDef.checks, `${pageDef.name}: no element map or checks yet, so only audit E (text) runs. See README.md, "Add a page".`);
    test.setTimeout(5 * 60 * 1000);

    const d = await test.step('A1 Figma style guide (SVG export)', async () => {
      const { context, page } = await openDesign(browser, pageDef);
      const measured = await measure(page, pageDef.elements, 'figma');
      const inv = await page.evaluate(() => window.__pa.figmaInventory());
      await context.close();
      const spacing = runChecks('A', pageDef.checks.A.filter((c) => c.cat === 'Spacing'), measured, {}, pageDef.elements);
      await save(testInfo, pageDef, 'A1-figma-style-guide.md', figmaStyleGuide(pageDef, inv, measured, spacing));
      await save(testInfo, pageDef, 'A1-figma-style-guide.json', { inventory: inv, measured });
      return measured;
    });

    const u = await test.step('A2 UI style guide (live page)', async () => {
      const { context, page } = await openLive(browser, pageDef, VIEWPORT);
      const measured = await measure(page, pageDef.elements, 'ui');
      const inv = await page.evaluate(() => window.__pa.uiInventory());
      await context.close();
      await save(testInfo, pageDef, 'A2-ui-style-guide.md', uiStyleGuide(pageDef, inv, measured));
      await save(testInfo, pageDef, 'A2-ui-style-guide.json', { inventory: inv, measured });
      return measured;
    });

    await test.step('A3 Figma vs UI (style)', async () => {
      const results = runChecks('A', pageDef.checks.A, d, u, pageDef.elements);
      const md = comparisonMarkdown({
        code: 'A3',
        title: 'Figma vs implemented UI (style)',
        pageDef,
        audit: 'A',
        results,
        headerLines: [`**Viewport:** ${VIEWPORT}px (the Figma frame width)`],
        devtools: [
          'Hover, focus, active and disabled styles on buttons and links (see D2 for the forced-state values).',
          'Icons drawn as <img>: open the image files to confirm stroke colour and width against Figma.',
        ],
      });
      await saveComparison(testInfo, pageDef, 'A3', 'Figma vs implemented UI (style)', results, md);
    });
  });
}
