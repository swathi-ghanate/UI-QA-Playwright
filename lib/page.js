// UI Fidelity QA framework: page definitions.
//
// definePage() fills in a page file from pages/. The minimum is four fields:
//
//   module.exports = { name: 'about', title: 'About', path: '/about', svg: 'about-1440.svg' };
//
// That is enough for audit E (text). Audits A-D also need `elements` and `checks`
// (see pages/home.js and pages/home.checks.js); without them they are skipped, with the reason.

const fs = require('fs');
const path = require('path');
const { pageUrl } = require('./base-url');

// design/: the Figma exports, one SVG per page
const DESIGN_DIR = path.resolve(__dirname, '..', 'design');

function definePage(p) {
  const where = `pages/${p.name || '?'}.js`;
  for (const key of ['name', 'path', 'svg']) {
    if (!p[key]) throw new Error(`${where} is missing "${key}". The minimum is { name, title, path, svg }.`);
  }
  if (!/^[a-z0-9-]+$/.test(p.name)) throw new Error(`${where}: name "${p.name}" must use only a-z, 0-9 and "-" (it becomes a folder name).`);
  const svg = path.resolve(DESIGN_DIR, p.svg);
  if (!fs.existsSync(svg)) throw new Error(`${where}: Figma export not found at ${svg}. Put the SVG in design/.`);

  return {
    title: p.name,
    elements: {},
    sections: [],
    ...p,
    url: pageUrl(p.path),
    design: { svg, width: p.width || 1440 },
    checks: p.checks || null,
  };
}

module.exports = { definePage, DESIGN_DIR };
