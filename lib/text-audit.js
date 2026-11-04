// UI Fidelity QA framework, audit E (text): reading text on both sides and building the checks.
// The test itself is tests/e-text.spec.js; matching texts by their words is lib/text-match.js.

const { measure } = require('./session');
const { NA } = require('./rules');
const { check, seen } = require('./check-helpers');
const { norm } = require('./text-match');

const short = (s, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

// Every non-empty text layer in the Figma SVG, measured like any other Figma layer.
function readFigmaTexts(page) {
  return page.evaluate(async () => {
    const out = [];
    for (const t of document.querySelectorAll('text')) {
      if (t.closest('defs, clipPath, mask, pattern, symbol') || !t.textContent.trim()) continue;
      const m = await window.__pa.measure(t);
      if (!m.text) continue;
      const runs = [...t.querySelectorAll('tspan')].filter((s) => s.textContent.trim());
      const firstY = Math.min(...runs.map((s) => +s.getAttribute('y')));
      const firstLine = runs
        .filter((s) => Math.abs(+s.getAttribute('y') - firstY) < 0.5)
        .map((s) => s.textContent)
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
      const fills = new Set(runs.map((s) => `${getComputedStyle(s).fill} ${getComputedStyle(s).fillOpacity}`));
      const named = t.id ? t : t.parentElement.closest('[id]');
      out.push({ ...m, firstLine, multiColor: fills.size > 1, layer: named ? named.id : '' });
    }
    return out;
  });
}

// Every visible element on the live page that shows text, with a short selector for DevTools.
function readUiTexts(page) {
  return page.evaluate(async () => {
    const TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'A', 'BUTTON', 'LI', 'LABEL', 'STRONG', 'EM', 'B', 'I',
      'SMALL', 'DT', 'DD', 'TD', 'TH', 'FIGCAPTION', 'BLOCKQUOTE', 'Q', 'CITE', 'TIME', 'SUMMARY', 'LEGEND']);
    const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const selectorOf = (el) => {
      const parts = [];
      for (let n = el; n && n !== document.body && parts.length < 6; n = n.parentElement) {
        if (n.id) {
          parts.unshift(`#${CSS.escape(n.id)}`);
          break;
        }
        const same = [...n.parentElement.children].filter((c) => c.tagName === n.tagName);
        const tag = n.tagName.toLowerCase();
        parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(n) + 1})` : tag);
      }
      return parts.join(' > ');
    };
    const out = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (!(TAGS.has(el.tagName) || (el.tagName === 'DIV' && ownText(el)))) continue;
      if (!el.checkVisibility({ checkVisibilityCSS: true, checkOpacity: true })) continue;
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (!text || text.length > 600) continue;
      const m = await window.__pa.measure(el);
      if (!m.lines) continue; // no painted text
      // Plain text: the element's words without the parts styled differently from it (another colour,
      // weight, font or size). Figma puts such an accent word in its own layer, so
      // <h1><span>The Engine That </span><span>Can <span class=accent>Power</span> What</span>…</h1>
      // is two Figma layers: "The Engine That Can What Comes Next." and "Power".
      const KEYS = ['color', 'fontWeight', 'fontFamily', 'fontSize', 'fontStyle'];
      const base = getComputedStyle(el);
      const styledApart = (node) => {
        for (let n = node.parentElement; n && n !== el; n = n.parentElement) {
          const cs = getComputedStyle(n);
          if (KEYS.some((k) => cs[k] !== base[k])) return true;
        }
        return false;
      };
      const parts = [];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) if (n.textContent.trim() && !styledApart(n)) parts.push(n.textContent);
      const plain = parts.join(' ').replace(/\s+/g, ' ').trim();
      out.push({ ...m, text, plain, selector: selectorOf(el) });
    }
    return out;
  });
}

// Index of the page section (`sections` in pages/<page>.js) that holds a box, or -1.
function sectionOf(box, boxes) {
  const y = box.y + box.height / 2;
  let best = -1;
  boxes.forEach((s, i) => {
    if (s && y >= s.y && y <= s.bottom && (best < 0 || s.height < boxes[best].height)) best = i;
  });
  return best;
}

// Boxes of the page's sections on one side, in `sections` order (null when not defined or not found).
async function sectionBoxes(page, pageDef, side) {
  const names = pageDef.sections.map(([, name]) => name);
  const defs = Object.fromEntries(names.filter((n) => pageDef.elements[n]).map((n) => [n, pageDef.elements[n]]));
  const measured = Object.keys(defs).length ? await measure(page, defs, side) : {};
  return names.map((n) => (measured[n] && measured[n].box) || null);
}

// One "found on the live page" check per missing text; six checks per text that was found.
// Returns what runChecks() needs: the checks, both snapshots and the selectors behind them.
function textChecks(figmaTexts, pairs, labels) {
  const checks = [];
  const d = {};
  const u = {};
  const defs = {};
  figmaTexts.forEach((f, i) => {
    const k = `t${i + 1}`;
    const p = pairs[i];
    d[k] = f;
    u[k] = p.ui;
    defs[k] = { figma: f.layer ? `[id="${f.layer}"]` : 'text', ui: p.ui ? p.ui.selector : null };
    const section = f.section >= 0 ? labels[f.section] : 'Page';
    const label = `"${short(f.text)}"`;
    if (!p.ui) {
      checks.push(check(section, label, 'found on the live page', 'text', (x) => x[k].text,
        () => NA('no visible element on the live page shows this text at 1440px (missing, hidden or reworded)')));
      return;
    }
    const how = [
      p.quality === 'exact' ? '' : `matched by ${p.quality}`,
      p.ui.accentRemoved ? 'compared without the differently styled word(s), which are a separate Figma layer' : '',
    ].filter(Boolean);
    const more = { confidence: p.confidence, note: how.join('; ') };
    // Wording: case and spacing are ignored (CSS text-transform changes case; joining Figma's lines adds
    // a space after a line-end hyphen). Only punctuation different = Minor; other words = Major.
    const bare = (s) => norm(s).replace(/\s+/g, '');
    const sameWords = bare(p.ui.text) === bare(f.text);
    const onlyPunctuation = bare(p.ui.text).replace(/[^a-z0-9]/g, '') === bare(f.text).replace(/[^a-z0-9]/g, '');
    checks.push(
      check(section, label, 'wording', 'text', (x) => x[k].text, (y) => (sameWords ? f.text : y[k].text),
        {
          ...more,
          severity: onlyPunctuation ? 'Minor' : 'Major',
          fix: (ft) => (onlyPunctuation ? 'Only punctuation or spacing differs: confirm which version is correct (Figma can have typos too) and align them' : `Change the text to "${ft}"`),
        }),
      check(section, label, 'font-family', 'family', (x) => x[k].fontFamily, (y) => y[k].fontFamily, more),
      check(section, label, 'font-size', 'px', (x) => x[k].fontSize, (y) => y[k].fontSize, more),
      check(section, label, 'font-weight', 'weight', (x) => x[k].fontWeight, (y) => y[k].fontWeight, more),
      check(section, label, 'text colour', 'color',
        (x) => (x[k].multiColor ? NA('the Figma text uses more than one colour; audit A checks the parts') : x[k].color),
        (y) => seen(y[k]), more),
      check(section, label, 'number of lines', 'num', (x) => x[k].lines,
        (y) => (p.ui.accentRemoved ? NA('the live element\'s lines include the differently styled word(s), which are a separate Figma layer; audit A checks the headline\'s line height') : y[k].lines),
        { ...more, severity: 'Major', fix: (ft, ut) => `Make it wrap to ${ft} line(s) like Figma (now ${ut}); check its width, font size and letter-spacing` }),
    );
  });
  return { checks, d, u, defs };
}

module.exports = { readFigmaTexts, readUiTexts, sectionOf, sectionBoxes, textChecks, short };
