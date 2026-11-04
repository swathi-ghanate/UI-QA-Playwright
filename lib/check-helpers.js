// Helpers shared by the pages' check lists (pages/<page>.checks.js).
//
// check(category, element, property, kind, figma(d), ui(u), options)
//   d = measured Figma layers, u = measured live-page elements (names from pages/<page>.js)
//   kind: color | px | num | text | weight | family | radius | shadow | gradient | list (see rules.js)
//   return NA('reason') when a value cannot exist on one side; it goes to "Could not verify".
//   options: severity (Blocker/Major/Minor), confidence (High/Med/Low), fix, note, tol, state

const { NA, withOpacity, parseGradient } = require('./rules');

const check = (cat, el, prop, kind, figma, ui, more = {}) => ({ cat, el, prop, kind, figma, ui, ...more });

const seen = (m) => withOpacity(m.color, m.opacityChain ?? m.opacity ?? 1); // colour as rendered, opacity included
const seenBg = (m) => withOpacity(m.backgroundColor, m.opacityChain ?? m.opacity ?? 1);
const angleOf = (bg) => {
  const g = typeof bg === 'object' ? bg : parseGradient(bg);
  return g && g.stops && g.stops.length ? g.angle : NA('no CSS linear-gradient on this element');
};
const blurOf = (filter) => {
  const m = /blur\(([\d.]+)px\)/.exec(filter || '');
  return m ? +m[1] : NA('no CSS blur() filter on this element');
};
const align = (v) => ({ start: 'left', end: 'right', '-webkit-center': 'center' }[v] || v);
const centreX = (b) => b.x + b.width / 2;
const centreY = (b) => b.y + b.height / 2;
const shown = (m) => (m && m.visible ? 'shown' : 'not shown');
const nextRow = (items) => items.find((c) => c.box.y > items[0].box.y + 1);
const rowCount = (items) => new Set(items.map((c) => Math.round(c.box.y))).size;
const inside = (inner, outer) =>
  inner.box.y >= outer.box.y - 1 && inner.box.bottom <= outer.box.bottom + 1 ? 'overlays the hero' : 'separate band above the hero';
const lines = (list) => list.map((m) => m.lines);
const imgFit = (i) =>
  i.fit !== 'pattern'
    ? i.fit
    : Math.abs(i.renderedWidth / i.sourceWidth - i.renderedHeight / i.sourceHeight) > 0.002
      ? 'stretched (non-uniform scale)'
      : i.renderedWidth >= i.frameWidth - 0.5 && i.renderedHeight >= i.frameHeight - 0.5
        ? 'cover'
        : 'contain';
const aspect = (i) => i.sourceWidth / i.sourceHeight;

// Positions inside a section are measured from that section's top, so one section
// that is too tall does not turn every element below it into a difference.
const from = (m, s) => m.box.y - s.box.y; // top edge, measured from a section's top
const base = (t, s) => t.firstBaseline - s.box.y; // first text baseline, measured from a section's top

const ICON_IMG = 'UI icon is an <img>; its colour and stroke are inside the image file, not CSS';
const LINE_IMG = 'UI draws this line as an <img>; its colour is inside the image file, not CSS';

module.exports = {
  check, seen, seenBg, angleOf, blurOf, align, centreX, centreY, shown, nextRow, rowCount, inside, lines, imgFit, aspect,
  from, base, ICON_IMG, LINE_IMG,
};
