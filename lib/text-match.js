// UI Fidelity QA framework, audit E: finding each Figma text layer on the live page by its words.
// The matching rules come from the earlier evidence-collector approach, which found all 146 texts on Home and Partner Opportunity.
//
// For each Figma text the live element showing the same words is found by trying, in order:
//   1. exact words                    4. contains the first line
//   2. same letters (only spacing or  5. contains the first 25 characters
//      punctuation differ)            6. similar wording, at least 70% alike ("About Us" vs "About")
//   3. contains the words
// Case is ignored, because CSS text-transform changes it. The text's own page section is
// searched first, because the same words can be a nav link and a footer link. Among equal
// candidates the smallest element wins: the <a>, not the <nav> around it.

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
const letters = (s) => s.replace(/[^a-z0-9]/g, '');

// Share of matching letter pairs, 0..1 ("partner opportunity" vs "partner opportunities" = 0.89).
function similarity(p, q) {
  const pairs = (s) => [...s].slice(0, -1).map((ch, i) => ch + s[i + 1]);
  const a = pairs(p);
  const rest = pairs(q);
  if (!a.length || !rest.length) return 0;
  const total = a.length + rest.length;
  let hits = 0;
  for (const x of a) {
    const i = rest.indexOf(x);
    if (i >= 0) {
      hits++;
      rest.splice(i, 1);
    }
  }
  return (2 * hits) / total;
}

const TRIES = [
  { quality: 'exact', confidence: 'High', test: (t, w) => t === w.full },
  { quality: 'same letters (spacing or punctuation differ)', confidence: 'High', test: (t, w) => letters(w.full).length >= 2 && letters(t) === letters(w.full) },
  { quality: 'contains the words', confidence: 'Med', test: (t, w) => t.includes(w.full) },
  { quality: 'contains the first line', confidence: 'Med', test: (t, w) => w.first.length >= 2 && t.includes(w.first) },
  { quality: 'contains the first 25 characters', confidence: 'Med', test: (t, w) => w.first.length >= 12 && t.includes(w.first.slice(0, 25)) },
];

function search(pool, w) {
  for (const tr of TRIES) {
    const found = pool.filter((e) => tr.test(e.norm, w));
    if (found.length) {
      found.sort((p, q) => p.norm.length - q.norm.length || p.area - q.area);
      return { ui: found[0], quality: tr.quality, confidence: tr.confidence };
    }
  }
  return null;
}

// Reworded copy is only looked for inside the same section, where it cannot be confused with other text.
function reworded(pool, w) {
  const best = pool
    .map((e) => ({ e, s: similarity(e.norm, w.full) }))
    .filter((c) => c.s >= 0.7)
    // equally alike: the smallest element wins (the <a>, not the <li> around it)
    .sort((p, q) => q.s - p.s || p.e.norm.length - q.e.norm.length || p.e.area - q.e.area)[0];
  return best ? { ui: best.e, quality: `similar wording (${Math.round(best.s * 100)}% alike)`, confidence: 'Med' } : null;
}

// figmaTexts: [{ text, firstLine, section }]; uiTexts: [{ text, plain?, section, box }]; section = index, or -1 if unknown.
// An element is also tried by its plain text (without the parts styled differently from it), because Figma
// puts an accent word in its own layer: "The Engine That Can … What Comes Next." and "Power" are two layers, one <h1>.
// Returns one { ui, quality, confidence } per Figma text, in the same order (ui = null when not found).
function matchTexts(figmaTexts, uiTexts) {
  const ui = [];
  for (const u of uiTexts) {
    const base = { ...u, area: u.box.width * u.box.height };
    ui.push({ ...base, norm: norm(u.text) });
    if (u.plain && norm(u.plain) !== norm(u.text)) ui.push({ ...base, text: u.plain, norm: norm(u.plain), accentRemoved: true });
  }
  return figmaTexts.map((f) => {
    const w = { full: norm(f.text), first: norm(f.firstLine || f.text) };
    const same = f.section >= 0 ? ui.filter((u) => u.section === f.section) : [];
    return search(same, w) || reworded(same, w) || search(ui, w) || { ui: null, quality: 'not found', confidence: 'Med' };
  });
}

module.exports = { matchTexts, norm, similarity };
