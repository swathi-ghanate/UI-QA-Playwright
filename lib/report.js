// UI Fidelity QA framework: writing the outputs.
//
// Every prompt step writes Markdown (to read) and JSON (to re-use) into
// reports/<page>/details/ and attaches the Markdown to the Playwright report.
// comparisonMarkdown() lays out A3 / B3 / C3 / D3 / E exactly as those prompts ask:
// matches, differences table, required changes, could not verify, score, top 5, DevTools list.
// lib/html-report.js turns the *-result.json files into reports/<page>/report.html.

const fs = require('fs');
const path = require('path');
const { expect } = require('@playwright/test');
const { score, prioritised } = require('./rules');

// reports/<page>/report.html (written by html-report.js), reports/<page>/details/ (written here)
const OUT_ROOT = path.join(__dirname, '..', 'reports');

// ---------- markdown helpers ----------
const cell = (v) =>
  v === null || v === undefined || v === '' ? '—' : String(v).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

function table(headers, rows) {
  if (!rows.length) return '_None._\n';
  return (
    [
      `| ${headers.join(' | ')} |`,
      `|${headers.map(() => '---').join('|')}|`,
      ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
    ].join('\n') + '\n'
  );
}

const bullets = (items) => (items.length ? items.map((i) => `- ${i}`).join('\n') + '\n' : '_None._\n');
const numbered = (items) => (items.length ? items.map((i, n) => `${n + 1}. ${i}`).join('\n') + '\n' : '_None._\n');

function header(code, title, pageDef, extra = []) {
  return [
    `# ${code}: ${title}`,
    '',
    `- **Page:** ${pageDef.title} (${pageDef.url})`,
    `- **Figma export:** design/${path.basename(pageDef.design.svg)}`,
    ...extra.map((e) => `- ${e}`),
    `- **Generated:** ${new Date().toISOString()} by the UI Fidelity QA framework (Playwright, Chromium)`,
    '',
  ].join('\n');
}

// ---------- saving ----------
function outDir(pageDef) {
  const dir = path.join(OUT_ROOT, pageDef.name, 'details');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function save(testInfo, pageDef, file, content) {
  const body = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
  fs.writeFileSync(path.join(outDir(pageDef), file), body, 'utf8');
  if (testInfo && file.endsWith('.md')) await testInfo.attach(file, { body, contentType: 'text/markdown' });
}

// ---------- comparison reports (A3, B3, C3, D3) ----------
const el = (r) => `${r.element} — ${r.property}`;
const actual = (r) => (r.delta ? `${r.uiText} (${r.delta > 0 ? '+' : ''}${r.delta})` : r.uiText);

const LAYOUTS = {
  A: {
    matchHead: ['#', 'Category', 'Element', 'Figma', 'UI', 'Confidence'],
    match: (r) => [r.category, el(r), r.figmaText, r.uiText, r.confidence],
    diffHead: ['#', 'Category', 'Element', 'Expected (Figma)', 'Actual (UI)', 'Required Change', 'Severity', 'Confidence'],
    diff: (r) => [r.category, el(r), r.figmaText, actual(r), r.fix, r.severity, r.confidence],
  },
  B: {
    matchHead: ['#', 'Element', 'Figma', 'UI', 'Confidence'],
    match: (r) => [el(r), r.figmaText, r.uiText, r.confidence],
    diffHead: ['#', 'Element', 'Figma (size/position/spacing)', 'Actual UI', 'Required Change', 'Severity', 'Confidence'],
    diff: (r) => [el(r), r.figmaText, actual(r), r.fix, r.severity, r.confidence],
  },
  C: {
    matchHead: ['#', 'Viewport', 'Element', 'Figma', 'UI', 'Confidence'],
    match: (r) => [r.viewport, el(r), r.figmaText, r.uiText, r.confidence],
    diffHead: ['#', 'Viewport', 'Element', 'Figma Behavior', 'Actual Behavior', 'Required Change', 'Severity', 'Confidence'],
    diff: (r) => [r.viewport, el(r), r.figmaText, actual(r), r.fix, r.severity, r.confidence],
  },
  D: {
    matchHead: ['#', 'Component', 'State', 'Property', 'Figma', 'UI', 'Confidence'],
    match: (r) => [r.element, r.state, r.property, r.figmaText, r.uiText, r.confidence],
    diffHead: ['#', 'Component', 'State', 'Figma Style', 'Actual Style', 'Required Change', 'Severity', 'Confidence'],
    diff: (r) => [r.element, r.state, `${r.property}: ${r.figmaText}`, `${r.property}: ${actual(r)}`, r.fix, r.severity, r.confidence],
  },
  E: {
    matchHead: ['#', 'Section', 'Text', 'Property', 'Figma', 'UI', 'Confidence'],
    match: (r) => [r.category, r.element, r.property, r.figmaText, r.uiText, r.confidence],
    diffHead: ['#', 'Section', 'Text', 'Property', 'Expected (Figma)', 'Actual (UI)', 'Required Change', 'Severity', 'Confidence'],
    diff: (r) => [r.category, r.element, r.property, r.figmaText, actual(r), r.fix, r.severity, r.confidence],
  },
};

function comparisonMarkdown({ code, title, pageDef, audit, results, headerLines = [], intro = '', sections = [], devtools = [] }) {
  const L = LAYOUTS[audit];
  const s = score(results);
  const matches = results.filter((r) => r.status === 'match');
  const diffs = prioritised(results);
  const unverified = results.filter((r) => r.status === 'unverified');
  const bySeverity = ['Blocker', 'Major', 'Minor']
    .map((sev) => [sev, diffs.filter((r) => r.severity === sev)])
    .filter(([, list]) => list.length);

  const devtoolsItems = [
    ...diffs
      .filter((r) => r.confidence !== 'High')
      .map((r) => `Confirm ${el(r)} on \`${r.uiSelectors[0] || '?'}\` (${r.confidence} confidence${r.note ? `: ${r.note}` : ''}).`),
    ...unverified
      .filter((r) => r.uiSelectors.length)
      .map((r) => `${el(r)} on \`${r.uiSelectors[0]}\`: ${r.reason}.`),
    ...devtools,
  ];

  return [
    header(code, title, pageDef, headerLines),
    '**Rules applied:** differences under 1px and equivalent colour notations (#FFF = #FFFFFF = rgb() = oklab()) count as matches. ' +
      'A difference is reported only when both values exist; everything else is listed under "Could not verify". ' +
      'Default severity: Major for colour, font family/weight, structure and text differences and for gaps of 8px or more; Minor otherwise (overridden per check where it matters). ' +
      'Confidence: High = both values read directly; Med = derived or inferred (noted per row).',
    '',
    intro,
    `## 1. What matches (${matches.length} checks)`,
    '',
    table(L.matchHead, matches.map((r, i) => [i + 1, ...L.match(r)])),
    `## 2. What differs from the Figma design (${diffs.length})`,
    '',
    table(L.diffHead, diffs.map((r, i) => [i + 1, ...L.diff(r)])),
    '## 3. What must change in the implemented UI',
    '',
    bySeverity.length
      ? bySeverity.map(([sev, list]) => `### ${sev}\n\n${numbered(list.map((r) => `**${el(r)}**: ${r.fix}.`))}`).join('\n')
      : '_Nothing: every verifiable check matches._\n',
    ...sections,
    `## Could not verify (${unverified.length})`,
    '',
    bullets(unverified.map((r) => `**${el(r)}**${r.viewport ? ` (${r.viewport})` : ''}: ${r.reason}`)),
    '## Pixel-fidelity score',
    '',
    s.verifiable
      ? `**${s.matched} matched ÷ ${s.verifiable} verifiable checks = ${s.pct}%**\n\n` +
        `Verifiable = ${s.matched} matched + ${s.differ} different. ${s.unverified} could not be verified and are not counted.\n`
      : 'No verifiable checks.\n',
    '## Top 5 priority fixes',
    '',
    numbered(diffs.slice(0, 5).map((r) => `[${r.severity}] **${el(r)}**: ${r.fix}.`)),
    '## Check manually in DevTools',
    '',
    bullets(devtoolsItems),
  ].join('\n');
}

// Writes <code>-result.json for the HTML report, and adds one soft assertion per
// difference so the Playwright report lists every mismatch (the test fails if any exist).
async function saveComparison(testInfo, pageDef, code, title, results, markdown) {
  await save(testInfo, pageDef, `${code}.md`, markdown);
  await save(testInfo, pageDef, `${code}-result.json`, {
    code,
    title,
    page: pageDef.name,
    pageTitle: pageDef.title,
    url: pageDef.url,
    figma: `design/${path.basename(pageDef.design.svg)}`,
    generated: new Date().toISOString(),
    score: score(results),
    results,
  });
  for (const r of prioritised(results)) {
    expect.soft(r.uiText, `${r.id} [${r.severity}] ${el(r)}${r.state !== 'Default' ? ` (${r.state})` : ''}`).toBe(r.figmaText);
  }
}

module.exports = { table, bullets, numbered, header, save, comparisonMarkdown, saveComparison, OUT_ROOT };
