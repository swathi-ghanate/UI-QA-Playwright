// UI Fidelity QA framework: browser-side measuring code.
//
// This file is evaluated as a plain string inside the live page AND inside the
// Figma SVG export, so it must stay self-contained browser JavaScript
// (no require, no imports). Everything is exposed on window.__pa:
//   __pa.measure(el)          -> one element, Figma (SVG) or UI (HTML) side
//   __pa.settle(el)           -> waits for running transitions on el
//   __pa.figmaInventory()     -> A1 / C1 style inventory of the SVG
//   __pa.uiInventory()        -> A2 / B2 / C2 page-wide scans of the live page

(() => {
  if (window.__pa) return;

  const XHTML = 'http://www.w3.org/1999/xhtml';
  const r2 = (n) => Math.round(n * 100) / 100;
  const r4 = (n) => Math.round(n * 10000) / 10000;
  const median = (a) => {
    const s = [...a].sort((p, q) => p - q);
    return s.length ? s[Math.floor(s.length / 2)] : null;
  };

  const toBox = (r) => ({
    x: r2(r.left + scrollX),
    y: r2(r.top + scrollY),
    width: r2(r.width),
    height: r2(r.height),
    right: r2(r.right + scrollX),
    bottom: r2(r.bottom + scrollY),
  });
  const union = (boxes) => {
    const b = boxes.filter(Boolean);
    if (!b.length) return null;
    const x = Math.min(...b.map((q) => q.x));
    const y = Math.min(...b.map((q) => q.y));
    const right = Math.max(...b.map((q) => q.right));
    const bottom = Math.max(...b.map((q) => q.bottom));
    return { x: r2(x), y: r2(y), width: r2(right - x), height: r2(bottom - y), right: r2(right), bottom: r2(bottom) };
  };
  const grow = (b, dx, dy) => ({
    x: r2(b.x - dx),
    y: r2(b.y - dy),
    width: r2(b.width + 2 * dx),
    height: r2(b.height + 2 * dy),
    right: r2(b.right + dx),
    bottom: r2(b.bottom + dy),
  });

  // Number of children laid out side by side in the first visual row.
  const firstRowCount = (boxes) => {
    const b = boxes.filter((q) => q && q.width > 0 && q.height > 0).sort((p, q) => p.y - q.y);
    if (!b.length) return 0;
    const limit = b[0].y + b[0].height / 2;
    return b.filter((q) => q.y < limit).length;
  };

  const rgbaWith = (rgb, alpha) => {
    const m = String(rgb).match(/-?[\d.]+/g);
    if (!/^rgba?\(/.test(String(rgb)) || !m || m.length < 3) return rgb;
    const a = (m[3] !== undefined ? +m[3] : 1) * alpha;
    return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${r4(a)})`;
  };
  const isTransparent = (v) =>
    !v || v === 'transparent' || /(?:,|\/)\s*0(?:\.0+)?\s*\)$/.test(v) || v === 'rgba(0, 0, 0, 0)';

  const shortText = (s, n = 200) => (s || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const shortSrc = (s) => (s || '').split('?')[0].split('/').pop();
  const describe = (el) => {
    const t = el.namespaceURI === XHTML ? shortText(el.innerText, 40) : '';
    const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).slice(0, 3).join('.') : '';
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls ? '.' + cls : ''}${t ? ` "${t}"` : ''}`;
  };

  const opacityChain = (el) => {
    let o = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity) || 1;
    return r4(o);
  };

  // ======================= Figma side (SVG export) ===========================
  const SVG_SHAPES = new Set(['rect', 'circle', 'ellipse', 'path', 'line', 'polygon', 'polyline']);
  const urlId = (v) => {
    const m = /url\(\s*["']?#([^"')]+)["']?\s*\)/.exec(v || '');
    return m ? m[1] : null;
  };

  // Fill or stroke of one SVG shape, with fill/stroke-opacity and every
  // ancestor's opacity folded into the colour (what is actually seen).
  function paint(el, which) {
    const cs = getComputedStyle(el);
    const v = cs[which];
    if (!v || v === 'none') return null;
    const alpha = parseFloat(which === 'fill' ? cs.fillOpacity : cs.strokeOpacity) * opacityChain(el);
    const ref = urlId(v);
    return ref ? { ref, alpha } : { color: rgbaWith(v, alpha) };
  }

  function svgGradient(id, shapeEl) {
    const g = document.getElementById(id);
    if (!g || !/Gradient$/.test(g.tagName)) return null;
    if (g.tagName !== 'linearGradient') return { type: g.tagName };
    const num = (a, d) => {
      const v = g.getAttribute(a);
      if (v === null) return d;
      return v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v);
    };
    let x1 = num('x1', 0), y1 = num('y1', 0), x2 = num('x2', 1), y2 = num('y2', 0);
    if (g.getAttribute('gradientUnits') !== 'userSpaceOnUse') {
      const bb = shapeEl.getBBox();
      x1 = bb.x + x1 * bb.width;
      x2 = bb.x + x2 * bb.width;
      y1 = bb.y + y1 * bb.height;
      y2 = bb.y + y2 * bb.height;
    }
    // CSS angle: 0deg points up, 90deg points right.
    const angle = (Math.atan2(x2 - x1, -(y2 - y1)) * 180) / Math.PI;
    const stops = [...g.querySelectorAll('stop')].map((s) => {
      const cs = getComputedStyle(s);
      return { color: rgbaWith(cs.stopColor, parseFloat(cs.stopOpacity)), offset: r4(s.offset.baseVal) };
    });
    return { type: 'linear-gradient', angle: r2((angle + 360) % 360), stops };
  }

  // Image placed through a Figma pattern fill: source size, rendered size, crop.
  function svgPattern(id, frame) {
    const p = document.getElementById(id);
    if (!p || p.tagName !== 'pattern') return null;
    const use = p.querySelector('use');
    if (!use) return null;
    const href = (use.getAttribute('xlink:href') || use.getAttribute('href') || '').replace(/^#/, '');
    const img = document.getElementById(href);
    if (!img) return null;
    const t = use.transform.baseVal.consolidate();
    const m = t ? t.matrix : { a: 1, d: 1, e: 0, f: 0 };
    const unit = p.getAttribute('patternContentUnits') === 'objectBoundingBox';
    const kx = unit ? frame.width : 1;
    const ky = unit ? frame.height : 1;
    const sw = +img.getAttribute('width');
    const sh = +img.getAttribute('height');
    return {
      type: 'image',
      src: img.getAttribute('data-name') || href,
      sourceWidth: sw,
      sourceHeight: sh,
      frameWidth: frame.width,
      frameHeight: frame.height,
      renderedWidth: r2(sw * m.a * kx),
      renderedHeight: r2(sh * m.d * ky),
      offsetX: r2(m.e * kx),
      offsetY: r2(m.f * ky),
      fit: 'pattern',
    };
  }

  // Drop shadow / foreground blur from the nearest Figma filter.
  function svgFilter(el) {
    for (let n = el; n && n.tagName !== 'svg'; n = n.parentElement) {
      const id = urlId(n.getAttribute && n.getAttribute('filter'));
      if (!id) continue;
      const f = document.getElementById(id);
      if (!f) return null;
      const off = f.querySelector('feOffset');
      const blur = f.querySelector('feGaussianBlur');
      const morph = f.querySelector('feMorphology');
      const matrices = f.querySelectorAll('feColorMatrix');
      const colorM = matrices[matrices.length - 1];
      if (off) {
        const v = (colorM ? colorM.getAttribute('values') : '').trim().split(/[\s,]+/).map(Number);
        const color = v.length === 20
          ? `rgba(${Math.round(v[4] * 255)}, ${Math.round(v[9] * 255)}, ${Math.round(v[14] * 255)}, ${r4(v[18])})`
          : null;
        const spread = morph
          ? (morph.getAttribute('operator') === 'erode' ? -1 : 1) * parseFloat(morph.getAttribute('radius'))
          : 0;
        return {
          shadow: {
            x: +(off.getAttribute('dx') || 0),
            y: +(off.getAttribute('dy') || 0),
            blur: 2 * parseFloat(blur ? blur.getAttribute('stdDeviation') : 0),
            spread,
            color,
          },
        };
      }
      if (blur) return { blur: parseFloat(blur.getAttribute('stdDeviation')) };
      return null;
    }
    return null;
  }

  // Live Figma text: styles plus line positions read from the tspan x/y
  // (baselines), never from rendered glyph widths (Inter may not be installed).
  function svgText(el) {
    const cs = getComputedStyle(el);
    const ctm = el.getScreenCTM();
    const lines = [];
    for (const s of el.querySelectorAll('tspan')) {
      const t = s.textContent;
      if (!t.trim()) continue;
      const p = new DOMPoint(+s.getAttribute('x'), +s.getAttribute('y')).matrixTransform(ctm);
      const x = r2(p.x + scrollX);
      const y = r2(p.y + scrollY);
      let line = lines.find((l) => Math.abs(l.y - y) < 0.5);
      if (!line) lines.push((line = { x, y, text: '' }));
      line.text += t;
      line.x = Math.min(line.x, x);
    }
    lines.sort((p, q) => p.y - q.y);
    const pitches = lines.slice(1).map((l, i) => r2(l.y - lines[i].y));
    return {
      text: lines.map((l) => l.text.replace(/\s+/g, ' ').trim()).join(' '),
      color: rgbaWith(cs.fill, parseFloat(cs.fillOpacity) * opacityChain(el)),
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      textTransform: 'none',
      textDecorationLine: el.getAttribute('text-decoration') || 'none',
      lines: lines.length,
      linePitch: pitches.length ? median(pitches) : null,
      firstBaseline: lines.length ? lines[0].y : null,
      lastBaseline: lines.length ? lines[lines.length - 1].y : null,
      textLeft: lines.length ? Math.min(...lines.map((l) => l.x)) : null,
      textAlign: lines.length < 2 ? null : lines.every((l) => Math.abs(l.x - lines[0].x) < 0.5) ? 'left' : 'center',
    };
  }

  // A Figma "component": a group whose direct child shapes are its background
  // and border (Figma exports fill and inside/centre stroke as separate rects),
  // plus the first text inside it as its label.
  function svgMeasure(el) {
    // Inline SVG icons on the live page use the same model, but belong to the UI side.
    const side = document.documentElement.tagName === 'svg' ? 'figma' : 'ui';
    const visible = !el.checkVisibility || el.checkVisibility({ checkVisibilityCSS: true });
    const out = { side, tag: el.tagName, id: el.id || '', visible };
    if (el.tagName === 'text') return Object.assign(out, { box: toBox(el.getBoundingClientRect()) }, svgText(el));

    const shapes = SVG_SHAPES.has(el.tagName) ? [el] : [...el.children].filter((c) => SVG_SHAPES.has(c.tagName));
    const bgEl = shapes.find((s) => paint(s, 'fill'));
    const borderEl = shapes.find((s) => paint(s, 'stroke'));
    const boxes = [];
    if (bgEl) boxes.push(toBox(bgEl.getBoundingClientRect()));
    let strokeWidth = 0;
    if (borderEl) {
      strokeWidth = parseFloat(getComputedStyle(borderEl).strokeWidth) || 1;
      const b = toBox(borderEl.getBoundingClientRect());
      // Lines have butt caps: the stroke only thickens them, it does not lengthen them.
      boxes.push(grow(b, b.height === 0 ? 0 : strokeWidth / 2, b.width === 0 ? 0 : strokeWidth / 2));
    }
    out.box = union(boxes) || toBox(el.getBoundingClientRect());

    const fill = bgEl ? paint(bgEl, 'fill') : null;
    out.backgroundColor = fill && fill.color ? fill.color : 'transparent';
    out.backgroundImage = null;
    if (fill && fill.ref) {
      out.backgroundImage = svgGradient(fill.ref, bgEl) || svgPattern(fill.ref, toBox(bgEl.getBoundingClientRect()));
    }
    const stroke = borderEl ? paint(borderEl, 'stroke') : null;
    out.borderColor = stroke && stroke.color ? stroke.color : 'transparent';
    out.borderWidth = strokeWidth;
    // Radius at the outer edge: a centred stroke adds half its width to the fill's rx
    // (Figma rx 27.25 + 0.75 = 28 on a 56px-tall button).
    const radiusEl = bgEl || borderEl;
    const ownRadius = !radiusEl
      ? 0
      : radiusEl.tagName === 'rect'
        ? +(radiusEl.getAttribute('rx') || 0)
        : radiusEl.tagName === 'circle'
          ? +radiusEl.getAttribute('r')
          : 0;
    const ownWidth = radiusEl ? radiusEl.getBoundingClientRect().width : out.box.width;
    out.radius = r2(ownRadius + Math.max(0, (out.box.width - ownWidth) / 2));
    out.opacity = opacityChain(el);
    Object.assign(out, svgFilter(el) || {});
    const label = el.querySelector('text');
    out.label = label ? svgText(label) : null;
    out.columns = firstRowCount(
      [...el.children].filter((c) => c.tagName === 'g' || SVG_SHAPES.has(c.tagName) || c.tagName === 'text')
        .map((c) => toBox(c.getBoundingClientRect()))
    );
    return out;
  }

  // ========================= UI side (live HTML) =============================
  const CSS_PROPS = [
    'display', 'position', 'top', 'zIndex', 'visibility', 'opacity', 'color', 'backgroundColor', 'backgroundImage',
    'backgroundSize', 'backgroundPosition', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth',
    'borderLeftWidth', 'borderTopStyle', 'borderBottomStyle', 'borderTopColor', 'borderRightColor',
    'borderBottomColor', 'borderLeftColor', 'borderTopLeftRadius', 'boxShadow', 'filter', 'backdropFilter',
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'textDecorationLine',
    'textAlign', 'whiteSpace', 'textOverflow', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems',
    'alignSelf', 'gap', 'rowGap', 'columnGap', 'gridTemplateColumns', 'paddingTop', 'paddingRight',
    'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'width', 'height',
    'maxWidth', 'minHeight', 'overflowX', 'overflowY', 'objectFit', 'objectPosition', 'cursor', 'transition', 'transitionDuration',
    'transform', 'outlineStyle', 'outlineWidth', 'outlineColor', 'outlineOffset',
  ];

  // Font ascent (px) for an element's font, measured once per font with an
  // off-screen probe, so text baselines can be compared with Figma's tspan y.
  const ascentCache = new Map();
  function ascentOf(el) {
    const cs = getComputedStyle(el);
    const key = [cs.fontFamily, cs.fontSize, cs.fontWeight, cs.fontStyle].join('|');
    if (ascentCache.has(key)) return ascentCache.get(key);
    const host = document.createElement('div');
    host.style.cssText =
      'position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;line-height:normal;' +
      `font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};font-style:${cs.fontStyle}`;
    host.appendChild(document.createTextNode('Hx'));
    const mark = document.createElement('span');
    mark.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    host.appendChild(mark);
    document.body.appendChild(host);
    const range = document.createRange();
    range.selectNodeContents(host.firstChild);
    const ascent = mark.getBoundingClientRect().bottom - range.getClientRects()[0].top;
    host.remove();
    ascentCache.set(key, ascent);
    return ascent;
  }

  // Rendered text lines from the text nodes' own boxes (not line-height maths).
  function textInfo(el) {
    const parts = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n && parts.length < 400; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      const pe = n.parentElement;
      if (!pe || (pe.checkVisibility && !pe.checkVisibility({ checkVisibilityCSS: true }))) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      const asc = ascentOf(pe);
      for (const r of range.getClientRects()) {
        if (r.width > 0 && r.height > 0) {
          parts.push({ left: r.left + scrollX, right: r.right + scrollX, baseline: r.top + scrollY + asc });
        }
      }
    }
    const text = shortText(el.innerText);
    if (!parts.length) return { text, lines: 0 };
    const baselines = [];
    for (const p of parts.sort((a, b) => a.baseline - b.baseline)) {
      if (!baselines.length || p.baseline - baselines[baselines.length - 1] > 1) baselines.push(p.baseline);
    }
    const pitches = baselines.slice(1).map((b, i) => r2(b - baselines[i]));
    return {
      text,
      lines: baselines.length,
      linePitch: pitches.length ? median(pitches) : null,
      firstBaseline: r2(baselines[0]),
      lastBaseline: r2(baselines[baselines.length - 1]),
      textLeft: r2(Math.min(...parts.map((p) => p.left))),
      textRight: r2(Math.max(...parts.map((p) => p.right))),
    };
  }

  const sizeCache = new Map();
  const loadSize = (src) => {
    if (!sizeCache.has(src)) {
      sizeCache.set(
        src,
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
          img.onerror = () => resolve(null);
          img.src = src;
        })
      );
    }
    return sizeCache.get(src);
  };

  // Source size, frame, rendered size and crop offset of an <img> or a
  // background image, computed from object-fit / background-size and position.
  async function imageInfo(el, cs) {
    let src, natural, fit, position;
    if (el.tagName === 'IMG') {
      src = el.currentSrc || el.src;
      natural = el.naturalWidth ? { w: el.naturalWidth, h: el.naturalHeight } : null;
      fit = cs.objectFit;
      position = cs.objectPosition;
    } else {
      const m = /url\(["']?([^"')]+)["']?\)/.exec(cs.backgroundImage);
      if (!m) return null;
      src = m[1];
      natural = await loadSize(src);
      fit = cs.backgroundSize;
      position = cs.backgroundPosition;
    }
    const r = el.getBoundingClientRect();
    const W = r2(r.width);
    const H = r2(r.height);
    const info = { type: 'image', src: shortSrc(src), frameWidth: W, frameHeight: H, fit, position };
    if (!natural || !natural.w) return info;
    const { w, h } = natural;
    let sx, sy;
    if (fit === 'cover') sx = sy = Math.max(W / w, H / h);
    else if (fit === 'contain') sx = sy = Math.min(W / w, H / h);
    else if (fit === 'scale-down') sx = sy = Math.min(1, W / w, H / h);
    else if (fit === 'fill') { sx = W / w; sy = H / h; }
    else if (fit === 'none' || fit === 'auto' || fit === 'auto auto') sx = sy = 1;
    else return Object.assign(info, { sourceWidth: w, sourceHeight: h });
    const rw = w * sx;
    const rh = h * sy;
    const pos = String(position).split(/\s+/);
    const offset = (token, free) => {
      if (!token) return free / 2;
      if (token.endsWith('%')) return (free * parseFloat(token)) / 100;
      if (token.endsWith('px')) return parseFloat(token);
      return { left: 0, top: 0, center: free / 2, right: free, bottom: free }[token] ?? free / 2;
    };
    return Object.assign(info, {
      sourceWidth: w,
      sourceHeight: h,
      renderedWidth: r2(rw),
      renderedHeight: r2(rh),
      offsetX: r2(offset(pos[0], W - rw)),
      offsetY: r2(offset(pos[1] || pos[0], H - rh)),
    });
  }

  // The colour actually behind an element's text, or a note that it sits on an image.
  function effectiveBackground(el) {
    let translucent = false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage !== 'none') return { color: cs.backgroundColor, overImage: true };
      if (!isTransparent(cs.backgroundColor)) {
        const m = cs.backgroundColor.match(/[\d.]+/g);
        const a = /^rgba/.test(cs.backgroundColor) && m && m[3] !== undefined ? +m[3] : 1;
        if (a >= 0.99) return { color: cs.backgroundColor, overImage: false, translucent };
        translucent = true;
      }
    }
    return { color: 'rgb(255, 255, 255)', overImage: false, translucent };
  }

  async function cssMeasure(el) {
    const cs = getComputedStyle(el);
    const out = {
      side: 'ui',
      tag: el.tagName,
      id: el.id || '',
      className: typeof el.className === 'string' ? el.className.replace(/\s+/g, ' ').trim().slice(0, 160) : '',
      box: toBox(el.getBoundingClientRect()),
      visible: el.checkVisibility ? el.checkVisibility({ checkVisibilityCSS: true }) : el.getClientRects().length > 0,
    };
    for (const p of CSS_PROPS) out[p] = cs[p];
    out.opacityChain = opacityChain(el);
    Object.assign(out, textInfo(el));
    out.columns = firstRowCount(
      [...el.children]
        .filter((c) => !['absolute', 'fixed'].includes(getComputedStyle(c).position))
        .map((c) => toBox(c.getBoundingClientRect()))
    );
    out.image = await imageInfo(el, cs);
    out.effectiveBackground = effectiveBackground(el);
    out.href = el.getAttribute('href');
    out.ariaCurrent = el.getAttribute('aria-current');
    out.disabled = 'disabled' in el ? Boolean(el.disabled) : false;
    out.ariaDisabled = el.getAttribute('aria-disabled');
    return out;
  }

  async function measure(el) {
    return el.namespaceURI === XHTML ? cssMeasure(el) : svgMeasure(el);
  }

  async function settle(el) {
    const anims = el.getAnimations ? el.getAnimations({ subtree: true }) : [];
    await Promise.race([
      Promise.all(anims.map((a) => a.finished.catch(() => null))),
      new Promise((r) => setTimeout(r, 2000)),
    ]);
    await new Promise((r) => requestAnimationFrame(() => r()));
  }

  // ===================== Inventories (whole-document scans) ==================
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());

  // A1 / C1: what the Figma file contains, grouped by category with "used on".
  function figmaInventory() {
    const root = document.documentElement;
    const all = [...root.querySelectorAll('*')].filter(
      (e) => !e.closest('defs, clipPath, mask, pattern, filter, linearGradient, radialGradient')
    );
    const top = (el) => {
      const names = [];
      for (let n = el.parentElement; n && n !== root; n = n.parentElement) if (n.id) names.unshift(n.id);
      return names.slice(1, 3).join(' › ') || el.id || el.tagName;
    };
    const bump = (map, key, base, where) => {
      if (!map.has(key)) map.set(key, Object.assign({ count: 0, usedOn: [] }, base));
      const e = map.get(key);
      e.count++;
      if (where && !e.usedOn.includes(where) && e.usedOn.length < 6) e.usedOn.push(where);
    };

    const colors = new Map();
    const textStyles = new Map();
    const radii = new Map();
    const strokes = new Map();
    const effects = new Map();
    const gradients = new Map();
    const images = [];

    for (const el of all) {
      if (el.namespaceURI === XHTML) {
        const bf = getComputedStyle(el).backdropFilter;
        if (bf && bf !== 'none') bump(effects, `backdrop-filter ${bf}`, { type: 'backdrop-filter', value: bf }, top(el));
        continue;
      }
      if (el.tagName === 'text') {
        const t = svgText(el);
        bump(colors, `text|${t.color}`, { role: 'text', color: t.color }, el.id || top(el));
        const key = [t.fontFamily, t.fontSize, t.fontWeight, t.letterSpacing, t.textDecorationLine].join('|');
        bump(
          textStyles,
          key,
          { fontFamily: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, letterSpacing: t.letterSpacing,
            textDecorationLine: t.textDecorationLine, colors: [], linePitches: [] },
          (el.id || t.text).slice(0, 40)
        );
        const s = textStyles.get(key);
        if (!s.colors.includes(t.color)) s.colors.push(t.color);
        if (t.linePitch && !s.linePitches.includes(t.linePitch)) s.linePitches.push(t.linePitch);
        continue;
      }
      if (!SVG_SHAPES.has(el.tagName)) continue;
      const where = top(el);
      const fill = paint(el, 'fill');
      const stroke = paint(el, 'stroke');
      if (fill && fill.color) bump(colors, `fill|${fill.color}`, { role: 'fill', color: fill.color }, where);
      if (fill && fill.ref) {
        const g = svgGradient(fill.ref, el);
        if (g && g.type === 'linear-gradient') bump(gradients, fill.ref, { id: fill.ref, ...g }, where);
        const img = svgPattern(fill.ref, toBox(el.getBoundingClientRect()));
        if (img) images.push(Object.assign({ usedOn: where }, img));
      }
      if (stroke && stroke.color) {
        bump(colors, `stroke|${stroke.color}`, { role: 'stroke', color: stroke.color }, where);
        const w = getComputedStyle(el).strokeWidth;
        bump(strokes, w, { width: w }, where);
      }
      // Filled rects only: Figma exports an inside stroke as a second rect with rx - 0.5.
      if (el.tagName === 'rect' && fill && +el.getAttribute('rx') > 0) {
        const r = el.getBoundingClientRect();
        const rx = +el.getAttribute('rx');
        const full = rx >= Math.min(r.width, r.height) / 2 - 0.5;
        bump(radii, `${rx}${full ? ' (full)' : ''}`, { radius: rx, full }, where);
      }
    }
    for (const el of root.querySelectorAll('[filter]')) {
      const fx = svgFilter(el);
      const where = el.id || top(el);
      if (fx && fx.shadow) bump(effects, `shadow ${JSON.stringify(fx.shadow)}`, { type: 'drop-shadow', value: fx.shadow }, where);
      if (fx && fx.blur) bump(effects, `blur ${fx.blur}`, { type: 'layer blur (stdDeviation)', value: fx.blur }, where);
    }
    const list = (m) => [...m.values()].sort((a, b) => b.count - a.count);
    return {
      file: {
        width: +root.getAttribute('width'),
        height: +root.getAttribute('height'),
        liveTextElements: root.querySelectorAll('text').length,
        paths: root.querySelectorAll('path').length,
        images: root.querySelectorAll('image').length,
        filters: root.querySelectorAll('filter').length,
        gradients: root.querySelectorAll('linearGradient, radialGradient').length,
        topLevelGroups: [...root.querySelectorAll(':scope > g > g')].map((g) => ({ id: g.id, box: toBox(g.getBoundingClientRect()) })),
        stateLayerNames: [...root.querySelectorAll('[id]')]
          .map((e) => e.id)
          .filter((id) => /\b(hover|focus|pressed|active|disabled|error|loading|selected|state)\b/i.test(id)),
      },
      colors: list(colors),
      textStyles: list(textStyles),
      radii: list(radii),
      strokes: list(strokes),
      effects: list(effects),
      gradients: list(gradients),
      images,
    };
  }

  // A2 / B2 / C2: page-wide scans of the live page at the current viewport.
  function uiInventory() {
    const els = [...document.body.querySelectorAll('*')].filter(
      (e) => !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'LINK', 'META'].includes(e.tagName) &&
        (!e.checkVisibility || e.checkVisibility({ checkVisibilityCSS: true }))
    );
    const bump = (map, key, base, el) => {
      if (!map.has(key)) map.set(key, Object.assign({ count: 0, examples: [] }, base));
      const e = map.get(key);
      e.count++;
      if (el && e.examples.length < 4) e.examples.push(describe(el));
    };
    const list = (m) => [...m.values()].sort((a, b) => b.count - a.count);

    // ---- colours, typography, radii, shadows ----
    const colors = new Map();
    const type = new Map();
    const radii = new Map();
    const shadows = new Map();
    for (const el of els) {
      const cs = getComputedStyle(el);
      const html = el.namespaceURI === XHTML;
      if (html && ownText(el)) {
        bump(colors, `text|${cs.color}`, { role: 'text', value: cs.color }, el);
        const key = [cs.fontFamily, cs.fontSize, cs.fontWeight, cs.lineHeight, cs.letterSpacing, cs.textTransform].join('|');
        bump(type, key, {
          fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing, textTransform: cs.textTransform, tags: [], colors: [],
        }, el);
        const t = type.get(key);
        if (!t.tags.includes(el.tagName)) t.tags.push(el.tagName);
        if (!t.colors.includes(cs.color)) t.colors.push(cs.color);
      }
      if (html && !isTransparent(cs.backgroundColor)) bump(colors, `background|${cs.backgroundColor}`, { role: 'background', value: cs.backgroundColor }, el);
      if (html) {
        const seen = new Set();
        for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
          const c = cs[`border${side}Color`];
          if (parseFloat(cs[`border${side}Width`]) > 0 && cs[`border${side}Style`] !== 'none' && !seen.has(c)) {
            seen.add(c);
            bump(colors, `border|${c}`, { role: 'border', value: c }, el);
          }
        }
        const rad = cs.borderTopLeftRadius;
        if (rad && rad !== '0px') {
          const r = el.getBoundingClientRect();
          const full = parseFloat(rad) >= Math.min(r.width, r.height) / 2 - 0.5;
          bump(radii, full ? 'full' : rad, { value: full ? 'full (pill / circle)' : rad }, el);
        }
        if (cs.boxShadow !== 'none') {
          const visibleLayers = cs.boxShadow.split(/,(?![^(]*\))/).filter((l) => !/rgba\([^)]*,\s*0\)/.test(l)).join(',').trim();
          if (visibleLayers) bump(shadows, visibleLayers, { value: visibleLayers }, el);
        }
      } else if (SVG_SHAPES.has(el.tagName)) {
        if (cs.fill !== 'none' && !urlId(cs.fill)) bump(colors, `svg fill|${cs.fill}`, { role: 'svg fill', value: cs.fill }, el.closest('svg'));
        if (cs.stroke !== 'none' && !urlId(cs.stroke)) bump(colors, `svg stroke|${cs.stroke}`, { role: 'svg stroke', value: cs.stroke }, el.closest('svg'));
      }
    }

    // ---- icons ----
    const icons = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const small = r.width > 0 && r.height > 0 && r.width <= 64 && r.height <= 64;
      const isSvg = el.tagName === 'svg' && !el.parentElement.closest('svg');
      const isImg = el.tagName === 'IMG';
      const isIconSpan = el.namespaceURI === XHTML && /icon/i.test(typeof el.className === 'string' ? el.className : '');
      if (!small || !(isSvg || isImg || isIconSpan)) continue;
      const cs = getComputedStyle(el);
      const shape = isSvg ? el.querySelector('path, circle, rect, line, polyline, polygon') : null;
      const scs = shape ? getComputedStyle(shape) : null;
      icons.push({
        type: isSvg ? 'inline SVG' : isImg ? 'img' : 'styled span',
        width: r2(r.width),
        height: r2(r.height),
        color: cs.color,
        fill: scs ? scs.fill : '',
        stroke: scs ? scs.stroke : '',
        strokeWidth: scs ? scs.strokeWidth : '',
        background: isTransparent(cs.backgroundColor) ? '' : cs.backgroundColor,
        src: isImg ? shortSrc(el.currentSrc || el.src) : '',
        where: describe(el.closest('header, section, footer, nav') || el),
      });
    }

    // ---- tokens: CSS custom properties and hard-coded (arbitrary) classes ----
    const custom = new Map();
    const blocked = [];
    const media = new Set();
    const walkRules = (rules) => {
      for (const r of rules) {
        if (r.media && r.conditionText !== undefined) media.add(r.conditionText);
        if (r.style) {
          for (const name of r.style) {
            if (name.startsWith('--') && !custom.has(name)) {
              custom.set(name, { name, value: r.style.getPropertyValue(name).trim(), selector: r.selectorText || '' });
            }
          }
        }
        if (r.cssRules) walkRules(r.cssRules);
      }
    };
    for (const s of document.styleSheets) {
      try {
        walkRules(s.cssRules);
      } catch (e) {
        blocked.push(s.href);
      }
    }
    const arbitrary = new Map();
    let classTokens = 0;
    for (const el of document.querySelectorAll('[class]')) {
      if (typeof el.className !== 'string') continue;
      for (const c of el.classList) {
        classTokens++;
        if (/-\[[^\]]+\]/.test(c)) arbitrary.set(c, (arbitrary.get(c) || 0) + 1);
      }
    }

    // ---- layout: sections, flex/grid containers, DOM vs visual order ----
    const blocks = [...document.querySelectorAll('header, nav, main, section, footer')].filter(
      (e) => !e.parentElement.closest('header, nav, main, section, footer') ||
        e.tagName === 'HEADER' || e.tagName === 'NAV'
    );
    const layoutOf = (el) => {
      const cs = getComputedStyle(el);
      return {
        el: describe(el),
        box: toBox(el.getBoundingClientRect()),
        visible: !el.checkVisibility || el.checkVisibility({ checkVisibilityCSS: true }),
        display: cs.display,
        position: cs.position,
        flexDirection: cs.flexDirection,
        gridTemplateColumns: cs.gridTemplateColumns,
        gap: cs.gap,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        textAlign: cs.textAlign,
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        margin: `${cs.marginTop} ${cs.marginRight} ${cs.marginBottom} ${cs.marginLeft}`,
        maxWidth: cs.maxWidth,
        background: cs.backgroundColor,
        columns: firstRowCount([...el.children]
          .filter((c) => !['absolute', 'fixed'].includes(getComputedStyle(c).position))
          .map((c) => toBox(c.getBoundingClientRect()))),
      };
    };
    const containers = els
      .filter((e) => e.namespaceURI === XHTML && /flex|grid/.test(getComputedStyle(e).display) && e.getBoundingClientRect().width >= 120)
      .slice(0, 120)
      .map(layoutOf);
    const orderIssues = [];
    const checkOrder = (parent) => {
      const kids = [...parent.children].filter((c) => {
        const cs = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && !['absolute', 'fixed'].includes(cs.position);
      });
      const visual = [...kids].sort((a, b) => {
        const p = a.getBoundingClientRect();
        const q = b.getBoundingClientRect();
        return Math.abs(p.top - q.top) > 2 ? p.top - q.top : p.left - q.left;
      });
      kids.forEach((k, i) => {
        if (visual[i] !== k) orderIssues.push({ parent: describe(parent), domIndex: i, el: describe(k), visualIndex: visual.indexOf(k) });
      });
    };
    for (const e of els.filter((e) => e.namespaceURI === XHTML && e.children.length > 1)) checkOrder(e);

    // ---- responsive: breakpoints, hidden/shown, overflow, truncation, overlap ----
    const breakpoints = [...media].map((m) => ({ query: m, active: matchMedia(m).matches }));
    const responsiveClass = /(^|:)(hidden|block|flex|grid|inline|inline-flex|inline-block)$/;
    const toggled = [...document.querySelectorAll('[class]')]
      .filter((e) => typeof e.className === 'string' && [...e.classList].some((c) => /^(sm|md|lg|xl|2xl):/.test(c) && responsiveClass.test(c) || c === 'hidden'))
      .slice(0, 60)
      .map((e) => ({
        el: describe(e),
        classes: [...e.classList].filter((c) => responsiveClass.test(c)).join(' '),
        display: getComputedStyle(e).display,
        visible: !e.checkVisibility || e.checkVisibility({ checkVisibilityCSS: true }),
      }));
    const vw = document.documentElement.clientWidth;
    const clipped = (el) => {
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (/hidden|clip/.test(cs.overflowX) && n.getBoundingClientRect().right <= vw + 1) return true;
      }
      return false;
    };
    const offenders = els
      .filter((e) => e.namespaceURI === XHTML && e.getBoundingClientRect().right > vw + 1 && !clipped(e))
      .slice(0, 20)
      .map((e) => ({ el: describe(e), right: r2(e.getBoundingClientRect().right) }));
    const truncated = els
      .filter((e) => {
        if (e.namespaceURI !== XHTML || !ownText(e)) return false;
        const cs = getComputedStyle(e);
        const clampedLines = cs.webkitLineClamp && cs.webkitLineClamp !== 'none' && e.scrollHeight > e.clientHeight + 1;
        const cutX = /hidden|clip/.test(cs.overflowX) && e.scrollWidth > e.clientWidth + 1;
        return clampedLines || cutX || (cs.textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth + 1);
      })
      .slice(0, 20)
      .map((e) => describe(e));
    const overlaps = [];
    for (const parent of els.filter((e) => e.namespaceURI === XHTML && e.children.length > 1)) {
      const kids = [...parent.children].filter((c) => {
        const cs = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && ['static', 'relative', 'sticky'].includes(cs.position) &&
          (!c.checkVisibility || c.checkVisibility({ checkVisibilityCSS: true }));
      });
      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const a = kids[i].getBoundingClientRect();
          const b = kids[j].getBoundingClientRect();
          const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (w > 1 && h > 1 && overlaps.length < 20) overlaps.push({ a: describe(kids[i]), b: describe(kids[j]), overlap: `${r2(w)}x${r2(h)}` });
        }
      }
    }

    return {
      page: {
        url: location.href,
        title: document.title,
        viewport: { width: innerWidth, height: innerHeight },
        clientWidth: vw,
        document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
        bodyMaxWidth: getComputedStyle(document.body).maxWidth,
        rootFontSize: getComputedStyle(document.documentElement).fontSize,
      },
      colors: list(colors),
      typography: list(type),
      radii: list(radii),
      shadows: list(shadows),
      icons,
      tokens: {
        customProperties: [...custom.values()],
        blockedStylesheets: blocked,
        arbitraryClasses: [...arbitrary.entries()].sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count })),
        classTokens,
      },
      blocks: blocks.map(layoutOf),
      containers,
      orderIssues: orderIssues.slice(0, 40),
      breakpoints,
      toggled,
      overflow: {
        horizontalScroll: document.documentElement.scrollWidth > vw,
        documentWidth: document.documentElement.scrollWidth,
        offenders,
      },
      truncated,
      overlaps,
      images: [],
    };
  }

  async function uiImages() {
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      if (el.checkVisibility && !el.checkVisibility({ checkVisibilityCSS: true })) continue;
      const cs = getComputedStyle(el);
      if (el.tagName !== 'IMG' && !/url\(/.test(cs.backgroundImage)) continue;
      const info = await imageInfo(el, cs);
      if (info) out.push(Object.assign({ el: describe(el) }, info));
    }
    return out;
  }

  window.__pa = { measure, settle, figmaInventory, uiInventory, uiImages };
})();
