// UI Fidelity QA framework, audit C: responsive behaviour.
//   C1  Figma responsive details -> the one 1440 frame in the SVG export
//   C2  UI responsive analysis   -> live page at every viewport in pageDef.viewports (from prompt C4)
//   C3  Figma vs UI              -> checks.C at 1440; other widths go to "Could not verify" (no Figma frame)
// Outputs: reports/<page>/details/C1-figma-responsive.md, C2-ui-responsive-<width>.md, C3.md (+ .json, screenshots)

const fs = require('fs');
const path = require('path');
const { test } = require('@playwright/test');
const PAGES = require('../pages');
const { openDesign, openLive, measure, measureAfterScroll } = require('../lib/session');
const { runChecks, parseColor, colorText, round } = require('../lib/rules');
const { table, bullets, numbered, header, save, comparisonMarkdown, saveComparison, OUT_ROOT } = require('../lib/report');

const FIGMA_WIDTH = 1440;
const hex = (v) => colorText(parseColor(v));
const first = (m) => (Array.isArray(m) ? m[0] : m);
const textOf = (m) => (m && m.label ? m.label : m);
const yes = (b) => (b ? 'yes' : 'no');
const sortByY = (pageDef, snap) =>
  pageDef.sections.filter(([, n]) => snap[n]).sort((p, q) => snap[p[1]].box.y - snap[q[1]].box.y);
const visibleOf = (v) => (Array.isArray(v) ? `${v.filter((m) => m.visible).length} of ${v.length} shown` : v ? (v.visible ? 'shown' : 'hidden') : 'not in DOM');
const imgRow = (label, i) =>
  i
    ? [label, String(i.src).length > 50 ? `${String(i.src).slice(0, 50)}…` : i.src, i.sourceWidth ? `${i.sourceWidth}×${i.sourceHeight} (${round(i.sourceWidth / i.sourceHeight, 3)})` : 'Not verified',
      `${i.frameWidth}×${i.frameHeight} (${round(i.frameWidth / i.frameHeight, 3)})`,
      i.renderedWidth ? `${i.renderedWidth}×${i.renderedHeight}` : '—',
      i.offsetX !== undefined ? `x ${i.offsetX}, y ${i.offsetY}` : '—', i.fit, i.position || '—']
    : [label, 'Not found', '', '', '', '', '', ''];

// ---------------- C1 ----------------
function figmaResponsive(pageDef, inv, d, figmaSide) {
  const cards = d[pageDef.report.cards.items];
  const cardRow = pageDef.report.cards.row;
  const crops = inv.images.map((i) => {
    const cropX = Math.max(0, i.renderedWidth - i.frameWidth);
    const cropY = Math.max(0, i.renderedHeight - i.frameHeight);
    return { i, share: Math.max(cropX / i.renderedWidth, cropY / i.renderedHeight) };
  });
  const stretched = inv.images.filter((i) => Math.abs(i.renderedWidth / i.sourceWidth - i.renderedHeight / i.sourceHeight) > 0.002);
  return [
    header('C1', 'Figma responsive details (Desktop 1440)', pageDef, [`**Frames in the file:** one, ${inv.file.width} × ${inv.file.height}`]),
    bullets([
      '**Tablet 768px and Mobile 375px:** Not specified. The file has no frame for them, so no reflow, hidden-element, sizing or image behaviour exists for those widths.',
      '**Breakpoints and max-width:** Not specified.',
    ]),
    '## C1.1 Frame width and layout / column structure (1440)',
    '',
    table(['Element', 'Structure'], figmaSide.filter((r) => /columns|rows|order|position|alignment|shown|^width$/.test(r.property)).map((r) => [`${r.element} — ${r.property}`, r.figmaText])),
    table(['Section', 'y range', 'Height'], pageDef.sections.map(([label, n]) => (d[n] ? [label, `${d[n].box.y}–${d[n].box.bottom}`, d[n].box.height] : [label, 'Not found', '']))),
    '## C1.2 How sections stack or reflow',
    '',
    numbered(sortByY(pageDef, d).map(([label]) => label)),
    'Reflow rules (when columns stack, grids drop columns, or order changes): Not specified.',
    '',
    '## C1.3 Hidden, shown, collapsed or replaced elements',
    '',
    bullets([
      `At 1440 every layer is shown: nav pill with ${(d.navLinks || []).length} links, nav button, all sections.`,
      `Hamburger / collapsed menu: ${d.menuToggle ? 'present' : 'none in the file'}.`,
      'Hidden, collapsed or replaced elements at other widths: Not specified.',
    ]),
    '## C1.4 Element sizes, spacing and padding (1440)',
    '',
    table(['Element', 'Width × height', 'x, y'], pageDef.report.sizes
      .map((n) => first(d[n]) ? [n, `${first(d[n]).box.width} × ${first(d[n]).box.height}`, `${first(d[n]).box.x}, ${first(d[n]).box.y}`] : [n, 'Not found', ''])),
    '## C1.5 Font sizes and line-heights (1440)',
    '',
    table(['Role', 'Font size', 'Weight', 'Lines', 'Line pitch (baseline to baseline)'], pageDef.textRoles.map(([role, n]) => {
      const t = textOf(first(d[n]));
      return t ? [role, t.fontSize, t.fontWeight, t.lines, t.linePitch ? `${t.linePitch}px` : 'single line'] : [role, 'Not found', '', '', ''];
    })),
    '## C1.6 Image sizes, aspect ratios and cropping (1440)',
    '',
    table(['Used on', 'Source', 'Source size (aspect)', 'Frame (aspect)', 'Rendered in frame', 'Offset', 'Scaling', 'Position'],
      inv.images.map((i) => imgRow(i.usedOn, { ...i, fit: Math.abs(i.renderedWidth / i.sourceWidth - i.renderedHeight / i.sourceHeight) > 0.002 ? 'stretched' : 'uniform (fills frame)' }))),
    'Image behaviour at other viewports: Not specified.',
    '',
    '## C1.7 Tables, cards, buttons and forms (1440)',
    '',
    bullets([
      'Tables and forms: none in the file.',
      cards && cards.length ? `Cards: ${cards.length} cards, ${cards[0].box.width} × ${cards[0].box.height}, ${d[cardRow] ? d[cardRow].columns : '?'} per row.` : 'Cards: Not found.',
      `Buttons: fixed sizes ${['navButton', 'heroButton', 'ctaButton'].map((n) => d[n] && `${d[n].box.width} × ${d[n].box.height}`).filter(Boolean).join(', ')}, default state only.`,
      'How any of these change at smaller widths: Not specified.',
    ]),
    '## C1.8 Inconsistencies in the design itself',
    '',
    bullets([
      ...stretched.map((i) => `"${i.src}" (${i.usedOn}) is scaled non-uniformly: ${round(i.renderedWidth / i.sourceWidth, 4)} horizontally vs ${round(i.renderedHeight / i.sourceHeight, 4)} vertically, so it is distorted.`),
      ...crops.filter((c) => c.share > 0.1).map((c) => `"${c.i.src}" (${c.i.usedOn}) is cropped by ${Math.round(c.share * 100)}% of its rendered size.`),
    ]),
  ].join('\n');
}

// ---------------- C2 ----------------
function uiResponsive(pageDef, width, inv, images, u, headerTop, headerScrolled) {
  const widthQueries = inv.breakpoints.filter((b) => /width/.test(b.query));
  const hdr = (m) => (m ? [m.position, m.top || '—', hex(m.backgroundColor), m.backdropFilter, `${m.box.height}px`, `${m.paddingTop} ${m.paddingRight}`] : ['Not found', '', '', '', '', '']);
  return [
    header('C2', `UI responsive analysis at ${width}px`, pageDef, [
      `**Viewport:** ${width} × ${inv.page.viewport.height} (client width ${inv.page.clientWidth}px). **Document:** ${inv.page.document.width} × ${inv.page.document.height}.`,
      `**Horizontal scrolling:** ${yes(inv.overflow.horizontalScroll)}.`,
      `**Active width breakpoints:** ${widthQueries.filter((b) => b.active).map((b) => b.query).join(', ') || 'none'}.`,
      `**Screenshot:** ../screenshots/C2-${width}.jpg`,
    ]),
    '## C2.1 Layout structure and columns',
    '',
    table(['Container', 'Display', 'Flex direction', 'Grid columns', 'Columns (measured)', 'Gap', 'Padding (t r b l)'],
      pageDef.containers.map((n) => {
        const m = u[n];
        return m ? [n, m.display, m.flexDirection, m.gridTemplateColumns, m.columns, m.gap, `${m.paddingTop} ${m.paddingRight} ${m.paddingBottom} ${m.paddingLeft}`] : [n, 'Not found', '', '', '', '', ''];
      })),
    '## C2.2 Stacking order',
    '',
    table(['#', 'Section', 'y', 'Height'], sortByY(pageDef, u).map(([label, n], i) => [i + 1, label, u[n].box.y, u[n].box.height])),
    `DOM vs visual order differences: ${inv.orderIssues.length ? inv.orderIssues.map((o) => `${o.el} in ${o.parent} (DOM ${o.domIndex}, visual ${o.visualIndex})`).join('; ') : 'none'}.`,
    '',
    '## C2.3 Hidden, shown, collapsed or replaced',
    '',
    table(['Element', 'State at this width'], Object.keys(pageDef.elements).filter((n) => pageDef.elements[n].ui).map((n) => [n, visibleOf(u[n])])),
    '### Elements with responsive display classes',
    '',
    table(['Element', 'Classes', 'Computed display', 'Visible'], inv.toggled.map((t) => [t.el, t.classes, t.display, yes(t.visible)])),
    '## C2.4 Element sizes, spacing and padding',
    '',
    table(['Element', 'x, y', 'Width × height', 'Padding (t r b l)', 'Margin (t r b l)'],
      ['header', 'logo', 'navPill', 'navButton', 'heroContent', 'heroButton', 'advPanel', 'advList', 'advIcons', 'ptCards', 'plRows', 'plChecks', 'ctaCard', 'ctaButton', 'footer']
        .map((n) => {
          const m = first(u[n]);
          return m ? [n, `${m.box.x}, ${m.box.y}`, `${m.box.width} × ${m.box.height}`, `${m.paddingTop} ${m.paddingRight} ${m.paddingBottom} ${m.paddingLeft}`,
            `${m.marginTop} ${m.marginRight} ${m.marginBottom} ${m.marginLeft}`] : [n, 'Not found', '', '', ''];
        })),
    '## C2.5 Font sizes and line-heights',
    '',
    table(['Role', 'Font size', 'Line-height', 'Weight', 'Rendered lines', 'Visible'], pageDef.textRoles.map(([role, n]) => {
      const m = first(u[n]);
      return m ? [role, m.fontSize, m.lineHeight, m.fontWeight, m.lines, yes(m.visible)] : [role, 'Not found', '', '', '', ''];
    })),
    '## C2.6 Images: dimensions, aspect ratios, object-fit',
    '',
    table(['Element', 'Source', 'Natural size (aspect)', 'Frame (aspect)', 'Rendered', 'Offset', 'object-fit / background-size', 'Position'],
      images.map((i) => imgRow(i.el, i))),
    '## C2.7 Overflow, truncation and overlap',
    '',
    bullets([
      `Horizontal scrolling: ${yes(inv.overflow.horizontalScroll)} (document ${inv.overflow.documentWidth}px, client ${inv.page.clientWidth}px).`,
      `Elements past the right edge and not clipped: ${inv.overflow.offenders.length ? inv.overflow.offenders.map((o) => `${o.el} (right ${o.right})`).join('; ') : 'none'}.`,
      `Truncated text (clipped, ellipsis or line-clamp): ${inv.truncated.length ? inv.truncated.join('; ') : 'none'}.`,
      `Overlapping in-flow siblings: ${inv.overlaps.length ? inv.overlaps.map((o) => `${o.a} / ${o.b} (${o.overlap})`).join('; ') : 'none'}.`,
    ]),
    '## C2.8 Breakpoints (media queries in the stylesheets)',
    '',
    table(['Media query', 'Active at this width'], widthQueries.map((b) => [
      b.query.replace(/([\d.]+)rem/g, (m, n) => `${m} (${n * parseFloat(inv.page.rootFontSize)}px)`),
      yes(b.active),
    ])),
    '## C2.9 Header behaviour',
    '',
    table(['When', 'position', 'top', 'Background', 'backdrop-filter', 'Height', 'Padding (t r)'], [
      ['At the top of the page', ...hdr(headerTop)],
      ['After scrolling 600px', ...hdr(headerScrolled)],
    ]),
  ].join('\n');
}

// One line per non-Figma width for C3's "Could not verify".
function widthSummary(pageDef, width, u, inv) {
  const h1 = u.h1;
  const columns = pageDef.report.widthColumns.map(([label, n]) => `${label} ${u[n] ? u[n].columns : '?'} column(s)`).join(', ');
  return `No Figma frame at ${width}px. UI at ${width}: desktop nav ${visibleOf(u.navPill)}, hamburger ${visibleOf(u.menuToggle)}, ` +
    `${columns}, ` +
    `H1 ${h1 ? `${h1.fontSize}/${h1.lineHeight}, ${h1.lines} lines` : '?'}, hero ${u.hero ? u.hero.box.height : '?'}px tall, ` +
    `horizontal scroll ${yes(inv.overflow.horizontalScroll)}`;
}

for (const pageDef of PAGES) {
  test(`${pageDef.name} - C: responsive behaviour (C1, C2, C3)`, async ({ browser }, testInfo) => {
    test.skip(!pageDef.checks, `${pageDef.name}: no element map or checks yet, so only audit E (text) runs. See README.md, "Add a page".`);
    test.setTimeout(10 * 60 * 1000);
    const shots = path.join(OUT_ROOT, pageDef.name, 'screenshots');
    fs.mkdirSync(shots, { recursive: true });

    const d = await test.step('C1 Figma responsive details (1440 frame)', async () => {
      const { context, page } = await openDesign(browser, pageDef);
      const measured = await measure(page, pageDef.elements, 'figma');
      const inv = await page.evaluate(() => window.__pa.figmaInventory());
      await context.close();
      const figmaSide = runChecks('C', pageDef.checks.C, measured, {}, pageDef.elements);
      await save(testInfo, pageDef, 'C1-figma-responsive.md', figmaResponsive(pageDef, inv, measured, figmaSide));
      await save(testInfo, pageDef, 'C1-figma-responsive.json', { file: inv.file, images: inv.images, measured });
      return measured;
    });

    const byWidth = {};
    for (const width of pageDef.viewports) {
      await test.step(`C2 UI responsive analysis at ${width}px`, async () => {
        const { context, page } = await openLive(browser, pageDef, width);
        const measured = await measure(page, pageDef.elements, 'ui');
        const inv = await page.evaluate(() => window.__pa.uiInventory());
        const images = await page.evaluate(() => window.__pa.uiImages());
        const headerTop = measured.header;
        const headerScrolled = pageDef.elements.header ? await measureAfterScroll(page, pageDef.elements.header.ui, 600) : null;
        await page.screenshot({ path: path.join(shots, `C2-${width}.jpg`), fullPage: true, type: 'jpeg', quality: 70, animations: 'disabled' });
        await context.close();
        byWidth[width] = { measured, inv };
        await save(testInfo, pageDef, `C2-ui-responsive-${width}.md`, uiResponsive(pageDef, width, inv, images, measured, headerTop, headerScrolled));
        await save(testInfo, pageDef, `C2-ui-responsive-${width}.json`, { width, page: inv.page, breakpoints: inv.breakpoints, toggled: inv.toggled,
          overflow: inv.overflow, truncated: inv.truncated, overlaps: inv.overlaps, images, headerTop, headerScrolled, measured });
      });
    }

    await test.step('C3 Figma vs UI (responsive)', async () => {
      const at1440 = byWidth[FIGMA_WIDTH];
      const results = runChecks('C', pageDef.checks.C, d, at1440 ? at1440.measured : {}, pageDef.elements)
        .map((r) => ({ ...r, viewport: `${FIGMA_WIDTH}` }));
      for (const width of pageDef.viewports.filter((w) => w !== FIGMA_WIDTH)) {
        const w = byWidth[width];
        results.push({
          id: `C-${width}`, audit: 'C', category: '', element: 'All responsive checks', property: `${width}px`, state: 'Default',
          viewport: `${width}`, kind: 'text', figmaText: '—', uiText: '—', figmaSelectors: [], uiSelectors: [], note: '', confidence: 'High',
          status: 'unverified', reason: w ? widthSummary(pageDef, width, w.measured, w.inv) : `No Figma frame at ${width}px and the UI was not measured`,
        });
      }
      const md = comparisonMarkdown({
        code: 'C3',
        title: 'Figma vs implemented UI (responsive)',
        pageDef,
        audit: 'C',
        results,
        headerLines: [`**Viewports measured:** ${pageDef.viewports.join(', ')} px. **Figma frames:** ${FIGMA_WIDTH} only.`],
        intro: `Figma has one frame (${FIGMA_WIDTH}px), so behaviour is compared at ${FIGMA_WIDTH}. Every other width is listed under "Could not verify" with what the UI does there (details in C2-ui-responsive-<width>.md).\n`,
        devtools: [
          'Device mode "Responsive", exact widths 1280/1279 and 1024/1023: confirm where the desktop nav and the 4-column partner grid switch.',
          'Ask design for Tablet (768) and Mobile (375) frames; until then those widths cannot be compared.',
        ],
      });
      await saveComparison(testInfo, pageDef, 'C3', 'Figma vs implemented UI (responsive)', results, md);
    });
  });
}
