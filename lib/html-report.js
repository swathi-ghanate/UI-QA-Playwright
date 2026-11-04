// UI Fidelity QA framework: the HTML reports.
// Runs after every test run (Playwright globalTeardown). To rebuild them without testing:
//   node lib/html-report.js
//
// Reads reports/<page>/details/*-result.json and writes
//   reports/index.html          every page with its scores, linking to its report
//   reports/<page>/report.html  one page: scores, what to fix first, every check (filterable), screenshots

const fs = require('fs');
const path = require('path');
const { prioritised } = require('./rules');

const OUT_ROOT = path.join(__dirname, '..', 'reports');

const AUDITS = [
  { code: 'A3', letter: 'A', name: 'Style guide', what: 'Colours, fonts, borders, shadows', details: ['A1-figma-style-guide.md', 'A2-ui-style-guide.md', 'A3.md'] },
  { code: 'B3', letter: 'B', name: 'Layout', what: 'Sizes, positions, spacing', details: ['B1-figma-layout.md', 'B2-ui-layout.md', 'B3.md'] },
  { code: 'C3', letter: 'C', name: 'Responsive', what: '7 widths, 375 to 1440', details: ['C1-figma-responsive.md', 'C3.md'] },
  { code: 'D3', letter: 'D', name: 'Component states', what: 'Hover, focus, active', details: ['D1-figma-component-states.md', 'D2-ui-component-states.md', 'D3.md'] },
  { code: 'E', letter: 'E', name: 'Text', what: 'Every text block', details: ['E.md'] },
];

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const when = (iso) => (iso ? new Date(iso).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '');
const pct = (s) => (s && s.pct !== null && s.pct !== undefined ? `${s.pct}%` : '–');
const isMajor = (r) => r.status === 'differ' && r.severity !== 'Minor';

function loadPage(dir) {
  const audits = AUDITS.map((a) => {
    const file = path.join(dir, 'details', `${a.code}-result.json`);
    if (!fs.existsSync(file)) return { ...a, ran: false };
    try {
      return { ...a, ran: true, ...JSON.parse(fs.readFileSync(file, 'utf8')) };
    } catch (error) {
      return { ...a, ran: false, error: String(error.message || error) };
    }
  });
  const ran = audits.filter((a) => a.ran);
  if (!ran.length) return null;
  const all = ran.flatMap((a) => a.results.map((r) => ({ ...r, audit: a.letter })));
  const matched = all.filter((r) => r.status === 'match').length;
  const differ = all.filter((r) => r.status === 'differ').length;
  const unverified = all.filter((r) => r.status === 'unverified').length;
  const latest = ran.map((a) => a.generated).sort().pop();
  const info = ran.find((a) => a.pageTitle) || ran[0];
  return {
    name: path.basename(dir),
    title: info.pageTitle || path.basename(dir),
    url: info.url || '',
    figma: info.figma || '',
    latest,
    audits,
    all,
    total: { matched, differ, unverified, major: all.filter(isMajor).length, pct: matched + differ ? Math.round((matched / (matched + differ)) * 1000) / 10 : null },
  };
}

// ---------- shared look (same tokens as docs/qa-team-walkthrough.html) ----------
const STYLE = `
:root {
  --paper: #F5F6F8; --surface: #FFFFFF; --ink: #14171D; --muted: #586070; --rule: #D9DDE4;
  --accent: #C4225C; --bar: #3A4150; --code-bg: #ECEEF2;
  --match: #1C7547; --match-bg: #E4F2EA; --diff: #B0261D; --diff-bg: #FBE9E7; --unsure: #8A5700; --unsure-bg: #FFF2D9;
  --font-display: "Schibsted Grotesk", "Segoe UI", system-ui, sans-serif;
  --font-body: "Atkinson Hyperlegible", "Segoe UI", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, Consolas, monospace;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root {
    --paper: #111318; --surface: #1A1D24; --ink: #E8EAEE; --muted: #A0A7B4; --rule: #2E333D;
    --accent: #F0679A; --bar: #C3C9D4; --code-bg: #232730;
    --match: #63CC95; --match-bg: #15301F; --diff: #F2877E; --diff-bg: #3A1B19; --unsure: #E8B04B; --unsure-bg: #33270F;
    color-scheme: dark;
  }
}
* { box-sizing: border-box; }
body { margin: 0; padding: 0 max(16px, env(safe-area-inset-right, 0px)) 64px max(16px, env(safe-area-inset-left, 0px));
  background: var(--paper); color: var(--ink); font: 16px/1.55 var(--font-body); }
a { color: var(--accent); text-underline-offset: 3px; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
h1, h2 { font-family: var(--font-display); line-height: 1.15; margin: 0; text-wrap: balance; }
h1 { font-size: clamp(1.9rem, 5vw, 2.8rem); font-weight: 800; letter-spacing: -0.02em; }
h2 { font-size: 1.4rem; font-weight: 700; }
p { margin: 0; }
code, .mono { font-family: var(--font-mono); font-size: 0.86em; }
code { background: var(--code-bg); padding: 1px 5px; border-radius: 4px; }
.wrap { max-width: 1180px; margin-inline: auto; display: grid; gap: 14px; }
.label { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
.muted { color: var(--muted); }
.small { font-size: 0.86rem; }
header.wrap { padding-block: 40px 8px; }
section { padding-top: 40px; }
.meta { display: flex; flex-wrap: wrap; gap: 4px 20px; color: var(--muted); font-size: 0.9rem; }
.meta a { overflow-wrap: anywhere; }
.scores { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
.score { background: var(--surface); border: 1px solid var(--rule); border-radius: 10px; padding: 14px 16px; display: grid; gap: 6px; align-content: start; min-width: 0; }
.score-head { display: flex; align-items: baseline; gap: 8px; }
.letter { font-family: var(--font-display); font-weight: 800; width: 1.6rem; height: 1.6rem; display: grid; place-items: center; border-radius: 5px; background: var(--ink); color: var(--paper); font-size: 0.9rem; flex: none; }
.score strong { font-family: var(--font-display); }
.big { font-family: var(--font-display); font-size: 2rem; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1.1; }
.track { height: 6px; background: var(--code-bg); border-radius: 3px; overflow: hidden; }
.track i { display: block; height: 100%; background: var(--bar); border-radius: 3px; }
.counts { font-size: 0.84rem; color: var(--muted); font-variant-numeric: tabular-nums; }
.counts b { color: var(--diff); font-weight: 700; }
.notrun { color: var(--muted); font-size: 0.86rem; }
.overall { font-size: 1.02rem; }
ol.fixes { margin: 0; padding-left: 1.6rem; display: grid; gap: 8px; }
ol.fixes li::marker { font-family: var(--font-mono); color: var(--muted); }
.sev { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; border-radius: 4px; padding: 1px 7px; white-space: nowrap; }
.sev.Blocker, .sev.Major { color: var(--diff); background: var(--diff-bg); }
.sev.Minor { color: var(--unsure); background: var(--unsure-bg); }
.chip { font-family: var(--font-mono); font-size: 0.74rem; font-weight: 500; border-radius: 4px; padding: 1px 7px; white-space: nowrap; }
.chip.match { color: var(--match); background: var(--match-bg); }
.chip.differ { color: var(--diff); background: var(--diff-bg); }
.chip.unverified { color: var(--unsure); background: var(--unsure-bg); }
.filters { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: end; }
.filters label { display: grid; gap: 3px; font-size: 0.8rem; color: var(--muted); }
.filters select, .filters input { font: inherit; font-size: 0.92rem; color: var(--ink); background: var(--surface); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 8px; min-width: 0; }
.filters input { width: min(260px, 100%); }
.table-scroll { overflow-x: auto; background: var(--surface); border: 1px solid var(--rule); border-radius: 10px; }
table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
th, td { text-align: left; padding: 9px 12px; border-bottom: 1px solid var(--rule); vertical-align: top; }
thead th { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); white-space: nowrap; position: sticky; top: 0; background: var(--surface); }
tbody tr:last-child > * { border-bottom: 0; }
td.val { font-family: var(--font-mono); font-size: 0.82rem; max-width: 260px; overflow-wrap: anywhere; }
td.id { font-family: var(--font-mono); font-size: 0.8rem; white-space: nowrap; color: var(--muted); }
td.el { min-width: 180px; }
td.todo { min-width: 220px; }
.why { display: block; color: var(--muted); font-size: 0.8rem; margin-top: 2px; }
button.copy { font: inherit; font-size: 0.76rem; color: var(--accent); background: none; border: 1px solid var(--rule); border-radius: 5px; padding: 1px 8px; cursor: pointer; margin-top: 4px; }
.empty { padding: 18px; color: var(--muted); }
.strip { display: flex; gap: 12px; align-items: flex-end; overflow-x: auto; padding-bottom: 6px; }
.strip figure { margin: 0; display: grid; gap: 4px; flex: none; }
.strip .frame { height: 200px; overflow: hidden; border: 1px solid var(--rule); border-radius: 4px; background: var(--code-bg); }
.strip img { width: 100%; display: block; }
.strip figcaption { font-family: var(--font-mono); font-size: 0.76rem; color: var(--muted); }
ul.details { margin: 0; padding-left: 1.2rem; display: grid; gap: 4px; }
footer.wrap { padding-top: 40px; border-top: 1px solid var(--rule); margin-top: 40px; padding-block: 16px 0; }
@media (max-width: 900px) { .scores { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .scores { grid-template-columns: minmax(0, 1fr); } }
`;

const shell = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@400;500&family=Schibsted+Grotesk:wght@700;800&display=swap">
<style>${STYLE}</style>
</head>
<body>
${body}
</body>
</html>
`;

const RULES = `<p class="small muted">Rules: differences under 1px and the same colour written differently (#FFF = #FFFFFF = rgb(255, 255, 255)) count as matches.
A check is "Could not verify" when one side has no value; it is never guessed and is left out of the score.
Score = matched ÷ (matched + different). Major: colour, font family or weight, structure, wording, line count and gaps of 8px or more. Minor: everything else.
Confidence High: both values read directly. Med: derived, or matched by similar wording (the row says why).</p>`;

function scoreCard(a, pageName) {
  if (!a.ran) {
    return `<div class="score"><div class="score-head"><span class="letter">${a.letter}</span><strong>${esc(a.name)}</strong></div>
<p class="notrun">Not run${a.error ? `: ${esc(a.error)}` : ''}. ${a.letter === 'E' ? '' : `Needs the element map and checks in <code>pages/${esc(pageName)}.js</code>.`}</p></div>`;
  }
  const s = a.score;
  const major = a.results.filter(isMajor).length;
  return `<div class="score">
<div class="score-head"><span class="letter">${a.letter}</span><strong>${esc(a.name)}</strong></div>
<span class="muted small">${esc(a.what)}</span>
<span class="big">${pct(s)}</span>
<div class="track"><i style="width:${s.pct || 0}%"></i></div>
<span class="counts">${s.matched} of ${s.verifiable} match · <b>${s.differ}</b> differ (${major} Major) · ${s.unverified} could not verify</span>
<span class="counts">Run ${esc(when(a.generated))}</span>
</div>`;
}

// Fix first: most severe first, but a text that wraps to a different number of lines comes after the other
// differences of the same severity, because it usually follows from a width, column or font-size difference.
const SEVERITY = { Blocker: 0, Major: 1, Minor: 2 };
const isWrapSymptom = (r) => r.audit === 'E' && r.property === 'number of lines';
const fixFirst = (all) =>
  prioritised(all)
    .map((r, i) => ({ r, i }))
    .sort((a, b) => SEVERITY[a.r.severity] - SEVERITY[b.r.severity] || isWrapSymptom(a.r) - isWrapSymptom(b.r) || a.i - b.i)
    .map((x) => x.r);

function pageReport(p, dir) {
  const ran = p.audits.filter((a) => a.ran);
  const top = fixFirst(p.all).slice(0, 10);
  const order = { differ: 0, unverified: 1, match: 2 };
  const prio = new Map(prioritised(p.all).map((r, i) => [r, i]));
  const rows = [...p.all]
    .sort((a, b) => order[a.status] - order[b.status] || (prio.get(a) ?? 0) - (prio.get(b) ?? 0))
    .map((r) => ({
      id: r.id, audit: r.audit, status: r.status, severity: r.severity || '', category: r.category || '',
      element: r.element, property: r.property + (r.state && r.state !== 'Default' ? ` (${r.state})` : '') + (r.viewport ? ` @ ${r.viewport}` : ''),
      figma: r.figmaText, ui: r.uiText + (r.delta ? ` (${r.delta > 0 ? '+' : ''}${r.delta})` : ''),
      todo: r.status === 'differ' ? r.fix : r.status === 'unverified' ? r.reason : '',
      note: r.note || '', confidence: r.confidence || '', selector: (r.uiSelectors || [])[0] || '',
    }));
  const shotsDir = path.join(dir, 'screenshots');
  const shots = fs.existsSync(shotsDir)
    ? fs.readdirSync(shotsDir).filter((f) => /^C2-\d+\.jpg$/.test(f)).map((f) => +f.match(/\d+/)[0]).sort((a, b) => b - a)
    : [];

  const body = `
<header class="wrap">
  <p class="label"><a href="../index.html">All pages</a> · UI fidelity report</p>
  <h1>${esc(p.title)}</h1>
  <div class="meta">
    <span>Live page: <a href="${esc(p.url)}">${esc(p.url)}</a></span>
    <span>Figma: <code>${esc(p.figma)}</code></span>
    <span>Last run: ${esc(when(p.latest))}</span>
  </div>
</header>

<section class="wrap" aria-labelledby="h-scores">
  <h2 id="h-scores">Scores</h2>
  <div class="scores">${p.audits.map((a) => scoreCard(a, p.name)).join('\n')}</div>
  <p class="overall"><strong>${p.total.matched} of ${p.total.matched + p.total.differ}</strong> verifiable checks match (${pct(p.total)}).
  <strong>${p.total.differ}</strong> differences, ${p.total.major} of them Major or Blocker. ${p.total.unverified} could not be verified.</p>
  <p class="small muted">The score shows how close the build is to Figma. It is not a test pass rate.</p>
</section>

<section class="wrap" aria-labelledby="h-fix">
  <h2 id="h-fix">Fix first</h2>
  <p class="small muted">Most severe first. Texts that wrap to a different number of lines come after the other differences of the same severity: they usually follow from a width, column or font-size difference above.</p>
  ${top.length ? `<ol class="fixes">${top.map((r) => `<li><span class="sev ${esc(r.severity)}">${esc(r.severity)}</span> <span class="mono muted">${esc(r.id)}</span> <strong>${esc(r.element)}</strong>, ${esc(r.property)}: Figma ${esc(r.figmaText)}, live ${esc(r.uiText)}. ${esc(r.fix)}.</li>`).join('\n')}</ol>` : '<p>Nothing to fix: every verifiable check matches.</p>'}
</section>

<section class="wrap" aria-labelledby="h-all">
  <h2 id="h-all">Every check</h2>
  <div class="filters" role="search">
    <label for="f-status">Result<select id="f-status">
      <option value="differ">Different</option><option value="unverified">Could not verify</option><option value="match">Match</option><option value="">All</option></select></label>
    <label for="f-audit">Audit<select id="f-audit"><option value="">All</option>${ran.map((a) => `<option value="${a.letter}">${a.letter} ${esc(a.name)}</option>`).join('')}</select></label>
    <label for="f-sev">Severity<select id="f-sev"><option value="">All</option><option>Blocker</option><option>Major</option><option>Minor</option></select></label>
    <label for="f-q">Search<input id="f-q" type="search" placeholder="Element, property, value"></label>
    <span id="f-count" class="small muted" aria-live="polite"></span>
  </div>
  <div class="table-scroll">
    <table>
      <thead><tr><th scope="col">ID</th><th scope="col">Result</th><th scope="col">Element</th><th scope="col">Property</th><th scope="col">Figma</th><th scope="col">Live UI</th><th scope="col">What to do / why</th><th scope="col">Confidence</th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <p id="empty" class="empty" hidden>No checks match these filters.</p>
  </div>
</section>
${shots.length ? `
<section class="wrap" aria-labelledby="h-shots">
  <h2 id="h-shots">Screenshots (audit C)</h2>
  <div class="strip">${shots.map((w) => `<figure><a class="frame" href="screenshots/C2-${w}.jpg" style="width:${Math.max(60, Math.round((w / 1440) * 320))}px"><img src="screenshots/C2-${w}.jpg" alt="${esc(p.title)} at ${w}px" loading="lazy"></a><figcaption>${w}px</figcaption></figure>`).join('')}</div>
</section>` : ''}

<section class="wrap" aria-labelledby="h-details">
  <h2 id="h-details">Details</h2>
  <p class="small muted">The full report each audit prompt asks for (Markdown), with the Figma and live values side by side.</p>
  <ul class="details">${ran.map((a) => `<li>${a.letter} ${esc(a.name)}: ${a.details.filter((f) => fs.existsSync(path.join(dir, 'details', f))).map((f) => `<a href="details/${esc(f)}">${esc(f)}</a>`).join(' · ')}</li>`).join('')}</ul>
</section>

<footer class="wrap">${RULES}</footer>

<script id="data" type="application/json">${JSON.stringify(rows).replace(/</g, '\\u003c')}</script>
<script>
(function () {
  var rows = JSON.parse(document.getElementById('data').textContent);
  var tbody = document.getElementById('rows');
  var f = { status: document.getElementById('f-status'), audit: document.getElementById('f-audit'), sev: document.getElementById('f-sev'), q: document.getElementById('f-q') };
  var LABEL = { differ: 'Different', unverified: 'Could not verify', match: 'Match' };
  function cell(tr, text, cls) { var td = document.createElement('td'); if (cls) td.className = cls; td.textContent = text == null ? '' : text; tr.appendChild(td); return td; }
  function render() {
    var q = f.q.value.trim().toLowerCase();
    var shown = rows.filter(function (r) {
      return (!f.status.value || r.status === f.status.value) && (!f.audit.value || r.audit === f.audit.value) &&
        (!f.sev.value || r.severity === f.sev.value) &&
        (!q || [r.id, r.category, r.element, r.property, r.figma, r.ui, r.todo, r.selector].join(' ').toLowerCase().indexOf(q) >= 0);
    });
    tbody.textContent = '';
    shown.forEach(function (r) {
      var tr = document.createElement('tr');
      cell(tr, r.id, 'id');
      var res = cell(tr, '');
      var chip = document.createElement('span'); chip.className = 'chip ' + r.status; chip.textContent = LABEL[r.status]; res.appendChild(chip);
      if (r.severity) { res.appendChild(document.createTextNode(' ')); var s = document.createElement('span'); s.className = 'sev ' + r.severity; s.textContent = r.severity; res.appendChild(s); }
      var el = cell(tr, r.element, 'el');
      if (r.category) { var c = document.createElement('span'); c.className = 'why'; c.textContent = r.category; el.appendChild(c); }
      cell(tr, r.property);
      cell(tr, r.figma, 'val');
      cell(tr, r.ui, 'val');
      var todo = cell(tr, r.todo, 'todo');
      if (r.note) { var n = document.createElement('span'); n.className = 'why'; n.textContent = r.note; todo.appendChild(n); }
      if (r.selector && r.status !== 'match') { var sel = document.createElement('span'); sel.className = 'why mono'; sel.textContent = r.selector; todo.appendChild(sel); }
      if (r.status === 'differ') {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'copy'; b.textContent = 'Copy for bug';
        b.addEventListener('click', function () {
          var text = r.element + ' (' + r.property + '): expected ' + r.figma + ' (Figma), actual ' + r.ui + '. ' + r.todo + '. [' + r.severity + ', ' + r.id + ']';
          var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy for bug'; }, 1500); };
          if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy this text', text); });
          else window.prompt('Copy this text', text);
        });
        todo.appendChild(document.createElement('br')); todo.appendChild(b);
      }
      cell(tr, r.confidence);
      tbody.appendChild(tr);
    });
    document.getElementById('empty').hidden = shown.length > 0;
    document.getElementById('f-count').textContent = 'Showing ' + shown.length + ' of ' + rows.length + ' checks';
  }
  [f.status, f.audit, f.sev].forEach(function (s) { s.addEventListener('change', render); });
  f.q.addEventListener('input', render);
  render();
})();
</script>`;
  return shell(`${p.title}: UI fidelity report`, body);
}

function indexPage(pages, hasPlaywrightReport) {
  const body = `
<header class="wrap">
  <p class="label">UI Fidelity QA framework</p>
  <h1>UI fidelity reports</h1>
  <p class="muted">The live website checked against the Figma design, page by page. Open a page for what to fix first and every check.</p>
</header>
<section class="wrap" aria-labelledby="h-pages">
  <h2 id="h-pages">Pages</h2>
  ${pages.length ? `<div class="table-scroll"><table>
    <thead><tr><th scope="col">Page</th>${AUDITS.map((a) => `<th scope="col">${a.letter} ${esc(a.name)}</th>`).join('')}<th scope="col">Differences</th><th scope="col">Could not verify</th><th scope="col">Last run</th></tr></thead>
    <tbody>${pages.map((p) => `<tr>
      <th scope="row"><a href="${esc(p.name)}/report.html">${esc(p.title)}</a><span class="why mono">${esc(p.url)}</span></th>
      ${p.audits.map((a) => `<td>${a.ran ? `<strong class="mono">${pct(a.score)}</strong><div class="track"><i style="width:${a.score.pct || 0}%"></i></div>` : '<span class="notrun">not run</span>'}</td>`).join('')}
      <td><strong>${p.total.differ}</strong> <span class="muted small">(${p.total.major} Major)</span></td>
      <td>${p.total.unverified}</td>
      <td class="small">${esc(when(p.latest))}</td>
    </tr>`).join('\n')}</tbody>
  </table></div>` : '<p class="muted">No results yet. Run <code>npx playwright test</code>.</p>'}
</section>
<section class="wrap" aria-labelledby="h-run">
  <h2 id="h-run">Run again</h2>
  <p>From <code>C:\\UI-QA-Playwright</code>: <code>npx playwright test</code>. Another site: set <code>BASE_URL</code> first (see <code>README.md</code>).</p>
  ${hasPlaywrightReport ? '<p class="small muted">Test run details (timings, errors, every difference as an assertion): <a href="playwright-report/index.html">Playwright report</a>.</p>' : ''}
</section>
<footer class="wrap">${RULES}</footer>`;
  return shell('UI fidelity reports', body);
}

// root: the reports folder. Playwright passes its config object here, so anything but a string means the default.
module.exports = async function htmlReport(root) {
  const ROOT = typeof root === 'string' ? path.resolve(root) : OUT_ROOT;
  try {
    if (!fs.existsSync(ROOT)) return;
    const pages = [];
    for (const name of fs.readdirSync(ROOT).sort()) {
      if (name.startsWith('playwright-')) continue; // Playwright's own report and artifacts
      const dir = path.join(ROOT, name);
      if (!fs.statSync(dir).isDirectory()) continue;
      const p = loadPage(dir);
      if (!p) continue;
      fs.writeFileSync(path.join(dir, 'report.html'), pageReport(p, dir), 'utf8');
      pages.push(p);
    }
    fs.writeFileSync(path.join(ROOT, 'index.html'), indexPage(pages, fs.existsSync(path.join(ROOT, 'playwright-report'))), 'utf8');
    console.log(`\nReports: ${path.join(ROOT, 'index.html')}`);
  } catch (error) {
    console.error(`HTML report failed: ${error.stack || error}`);
  }
};

// node lib/html-report.js [reports folder]
if (require.main === module) module.exports(process.argv[2]);
