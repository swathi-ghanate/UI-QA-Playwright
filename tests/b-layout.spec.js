// UI Fidelity QA framework, audit B: layout and alignment.
//   B1  Figma layout analysis -> layer positions read from the Figma SVG export
//   B2  UI layout analysis    -> computed layout of the live page at 1440
//   B3  Figma vs UI           -> checks.B in pages/<page>.checks.js, scored
// Outputs: reports/<page>/details/B1-figma-layout.md, B2-ui-layout.md, B3.md (+ .json)

const { test } = require('@playwright/test');
const PAGES = require('../pages');
const { openDesign, openLive, measure } = require('../lib/session');
const { runChecks, parseColor, colorText } = require('../lib/rules');
const { table, bullets, numbered, header, save, comparisonMarkdown, saveComparison } = require('../lib/report');

const VIEWPORT = 1440;
const hex = (v) => colorText(parseColor(v));
const first = (m) => (Array.isArray(m) ? m[0] : m);
const pad = (m) => `${m.paddingTop} ${m.paddingRight} ${m.paddingBottom} ${m.paddingLeft}`;

// Every named element with a box, top to bottom (lists show their first item and a count).
function boxRows(pageDef, snap) {
  return Object.keys(pageDef.elements)
    .map((name) => {
      const list = snap[name];
      const m = first(list);
      if (!m || !m.box) return null;
      return { name, m, count: Array.isArray(list) ? list.length : 1 };
    })
    .filter(Boolean)
    .sort((p, q) => p.m.box.y - q.m.box.y || p.m.box.x - q.m.box.x);
}

// ---------------- B1 ----------------
function figmaLayout(pageDef, inv, d, figmaSide) {
  const [box] = pageDef.report.contentContainer;
  return [
    header('B1', 'Figma layout analysis', pageDef, [`**Frame:** ${inv.file.width} × ${inv.file.height}`]),
    'All positions are px on the 1440 artboard. Text positions use the baselines and start x stored in the file (tspan x/y), not rendered glyph extents.',
    '',
    '## B1.0 Page-level layout',
    '',
    bullets([
      `**Page width:** ${inv.file.width}. **Total height:** ${inv.file.height}.`,
      d[box] ? `**Content container:** x ${d[box].box.x} to x ${d[box].box.right}, so ${d[box].box.width} wide.` : '**Content container:** Not specified.',
      '**Max-width and breakpoints:** Not specified (one 1440 frame only).',
      '**Grid:** no layout grid is stored in an SVG export. Per-section structures are measured below.',
      '**Sidebar:** none.',
      '**Header height and fixed/sticky behaviour:** Not specified.',
      '**Padding inside containers:** Not specified as values (no auto-layout in the export); the distances in B1.2 are measured between layers.',
    ]),
    table(['Section', 'y range', 'Height', 'Background'], pageDef.sections.map(([label, name]) => {
      const m = d[name];
      if (!m) return [label, 'Not found', '', ''];
      const bg = m.backgroundImage ? (m.backgroundImage.type === 'image' ? `image ${m.backgroundImage.src}` : 'gradient') : hex(m.backgroundColor);
      return [label, `${m.box.y}–${m.box.bottom}`, m.box.height, bg];
    })),
    '## B1.1 Element boxes, top to bottom',
    '',
    table(['Element', 'Layer', 'x', 'y', 'Width', 'Height', 'Right', 'Bottom', 'Count'],
      boxRows(pageDef, d).map(({ name, m, count }) => [name, pageDef.elements[name].figma, m.box.x, m.box.y, m.box.width, m.box.height, m.box.right, m.box.bottom, count])),
    '## B1.2 Spacing, padding and alignment',
    '',
    'The Figma side of every layout check (offsets inside a section are measured from that section\'s top):',
    '',
    table(['Element', 'Value'], figmaSide.map((r) => [`${r.element} — ${r.property}`, r.figmaText])),
    '## B1.3 Order and hierarchy (top to bottom)',
    '',
    numbered(pageDef.sections.filter(([, n]) => d[n]).map(([label, n]) => {
      const inside = boxRows(pageDef, d).filter(({ name, m }) => name !== n && m.box.y >= d[n].box.y && m.box.y < d[n].box.bottom).map(({ name }) => name);
      return `**${label}** (${pageDef.elements[n].figma}, y ${d[n].box.y}–${d[n].box.bottom}): ${inside.join(', ')}`;
    })),
  ].join('\n');
}

// ---------------- B2 ----------------
function uiLayout(pageDef, inv, u) {
  const named = [...pageDef.containers, ...pageDef.report.boxed];
  const maxWidths = [...new Set(inv.containers.map((c) => c.maxWidth).filter((v) => v !== 'none'))];
  const [box, boxLabel] = pageDef.report.contentContainer;
  return [
    header('B2', 'UI layout analysis (live UI)', pageDef, [`**Viewport:** ${inv.page.viewport.width} × ${inv.page.viewport.height}`]),
    'All values are computed CSS and getBoundingClientRect() boxes in page coordinates.',
    '',
    '## B2.1 Global page layout',
    '',
    bullets([
      `**Viewport width:** ${inv.page.viewport.width}px (client width ${inv.page.clientWidth}px). **Document:** ${inv.page.document.width} × ${inv.page.document.height}.`,
      `**Body max-width:** ${inv.page.bodyMaxWidth}. **Root font size:** ${inv.page.rootFontSize}.`,
      u[box] ? `**Content container (${boxLabel}):** x ${u[box].box.x}, width ${u[box].box.width}.` : '**Content container:** Not verified.',
      `**Max-width values used by containers:** ${maxWidths.join(', ') || 'none'}.`,
      `**Sidebar:** ${inv.blocks.some((b) => /aside/.test(b.el)) ? 'present' : 'none'}.`,
    ]),
    '## B2.2 Sections, top to bottom',
    '',
    table(['Element', 'x, y', 'Width × height', 'Display', 'Position', 'Padding (t r b l)', 'Margin (t r b l)', 'Background'],
      inv.blocks.map((b) => [b.el, `${b.box.x}, ${b.box.y}`, `${b.box.width} × ${b.box.height}`, b.display, b.position, b.padding, b.margin, hex(b.background)])),
    'Vertical spacing between sections comes from the margins and paddings above (no margins means sections touch).',
    '',
    '## B2.3 Key containers and components',
    '',
    table(['Element', 'x, y', 'Width × height', 'Display', 'Flex direction', 'Grid columns', 'Columns (measured)', 'Gap', 'justify-content', 'align-items', 'text-align', 'Padding (t r b l)'],
      named.map((name) => {
        const m = first(u[name]);
        return m
          ? [name, `${m.box.x}, ${m.box.y}`, `${m.box.width} × ${m.box.height}`, m.display, m.flexDirection, m.gridTemplateColumns,
            m.columns, m.gap, m.justifyContent, m.alignItems, m.textAlign, pad(m)]
          : [name, 'Not verified (not found)', '', '', '', '', '', '', '', '', '', ''];
      })),
    '## B2.4 Grid and flex containers on the page',
    '',
    table(['Element', 'x, y', 'Width × height', 'Display', 'Direction', 'Grid columns', 'Columns', 'Gap', 'justify', 'align', 'Padding'],
      inv.containers.slice(0, 60).map((c) => [c.el, `${c.box.x}, ${c.box.y}`, `${c.box.width} × ${c.box.height}`, c.display, c.flexDirection,
        c.gridTemplateColumns, c.columns, c.gap, c.justifyContent, c.alignItems, c.padding])),
    '## B2.5 DOM order vs visual order',
    '',
    inv.orderIssues.length
      ? table(['Parent', 'Element', 'DOM index', 'Visual index'], inv.orderIssues.map((o) => [o.parent, o.el, o.domIndex, o.visualIndex]))
      : 'Visual order (top to bottom, then left to right) matches DOM order for every in-flow child on the page.\n',
  ].join('\n');
}

for (const pageDef of PAGES) {
  test(`${pageDef.name} - B: layout and alignment (B1, B2, B3)`, async ({ browser }, testInfo) => {
    test.skip(!pageDef.checks, `${pageDef.name}: no element map or checks yet, so only audit E (text) runs. See README.md, "Add a page".`);
    test.setTimeout(5 * 60 * 1000);

    const d = await test.step('B1 Figma layout analysis (SVG export)', async () => {
      const { context, page } = await openDesign(browser, pageDef);
      const measured = await measure(page, pageDef.elements, 'figma');
      const inv = await page.evaluate(() => window.__pa.figmaInventory());
      await context.close();
      const figmaSide = runChecks('B', pageDef.checks.B, measured, {}, pageDef.elements);
      await save(testInfo, pageDef, 'B1-figma-layout.md', figmaLayout(pageDef, inv, measured, figmaSide));
      await save(testInfo, pageDef, 'B1-figma-layout.json', { file: inv.file, measured });
      return measured;
    });

    const u = await test.step('B2 UI layout analysis (live page)', async () => {
      const { context, page } = await openLive(browser, pageDef, VIEWPORT);
      const measured = await measure(page, pageDef.elements, 'ui');
      const inv = await page.evaluate(() => window.__pa.uiInventory());
      await context.close();
      await save(testInfo, pageDef, 'B2-ui-layout.md', uiLayout(pageDef, inv, measured));
      await save(testInfo, pageDef, 'B2-ui-layout.json', { page: inv.page, blocks: inv.blocks, containers: inv.containers, orderIssues: inv.orderIssues, measured });
      return measured;
    });

    await test.step('B3 Figma vs UI (layout)', async () => {
      const results = runChecks('B', pageDef.checks.B, d, u, pageDef.elements);
      const md = comparisonMarkdown({
        code: 'B3',
        title: 'Figma vs implemented UI (layout)',
        pageDef,
        audit: 'B',
        results,
        headerLines: [`**Viewport:** ${VIEWPORT}px (the Figma frame width), so positions are compared at the same width`],
        intro: 'Positions inside a section are measured from that section\'s top edge, so a section that is too tall shows up once (as a height difference) instead of moving everything below it.\n',
        devtools: [
          'Toggle the element boxes in Elements > Computed to confirm padding vs margin for any spacing difference.',
          'Check the header at 1440 both at the top of the page and after scrolling (see C2-ui-responsive-1440.md, header behaviour).',
        ],
      });
      await saveComparison(testInfo, pageDef, 'B3', 'Figma vs implemented UI (layout)', results, md);
    });
  });
}
