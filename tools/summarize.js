// UI Fidelity QA - Phase 4 helper (no installs needed, plain Node.js)
//
// Lines up design evidence (Figma SVG) and implementation evidence (Playwright JSON)
// in CSV tables you can open in Excel / Google Sheets.
// It does NOT decide Pass/Defect. It only puts the numbers next to each other.
//
// Usage (from C:\UI-QA-Playwright):
//   node tools\summarize.js                    -> every page that has design\<name>.svg
//   node tools\summarize.js home-1440          -> one page
//
// Reads:  design\<name>.svg  and  output\<name>-enhanced.json
// Writes: compare\<name>\*.csv  and  compare\<name>\summary.txt

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DESIGN_DIR = path.join(ROOT, 'design');
const OUTPUT_DIR = path.join(ROOT, 'output');
const COMPARE_DIR = path.join(ROOT, 'compare');

// ---------- small helpers ----------
const round = (v) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : '';
};

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const normText = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

const NAMED = { white: '#FFFFFF', black: '#000000', none: 'none', transparent: 'transparent' };

function normColor(c) {
  if (!c) return '';
  c = String(c).trim();
  if (NAMED[c.toLowerCase()]) return NAMED[c.toLowerCase()];
  if (/^#[0-9a-f]{3}$/i.test(c)) {
    return ('#' + c.slice(1).split('').map((x) => x + x).join('')).toUpperCase();
  }
  if (/^#[0-9a-f]{6,8}$/i.test(c)) return c.toUpperCase();
  const m = c.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
    const hex = '#' + p.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
    if (p.length > 3 && p[3] < 1) {
      if (p[3] === 0) return 'transparent';
      return `${hex} @${round(p[3])}`;
    }
    return hex;
  }
  return c;
}

const firstFamily = (f) => (f || '').split(',')[0].replace(/["']/g, '').trim();

function attrs(str) {
  const o = {};
  const re = /([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(str))) o[m[1]] = decode(m[2] !== undefined ? m[2] : m[3]);
  return o;
}

function styleProp(style, prop) {
  if (!style) return '';
  const m = style.match(new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, 'i'));
  return m ? m[1].trim() : '';
}

function writeCsv(file, rows, cols) {
  const esc = (v) => {
    if (v === undefined || v === null) return '';
    const s = String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [cols.join(',')].concat(rows.map((r) => cols.map((c) => esc(r[c])).join(',')));
  // BOM so Excel opens UTF-8 correctly.
  fs.writeFileSync(file, '\uFEFF' + lines.join('\r\n'), 'utf8');
}

// ---------- design side: parse Figma SVG ----------
function parseSvg(svgText) {
  const result = { width: '', height: '', texts: [], rects: [], effects: [], gradients: [] };
  const stack = []; // open elements: { tag, id }
  let curText = null;
  let curTspan = null;
  let curGradient = null;

  const groupPath = () =>
    stack
      .filter((e) => e.tag === 'g' && e.id)
      .map((e) => e.id)
      .join(' > ');
  const currentFilter = () => {
    for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === 'filter') return stack[i].id;
    return '';
  };

  const tokenRe = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<([\/?!]?)([a-zA-Z][\w:.-]*)([^>]*?)(\/?)>|([^<]+)/g;
  let m;
  while ((m = tokenRe.exec(svgText))) {
    const [, prefix, rawTag, attrStr, selfClose, textContent] = [m[1], m[1], m[2], m[3], m[4], m[5]];

    if (textContent !== undefined) {
      if (curTspan) curTspan.text += decode(textContent);
      else if (curText && !/^\s*$/.test(textContent)) {
        curText.tspans.push({ x: curText.a.x, y: curText.a.y, text: decode(textContent), a: {} });
      }
      continue;
    }
    if (!rawTag || prefix === '?' || prefix === '!') continue;
    const tag = rawTag;

    if (prefix === '/') {
      if (tag === 'tspan') curTspan = null;
      if (tag === 'text' && curText) {
        result.texts.push(curText);
        curText = null;
      }
      if (/Gradient$/.test(tag) && curGradient) {
        result.gradients.push(curGradient);
        curGradient = null;
      }
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    const a = attrs(attrStr || '');
    const isSelfClosing = selfClose === '/';

    if (tag === 'svg' && result.width === '') {
      result.width = round(a.width);
      result.height = round(a.height);
    }

    if (tag === 'text') {
      curText = { a, group: groupPath(), tspans: [] };
    } else if (tag === 'tspan' && curText) {
      curTspan = { x: a.x, y: a.y, text: '', a };
      curText.tspans.push(curTspan);
      if (isSelfClosing) curTspan = null;
    } else if (tag === 'rect') {
      result.rects.push({
        group: groupPath(),
        id: a.id || '',
        x: round(a.x || 0),
        y: round(a.y || 0),
        width: round(a.width),
        height: round(a.height),
        rx: round(a.rx || 0),
        fill: normColor(a.fill || styleProp(a.style, 'fill')),
        fillOpacity: a['fill-opacity'] || '',
        stroke: normColor(a.stroke || ''),
        strokeWidth: a['stroke-width'] || '',
        opacity: a.opacity || '',
        insideFilterOrDefs: stack.some((e) => e.tag === 'defs' || e.tag === 'clipPath' || e.tag === 'mask' || e.tag === 'pattern') ? 'yes' : '',
      });
    } else if (tag === 'feGaussianBlur') {
      result.effects.push({ group: groupPath(), filterId: currentFilter(), type: 'feGaussianBlur (stdDeviation)', value: a.stdDeviation || '' });
    } else if (tag === 'feDropShadow') {
      result.effects.push({
        group: groupPath(),
        filterId: currentFilter(),
        type: 'feDropShadow',
        value: `dx ${a.dx || 0} dy ${a.dy || 0} std ${a.stdDeviation || 0} ${normColor(a['flood-color'] || '')} ${a['flood-opacity'] || ''}`.trim(),
      });
    } else if (tag === 'feOffset') {
      result.effects.push({ group: groupPath(), filterId: currentFilter(), type: 'feOffset (shadow offset)', value: `dx ${a.dx || 0} dy ${a.dy || 0}` });
    } else if (tag === 'feColorMatrix' && currentFilter() && a.values) {
      result.effects.push({ group: groupPath(), filterId: currentFilter(), type: 'feColorMatrix (shadow colour/alpha)', value: a.values });
    } else if (a.style && /backdrop-filter/i.test(a.style)) {
      result.effects.push({ group: groupPath(), filterId: '', type: 'backdrop-filter', value: styleProp(a.style, 'backdrop-filter') });
    } else if (tag === 'linearGradient' || tag === 'radialGradient') {
      curGradient = {
        id: a.id || '',
        type: tag,
        geometry: tag === 'linearGradient' ? `x1 ${a.x1} y1 ${a.y1} -> x2 ${a.x2} y2 ${a.y2}` : `cx ${a.cx} cy ${a.cy} r ${a.r}`,
        stops: [],
      };
      if (isSelfClosing) {
        result.gradients.push(curGradient);
        curGradient = null;
      }
    } else if (tag === 'stop' && curGradient) {
      const col = normColor(a['stop-color'] || styleProp(a.style, 'stop-color') || '#000000');
      const op = a['stop-opacity'] || styleProp(a.style, 'stop-opacity');
      curGradient.stops.push(`${a.offset || 0}: ${col}${op && op !== '1' ? ' @' + op : ''}`);
    }

    if (!isSelfClosing) stack.push({ tag, id: a.id || '' });
  }
  return result;
}

function summarizeDesignText(t) {
  const a = t.a;
  const runs = t.tspans.filter((s) => s.text.trim() !== '');
  if (!runs.length) return null;
  // Group runs into visual lines by baseline y.
  const lines = [];
  for (const r of runs) {
    const y = round(r.y);
    let line = lines.find((l) => l.y === y);
    if (!line) {
      line = { y, x: round(r.x), text: '' };
      lines.push(line);
    }
    line.text += r.text;
    line.x = Math.min(line.x, round(r.x));
  }
  lines.sort((p, q) => p.y - q.y);
  const steps = [];
  for (let i = 1; i < lines.length; i++) steps.push(round(lines[i].y - lines[i - 1].y));
  steps.sort((p, q) => p - q);
  const step = steps.length ? steps[Math.floor(steps.length / 2)] : '';

  const fills = new Set(runs.map((r) => normColor(r.a.fill || a.fill || styleProp(a.style, 'fill'))));
  const runFills =
    fills.size > 1 ? runs.map((r) => `${r.text.trim()}=${normColor(r.a.fill || a.fill)}`).join(' | ') : '';

  return {
    group: t.group,
    text: lines.map((l) => l.text.replace(/\s+/g, ' ').trim()).join(' '),
    firstLine: lines[0].text.replace(/\s+/g, ' ').trim(),
    x: Math.min(...lines.map((l) => l.x)),
    baselineY: lines[0].y,
    lines: lines.length,
    lineStep: step,
    family: firstFamily(a['font-family'] || styleProp(a.style, 'font-family')),
    size: round(a['font-size'] || styleProp(a.style, 'font-size')),
    weight: a['font-weight'] || styleProp(a.style, 'font-weight') || '400',
    letterSpacing: a['letter-spacing'] || '',
    fill: [...fills].join(' + '),
    runFills,
  };
}

// ---------- implementation side ----------
function pickMatch(designText, implTextEls) {
  const full = normText(designText.text);
  const first = normText(designText.firstLine);
  const tries = [
    { quality: 'exact', test: (t) => t === full },
    { quality: 'contains', test: (t) => t.includes(full) },
    { quality: 'first line', test: (t) => first.length >= 2 && t.includes(first) },
    { quality: 'partial (first 25 chars)', test: (t) => first.length >= 12 && t.includes(first.slice(0, 25)) },
  ];
  for (const tr of tries) {
    const cands = implTextEls.filter((e) => tr.test(e._norm));
    if (cands.length) {
      cands.sort((p, q) => p._norm.length - q._norm.length || p.width * p.height - q.width * q.height);
      return { el: cands[0], quality: tr.quality };
    }
  }
  return { el: null, quality: 'NOT FOUND' };
}

function processPage(name) {
  const svgFile = path.join(DESIGN_DIR, `${name}.svg`);
  const jsonFile = path.join(OUTPUT_DIR, `${name}-enhanced.json`);
  if (!fs.existsSync(svgFile)) return console.log(`[skip] ${name}: missing ${svgFile}`);
  if (!fs.existsSync(jsonFile)) return console.log(`[skip] ${name}: missing ${jsonFile} (run Phase 3 first)`);

  const outDir = path.join(COMPARE_DIR, name);
  fs.mkdirSync(outDir, { recursive: true });

  const design = parseSvg(fs.readFileSync(svgFile, 'utf8'));
  const impl = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const primary = impl.primary || [];
  const containers = impl.containers || [];

  // 1. Implementation page blocks (sections) ------------------------------
  const blockTags = new Set(['HEADER', 'NAV', 'MAIN', 'SECTION', 'FOOTER']);
  const blocks = primary
    .filter((e) => blockTags.has(e.tag))
    .map((e) => ({ ...e, source: 'primary' }))
    .concat(containers.filter((e) => e.width >= 1200).map((e) => ({ ...e, source: 'full-width container' })))
    .sort((p, q) => p.y - q.y || q.height - p.height)
    .map((e) => ({
      source: e.source,
      tag: e.tag,
      id: e.id,
      className: (e.className || '').slice(0, 80),
      startsWithText: (e.text || '').slice(0, 60),
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height,
      bottom: round(e.y + e.height),
      background: normColor(e.backgroundColor),
      backgroundImage: (e.backgroundImage || '').slice(0, 200),
      paddingTop: e.paddingTop,
      paddingBottom: e.paddingBottom,
    }));
  writeCsv(path.join(outDir, '1-impl-sections.csv'), blocks, [
    'source', 'tag', 'id', 'className', 'startsWithText', 'x', 'y', 'width', 'height', 'bottom',
    'background', 'backgroundImage', 'paddingTop', 'paddingBottom',
  ]);

  // 2. Design rectangles (section backgrounds, cards, buttons, panels) ----
  const rects = design.rects
    .filter((r) => !r.insideFilterOrDefs && r.width >= 80 && r.height >= 32)
    .map((r) => ({ ...r, bottom: round(r.y + r.height), fullWidth: r.width >= 1200 ? 'yes' : '' }))
    .sort((p, q) => p.y - q.y || q.width * q.height - p.width * p.height);
  writeCsv(path.join(outDir, '2-design-rects.csv'), rects, [
    'fullWidth', 'group', 'id', 'x', 'y', 'width', 'height', 'bottom', 'rx', 'fill', 'fillOpacity',
    'stroke', 'strokeWidth', 'opacity',
  ]);

  // 3. Text: design vs implementation, matched by content ----------------
  const textTags = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL']);
  const implText = primary
    .filter((e) => textTags.has(e.tag) && e.text)
    .map((e) => ({ ...e, _norm: normText(e.text) }));

  const designTexts = design.texts.map(summarizeDesignText).filter(Boolean);
  const textRows = designTexts.map((d) => {
    const { el, quality } = pickMatch(d, implText);
    const row = {
      match: quality,
      designGroup: d.group,
      designText: d.text.slice(0, 200),
      implText: el ? el.text.slice(0, 200) : '',
      copy: el ? (normText(d.text) === el._norm ? 'same' : 'DIFFERENT') : '',
      designFamily: d.family,
      implFamily: el ? firstFamily(el.fontFamily) : '',
      designSize: d.size,
      implSize: el ? round(el.fontSize) : '',
      designWeight: d.weight,
      implWeight: el ? el.fontWeight : '',
      designColor: d.fill,
      designRunColors: d.runFills,
      implColor: el ? normColor(el.color) : '',
      designLines: d.lines,
      designLineStep: d.lineStep,
      implLineHeight: el ? el.lineHeight : '',
      implLinesApprox:
        el && parseFloat(el.lineHeight) > 0 ? Math.round(el.height / parseFloat(el.lineHeight)) : '',
      designLetterSpacing: d.letterSpacing,
      implLetterSpacing: el ? el.letterSpacing : '',
      designX: d.x,
      designBaselineY: d.baselineY,
      implX: el ? el.x : '',
      implTopY: el ? el.y : '',
      implWidth: el ? el.width : '',
      implHeight: el ? el.height : '',
      implTag: el ? el.tag : '',
    };
    const flags = [];
    if (el) {
      if (row.designFamily && row.implFamily && row.designFamily.toLowerCase() !== row.implFamily.toLowerCase()) flags.push('family');
      if (row.designSize !== '' && row.implSize !== '' && Math.abs(row.designSize - row.implSize) >= 0.5) flags.push('size');
      if (String(row.designWeight) !== String(row.implWeight)) flags.push('weight');
      if (!d.runFills && row.designColor && row.implColor && row.designColor !== row.implColor) flags.push('color');
      if (row.implLinesApprox !== '' && row.implLinesApprox !== d.lines) flags.push('wrapping');
      if (row.copy === 'DIFFERENT') flags.push('copy');
    } else {
      flags.push('not found in implementation');
    }
    row.toReview = flags.join(', ');
    return row;
  });
  writeCsv(path.join(outDir, '3-text-compare.csv'), textRows, [
    'toReview', 'match', 'designText', 'implText', 'copy', 'designFamily', 'implFamily', 'designSize',
    'implSize', 'designWeight', 'implWeight', 'designColor', 'designRunColors', 'implColor', 'designLines',
    'implLinesApprox', 'designLineStep', 'implLineHeight', 'designLetterSpacing', 'implLetterSpacing',
    'designX', 'implX', 'designBaselineY', 'implTopY', 'implWidth', 'implHeight', 'implTag', 'designGroup',
  ]);

  // 4. Effects: design -----------------------------------------------------
  writeCsv(path.join(outDir, '4-design-effects.csv'), design.effects, ['group', 'filterId', 'type', 'value']);
  writeCsv(
    path.join(outDir, '4b-design-gradients.csv'),
    design.gradients.map((g) => ({ ...g, stops: g.stops.join(' | ') })),
    ['id', 'type', 'geometry', 'stops']
  );

  // 5. Effects: implementation --------------------------------------------
  const implEffects = primary
    .concat(containers)
    .filter(
      (e) =>
        (e.backdropFilter && e.backdropFilter !== 'none') ||
        (e.filter && e.filter !== 'none') ||
        (e.boxShadow && e.boxShadow !== 'none') ||
        (e.backgroundImage && /gradient/.test(e.backgroundImage))
    )
    .sort((p, q) => p.y - q.y)
    .map((e) => ({
      tag: e.tag,
      category: e.category,
      className: (e.className || '').slice(0, 80),
      text: (e.text || '').slice(0, 60),
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height,
      borderRadius: e.borderRadius,
      background: normColor(e.backgroundColor),
      backdropFilter: e.backdropFilter,
      filter: e.filter,
      boxShadow: e.boxShadow,
      gradient: /gradient/.test(e.backgroundImage || '') ? e.backgroundImage.slice(0, 300) : '',
    }));
  writeCsv(path.join(outDir, '5-impl-effects.csv'), implEffects, [
    'tag', 'category', 'className', 'text', 'x', 'y', 'width', 'height', 'borderRadius', 'background',
    'backdropFilter', 'filter', 'boxShadow', 'gradient',
  ]);

  // 6. Interaction states (implementation only) ---------------------------
  const stateProps = ['color', 'backgroundColor', 'backgroundImage', 'borderTopColor', 'boxShadow', 'outline', 'opacity', 'transform', 'filter', 'textDecoration'];
  const diff = (a, b) =>
    stateProps.filter((p) => a && b && a[p] !== b[p]).map((p) => `${p}: ${a[p]} -> ${b[p]}`).join(' ; ');
  const stateRows = (impl.states || []).map((s) =>
    s.error
      ? { qaId: s.qaId, text: '', tag: '', hoverChanges: '', focusChanges: '', note: 'capture error: ' + s.error.slice(0, 120) }
      : {
          qaId: s.qaId,
          text: (s.default.text || s.default.ariaLabel || '').slice(0, 60),
          tag: s.default.tag,
          hoverChanges: diff(s.default, s.hover) || 'no visible change',
          focusChanges: diff(s.default, s.focus) || 'no visible change',
          note: s.disabled ? 'real disabled control' : '',
        }
  );
  writeCsv(path.join(outDir, '6-impl-states.csv'), stateRows, ['qaId', 'text', 'tag', 'hoverChanges', 'focusChanges', 'note']);

  // Summary -------------------------------------------------------------------
  const notFound = textRows.filter((r) => r.match === 'NOT FOUND').length;
  const toReview = textRows.filter((r) => r.toReview).length;
  const summary = [
    `Page: ${name}`,
    `Design SVG:          ${path.relative(ROOT, svgFile)}`,
    `Implementation JSON: ${path.relative(ROOT, jsonFile)}  (${impl.metadata && impl.metadata.url})`,
    '',
    `Width   design ${design.width}  vs implementation ${impl.metadata && impl.metadata.document.width}`,
    `Height  design ${design.height}  vs implementation ${impl.metadata && impl.metadata.document.height}` +
      `  (delta ${round((impl.metadata && impl.metadata.document.height) - design.height)})`,
    `Viewport ${impl.metadata && impl.metadata.viewport.width}x${impl.metadata && impl.metadata.viewport.height}, DPR ${impl.metadata && impl.metadata.viewport.devicePixelRatio}`,
    '',
    `Design text blocks: ${designTexts.length}  | matched: ${designTexts.length - notFound}  | not found: ${notFound}  | rows flagged to review: ${toReview}`,
    `Design rects (>=80x32): ${rects.length}  | design effects: ${design.effects.length}  | design gradients: ${design.gradients.length}`,
    `Impl section blocks: ${blocks.length}  | impl elements with effects: ${implEffects.length}  | interaction states: ${stateRows.length}`,
    '',
    design.texts.length === 0
      ? 'WARNING: no <text> found in the SVG. Re-export from Figma with "Outline text" OFF.'
      : '',
    'Reminder: total height is NOT a fidelity score. Compare section heights first (framework section 2/8).',
  ].join('\r\n');
  fs.writeFileSync(path.join(outDir, 'summary.txt'), summary, 'utf8');

  console.log(`[done] ${name} -> ${path.relative(ROOT, outDir)}\\`);
  console.log('       ' + summary.split('\r\n').slice(4, 6).join('\n       '));
}

// ---------- main ----------
let pages = process.argv.slice(2);
if (!pages.length) {
  if (!fs.existsSync(DESIGN_DIR)) {
    console.error('No design folder found. Run this from C:\\UI-QA-Playwright');
    process.exit(1);
  }
  pages = fs.readdirSync(DESIGN_DIR).filter((f) => f.endsWith('.svg')).map((f) => f.replace(/\.svg$/, ''));
}
pages.forEach(processPage);
