// UI Fidelity QA framework: comparison rules.
//
// Implements the rules written into prompts A3, B3, C3 and D3:
//   - differences under 1px count as matches
//   - equivalent colour notations count as matches (#FFF = #FFFFFF = rgb(255, 255, 255) = oklab(...))
//   - a difference is reported only when BOTH values exist; anything else goes
//     to "Could not verify" with the reason
//   - pixel-fidelity score = matched checks / (matched + different checks)

// ---------- small helpers ----------
const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
const fmt = (n) => String(round(n));
const clamp255 = (n) => Math.max(0, Math.min(255, n));

const toNum = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

// Split on commas that are not inside parentheses.
function splitTop(s) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// ---------- colours ----------
const NAMED = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  red: [255, 0, 0],
  blue: [0, 0, 255],
  green: [0, 128, 0],
};
const COLOR_RE = /(rgba?\([^)]*\)|oklab\([^)]*\)|oklch\([^)]*\)|color\([^)]*\)|#[0-9a-f]{3,8}\b|\b(?:transparent|white|black)\b)/i;

function oklabToRgb(L, A, B) {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const [r, g, b] = lin.map((x) => clamp255(255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055)));
  return { r, g, b };
}

function parseColor(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'object') return 'r' in v ? v : null;
  const s = String(v).trim().toLowerCase();
  if (!s || s === 'none') return null;
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (NAMED[s]) return { r: NAMED[s][0], g: NAMED[s][1], b: NAMED[s][2], a: 1 };
  let m = /^#([0-9a-f]{3,8})$/.exec(s);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = h.split('').map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? round(n(6) / 255, 4) : 1 };
  }
  m = /^(rgba?|oklab|oklch|color)\((.*)\)$/.exec(s);
  if (!m) return null;
  const fn = m[1];
  let body = m[2].trim();
  let space = '';
  if (fn === 'color') {
    space = body.split(/\s+/)[0];
    body = body.slice(space.length).trim();
  }
  const slash = body.split('/');
  let parts = slash[0].split(/[\s,]+/).filter(Boolean);
  let alpha = slash.length > 1 ? slash[1].trim() : null;
  if (fn.startsWith('rgb') && parts.length === 4 && alpha === null) {
    alpha = parts[3];
    parts = parts.slice(0, 3);
  }
  const num = (t, scale) => {
    const n = t.endsWith('%') ? (parseFloat(t) / 100) * scale : parseFloat(t);
    return Number.isFinite(n) ? n : 0; // CSS "none" components count as 0
  };
  const a = alpha === null ? 1 : num(alpha, 1);
  if (fn.startsWith('rgb')) return { r: clamp255(num(parts[0], 255)), g: clamp255(num(parts[1], 255)), b: clamp255(num(parts[2], 255)), a };
  if (fn === 'color') {
    if (space !== 'srgb') return null;
    return { r: clamp255(num(parts[0], 1) * 255), g: clamp255(num(parts[1], 1) * 255), b: clamp255(num(parts[2], 1) * 255), a };
  }
  const L = num(parts[0], 1);
  let A;
  let B;
  if (fn === 'oklab') {
    A = num(parts[1], 0.4);
    B = num(parts[2], 0.4);
  } else {
    const C = num(parts[1], 0.4);
    const H = (num(parts[2], 1) * Math.PI) / 180;
    A = C * Math.cos(H);
    B = C * Math.sin(H);
  }
  return { ...oklabToRgb(L, A, B), a };
}

function colorText(c) {
  if (!c) return 'none';
  if (c.a === 0) return 'transparent';
  const hex = '#' + [c.r, c.g, c.b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('').toUpperCase();
  return c.a < 1 ? `${hex} @${round(c.a, 3)}` : hex;
}

function sameColor(p, q) {
  if (p.a === 0 && q.a === 0) return true;
  return (
    Math.abs(p.r - q.r) <= 1 && Math.abs(p.g - q.g) <= 1 && Math.abs(p.b - q.b) <= 1 && Math.abs(p.a - q.a) <= 0.01
  );
}

// Colour with an extra opacity folded in (e.g. text colour x element opacity).
function withOpacity(color, opacity) {
  const c = parseColor(color);
  const o = toNum(opacity);
  return c && o !== null ? { ...c, a: round(c.a * o, 4) } : c;
}

// Plain RGB distance, used only to list near-duplicate colours in A1 / A2.
const colorDistance = (p, q) => Math.sqrt((p.r - q.r) ** 2 + (p.g - q.g) ** 2 + (p.b - q.b) ** 2);

// ---------- shadows ----------
function parseShadows(v) {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return v;
  if (typeof v === 'object') {
    return [{ x: +v.x, y: +v.y, blur: +v.blur, spread: +v.spread, color: parseColor(v.color), inset: false }];
  }
  const s = String(v).trim();
  if (s === 'none') return [];
  return splitTop(s)
    .map((layer) => {
      const cm = COLOR_RE.exec(layer);
      const color = cm ? parseColor(cm[1]) : { r: 0, g: 0, b: 0, a: 1 };
      const rest = cm ? layer.replace(cm[1], ' ') : layer;
      const nums = (rest.match(/-?[\d.]+(?=px|\s|$)/g) || []).map(parseFloat);
      return { x: nums[0] || 0, y: nums[1] || 0, blur: nums[2] || 0, spread: nums[3] || 0, color, inset: /\binset\b/.test(rest) };
    })
    .filter((l) => l.color && l.color.a > 0 && (l.x || l.y || l.blur || l.spread));
}
const shadowText = (list) =>
  !list.length ? 'none' : list.map((l) => `${l.inset ? 'inset ' : ''}${fmt(l.x)}px ${fmt(l.y)}px ${fmt(l.blur)}px ${fmt(l.spread)}px ${colorText(l.color)}`).join(', ');
const sameShadows = (p, q) =>
  p.length === q.length &&
  p.every((l, i) => ['x', 'y', 'blur', 'spread'].every((k) => Math.abs(l[k] - q[i][k]) < 1) && sameColor(l.color, q[i].color) && l.inset === q[i].inset);

// ---------- gradients ----------
const ANGLE_WORDS = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270 };

function parseGradient(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'object') {
    return v.type === 'linear-gradient' ? { angle: v.angle, stops: v.stops.map((s) => ({ color: parseColor(s.color), offset: s.offset })) } : null;
  }
  const s = String(v);
  const start = s.indexOf('linear-gradient(');
  if (start < 0) return null;
  let depth = 0;
  let body = '';
  for (let i = start + 'linear-gradient('.length; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    if (ch === ')') {
      if (depth === 0) break;
      depth--;
    }
    body += ch;
  }
  const parts = splitTop(body);
  let angle = 180;
  const head = parts[0].replace(/\bin\s+[a-z-]+(\s+(shorter|longer|increasing|decreasing)\s+hue)?/i, '').trim();
  if (!COLOR_RE.test(parts[0])) {
    const deg = /^(-?[\d.]+)(deg|turn|rad)$/.exec(head);
    if (deg) angle = deg[2] === 'turn' ? +deg[1] * 360 : deg[2] === 'rad' ? (+deg[1] * 180) / Math.PI : +deg[1];
    else if (ANGLE_WORDS[head] !== undefined) angle = ANGLE_WORDS[head];
    parts.shift();
  }
  const stops = parts.map((p) => {
    const cm = COLOR_RE.exec(p);
    const pos = cm ? /(-?[\d.]+)%/.exec(p.replace(cm[1], '')) : null;
    return { color: cm ? parseColor(cm[1]) : null, offset: pos ? +pos[1] / 100 : null };
  });
  stops.forEach((st, i) => {
    if (st.offset === null) st.offset = stops.length === 1 ? 0 : i / (stops.length - 1);
  });
  return { angle: round(((angle % 360) + 360) % 360), stops };
}
const gradientText = (g) =>
  `${fmt(g.angle)}deg: ${g.stops.map((s) => `${colorText(s.color)} ${Math.round(s.offset * 100)}%`).join(', ')}`;
const sameGradient = (p, q) =>
  p.stops.length === q.stops.length &&
  p.stops.every((s, i) => s.color && q.stops[i].color && sameColor(s.color, q.stops[i].color) && Math.abs(s.offset - q.stops[i].offset) <= 0.02);

// ---------- value kinds ----------
const weightOf = (v) => {
  const s = String(v).trim().toLowerCase();
  return { normal: 400, bold: 700 }[s] ?? toNum(s);
};
const familyOf = (v) => (v ? String(v).split(',')[0].replace(/["']/g, '').trim() : null);

const KINDS = {
  color: { norm: parseColor, same: sameColor, text: colorText },
  px: { norm: toNum, same: (a, b) => Math.abs(a - b) < 1, text: (v) => `${fmt(v)}px` },
  num: { norm: toNum, same: (a, b, c) => Math.abs(a - b) <= (c.tol || 0), text: fmt },
  text: { norm: (v) => String(v).trim(), same: (a, b) => a === b, text: (v) => v },
  weight: { norm: weightOf, same: (a, b) => a === b, text: String },
  family: { norm: familyOf, same: (a, b) => a.toLowerCase() === b.toLowerCase(), text: (v) => v },
  radius: {
    norm: (v) => (v === 'full' ? 'full' : toNum(v)),
    same: (a, b) => (a === 'full' || b === 'full' ? a === b : Math.abs(a - b) < 1),
    text: (v) => (v === 'full' ? 'fully rounded' : `${fmt(v)}px`),
  },
  shadow: { norm: parseShadows, same: sameShadows, text: shadowText },
  gradient: {
    // "none" (no gradient at all) is a real value, so it is reported as a difference.
    norm: (v) => (v === 'none' || (typeof v === 'string' && !v.includes('gradient(')) ? { angle: null, stops: [] } : parseGradient(v)),
    same: sameGradient,
    text: (g) => (g.stops.length ? gradientText(g) : 'none'),
  },
  list: {
    norm: (v) => (Array.isArray(v) ? v.map(String) : null),
    same: (a, b) => a.join('|') === b.join('|'),
    text: (v) => `[${v.join(', ')}]`,
  },
};

// ---------- helpers for check definitions ----------
class NotAvailable {
  constructor(reason) {
    this.reason = reason;
  }
}
const NA = (reason) => new NotAvailable(reason);

// Letter-spacing in px ("normal" and "0em" are 0).
const ls = (v, fontSize) => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (s === 'normal') return 0;
  if (s.endsWith('em')) return parseFloat(s) * (toNum(fontSize) || 0);
  return toNum(s);
};

// Corner radius as a number, or 'full' when it fully rounds the shorter side
// (Figma rx 24 on a 48px button and CSS 9999px on a 42px button are both "full").
const radiusOf = (m) => {
  if (!m || !m.box) return null;
  const r = m.radius !== undefined ? m.radius : toNum(m.borderTopLeftRadius);
  if (r === null || r === undefined) return null;
  return r >= Math.min(m.box.width, m.box.height) / 2 - 0.5 ? 'full' : r;
};

// ---------- running checks ----------
const SEVERITY_RANK = { Blocker: 0, Major: 1, Minor: 2 };

function defaultSeverity(kind, f, u) {
  if (['text', 'list', 'color', 'weight', 'family'].includes(kind)) return 'Major';
  if (kind === 'px' || kind === 'num') return Math.abs(f - u) >= 8 ? 'Major' : 'Minor';
  return 'Minor';
}

function read(fn, snap, side, defs) {
  const used = new Set();
  if (typeof fn !== 'function') return { used: [], na: side === 'figma' ? 'Not specified' : 'Not verified' };
  const proxy = new Proxy(snap || {}, {
    get(t, k) {
      if (typeof k === 'string') used.add(k);
      return t[k];
    },
  });
  let v;
  let error = null;
  try {
    v = fn(proxy);
  } catch (e) {
    error = e;
  }
  const names = [...used].filter((k) => defs[k]);
  if (v instanceof NotAvailable) return { used: names, na: v.reason };
  if (v === undefined || v === null || (typeof v === 'number' && !Number.isFinite(v))) {
    const missing = names.filter((k) => !snap || snap[k] == null || (Array.isArray(snap[k]) && !snap[k].length));
    const who = side === 'figma' ? 'Figma layer' : 'UI element';
    const na = missing.length
      ? `${who} not found: ${missing.map((k) => `${k} → ${defs[k][side]}`).join(', ')}`
      : side === 'figma'
        ? 'Not specified in the Figma export'
        : `Not verified (value not observable${error ? `: ${error.message}` : ''})`;
    return { used: names, na };
  }
  return { used: names, value: v };
}

// checks: [{ cat, el, prop, kind, figma: (d) => ..., ui: (u) => ..., severity?, confidence?, fix?, note?, tol?, state?, viewport? }]
function runChecks(audit, checks, figma, ui, defs = {}) {
  return checks.map((c, i) => {
    const kindName = c.kind || 'px';
    const kind = KINDS[kindName];
    const f = read(c.figma, figma, 'figma', defs);
    const u = read(c.ui, ui, 'ui', defs);
    const fv = f.na ? null : kind.norm(f.value);
    const uv = u.na ? null : kind.norm(u.value);
    if (!f.na && fv === null) f.na = `could not read value ${JSON.stringify(f.value)}`;
    if (!u.na && uv === null) u.na = `could not read value ${JSON.stringify(u.value)}`;
    const r = {
      id: `${audit}${i + 1}`,
      audit,
      category: c.cat || '',
      element: c.el,
      property: c.prop,
      state: c.state || 'Default',
      viewport: c.viewport || '',
      kind: kindName,
      figmaText: f.na ? '—' : kind.text(fv),
      uiText: u.na ? '—' : kind.text(uv),
      figmaSelectors: f.used.map((k) => defs[k].figma).filter(Boolean),
      uiSelectors: u.used.map((k) => defs[k].ui).filter(Boolean),
      note: c.note || '',
      confidence: c.confidence || 'High',
    };
    if (f.na || u.na) {
      r.status = 'unverified';
      r.reason = [f.na && `Figma: ${f.na}`, u.na && `UI: ${u.na}`].filter(Boolean).join('; ');
      return r;
    }
    r.status = kind.same(fv, uv, c) ? 'match' : 'differ';
    if (r.status === 'differ') {
      r.delta = (kindName === 'px' || kindName === 'num') ? round(uv - fv) : null;
      r.severity = c.severity || defaultSeverity(kindName, fv, uv);
      r.fix =
        typeof c.fix === 'function'
          ? c.fix(r.figmaText, r.uiText, fv, uv)
          : c.fix ||
            (kindName === 'px'
              ? `Change ${c.prop} from ${r.uiText} to ${r.figmaText}`
              : `Set ${c.prop} to ${r.figmaText} (now ${r.uiText})`);
    }
    return r;
  });
}

function score(results) {
  const matched = results.filter((r) => r.status === 'match').length;
  const differ = results.filter((r) => r.status === 'differ').length;
  const unverified = results.filter((r) => r.status === 'unverified').length;
  const verifiable = matched + differ;
  return { matched, differ, unverified, verifiable, pct: verifiable ? round((matched / verifiable) * 100, 1) : null };
}

// Most severe first; within a severity, structure (columns, wrapping, labels) before
// colour and type, before pixel sizes, so a root cause ranks above the sizes it moves.
const KIND_RANK = { text: 0, list: 0, num: 0, color: 1, weight: 1, family: 1 };
const prioritised = (results) =>
  results
    .filter((r) => r.status === 'differ')
    .sort(
      (p, q) =>
        SEVERITY_RANK[p.severity] - SEVERITY_RANK[q.severity] ||
        (KIND_RANK[p.kind] ?? 2) - (KIND_RANK[q.kind] ?? 2) ||
        Math.abs(q.delta || 0) - Math.abs(p.delta || 0)
    );

module.exports = {
  NA,
  ls,
  radiusOf,
  withOpacity,
  parseColor,
  colorText,
  colorDistance,
  parseShadows,
  shadowText,
  parseGradient,
  gradientText,
  toNum,
  round,
  runChecks,
  score,
  prioritised,
};
