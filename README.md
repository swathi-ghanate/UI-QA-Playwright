# UI Fidelity QA

Checks the live website against the Figma design and tells you what to fix.
It measures both sides exactly, compares them with fixed rules, and writes one report per page.

Five audits per page: **A** style guide, **B** layout, **C** responsive, **D** component states, **E** text.
This replaces the two earlier approaches (the evidence collector and the prompt approach); a backup of them is in
`%USERPROFILE%\UI-QA-Playwright-old-approaches-2026-11-04.zip`, and the evidence collector is also in the git history.

## Structure

```
UI-QA-Playwright/
├─ design/                        1. INPUT: Figma exports, one per page
│  ├─ home-1440.svg                  the SVG is what the audits read
│  ├─ home-1440.png                  a picture of the frame, for people
│  ├─ partner-opportunity-1440.svg
│  └─ partner-opportunity-1440.png
│
├─ pages/                         2. SETUP: what to check on each page
│  ├─ index.js                       the list of pages to audit
│  ├─ home.js                        page path, SVG name, element map, sections
│  ├─ home.checks.js                 the checks behind audits A–D
│  ├─ partner-opportunity.js
│  └─ partner-opportunity.checks.js
│
├─ tests/                         3. AUDITS: one file per audit
│  ├─ a-style-guide.spec.js          A  colours, fonts, borders, shadows
│  ├─ b-layout.spec.js               B  sizes, positions, spacing
│  ├─ c-responsive.spec.js           C  7 widths, 375 to 1440
│  ├─ d-component-states.spec.js     D  hover, focus, active
│  └─ e-text.spec.js                 E  every text block
│
├─ lib/                           4. ENGINE: measuring, rules, reports (no page-specific code)
│
├─ reports/                       5. OUTPUT: written by every run
│  ├─ index.html                     START HERE: every page and its scores
│  ├─ home/
│  │  ├─ report.html                 scores, what to fix first, every check
│  │  ├─ screenshots/                audit C, one full-page screenshot per width
│  │  └─ details/                    each audit prompt's full report (Markdown) and data (JSON)
│  ├─ partner-opportunity/           same as home/
│  ├─ playwright-report/             Playwright's test report (timings, errors)
│  └─ playwright-artifacts/          Playwright's error details for a failed run
│
├─ docs/qa-team-walkthrough.html  how it works, for the QA team
├─ .github/workflows/playwright.yml  runs the audits on every push and pull request
├─ playwright.config.js
└─ package.json
```

## Run

From `C:\UI-QA-Playwright`, after `npm ci` and `npx playwright install chromium`:

```
npx playwright test                    # all five audits, every page (same as: npm test)
npx playwright test -g home            # one page: home, partner-opportunity
npx playwright test e-text             # one audit: a-style, b-layout, c-responsive, d-component, e-text
```

Then open **`reports/index.html`**.

**A red Playwright run is expected while the site differs from Figma.** Each difference is a soft assertion, so the run
keeps going and lists every difference. The reports are written either way.
To rebuild the HTML reports from the last results without testing: `npm run report`.

### Another site (staging)

Pages give only their path. The site comes from `BASE_URL`; without it, production (`https://bargertechenergy.com`) is used.

```
# PowerShell (stays set until you close the terminal)
$env:BASE_URL = 'https://staging.example.com'; npx playwright test
Remove-Item Env:BASE_URL                            # back to production

# Git Bash (this run only)
BASE_URL=https://staging.example.com npx playwright test
```

Each report shows the URL it measured. Every run overwrites `reports/`.

### In GitHub Actions

`.github/workflows/playwright.yml` runs the audits on every push and pull request to `main` against production,
and keeps `reports/` as the **ui-fidelity-reports** artifact for 30 days. The run is red while the site differs from Figma.

## The five audits

| Audit | Checks | Needs in the page file |
|---|---|---|
| **A** Style guide | Colours, fonts, borders, radius, shadows, gradients, blur | element map + checks |
| **B** Layout | Widths, columns, sizes, positions, spacing inside each section | element map + checks |
| **C** Responsive | 7 widths (375, 768, 1023, 1024, 1279, 1280, 1440), with a screenshot of each | element map + checks |
| **D** Component states | Buttons and links: default, hover, focus, focus-visible, active | element map + checks |
| **E** Text | Every Figma text layer found on the live page by its words: wording, font family, size, weight, colour, number of lines | nothing (path + SVG only) |

How the values are read:

- **Figma side:** `design/<page>-1440.svg` is opened in Chromium (1 SVG unit = 1 CSS px). Layers are found by their Figma ids.
- **Live side:** the page is opened at the same width with fonts and images loaded and reveal animations finished.
  Values are the browser's computed CSS, the same as DevTools › Computed.
- **States (D):** a real mouse hover, then `:focus`, `:focus-visible` and `:active` forced the way the DevTools `:hov` panel does.
- **Text (E):** each Figma text is matched by its words (exact first, then ignoring spacing and punctuation, then partial,
  then similar wording such as "About Us" vs "About"), looking in its own page section first. An element is also matched by its
  own words without its nested parts, because Figma puts an accent word in a separate layer.

## Reading a report

Each page report (`reports/<page>/report.html`) has:

1. **Scores:** one card per audit, plus the total. Score = matched ÷ (matched + different). It shows how close the build is to Figma; it is not a test pass rate.
2. **Fix first:** the 10 most important differences across all audits.
3. **Every check:** a table you can filter by result, audit, severity and text. Each difference has a **Copy for bug** button
   that copies the element, the expected and actual values and the fix.
4. **Screenshots** from audit C, and **Details**: the full Markdown report each audit prompt asks for.

| Result | Meaning |
|---|---|
| Match | Both values exist and are equal under the rules below |
| Different | Both values exist and differ. Comes with the required change and a severity |
| Could not verify | One side has no value. Never guessed; the row says why. Not counted in the score |

- Under 1px counts as a match. The same colour written differently (`#FFF` = `#FFFFFF` = `rgb(255, 255, 255)`) counts as a match.
- **Major:** colour, font family or weight, structure (columns, visibility, wrapping, labels), wording, and gaps of 8px or more. **Minor:** everything else, including punctuation-only text differences.
- **Confidence High:** both values read directly. **Med:** derived, or the text was matched by partial or similar wording (the row says how).

## Add a page

1. Export the Figma frame as SVG with **Outline text off** (so the text stays text) and save it as `design/<name>-1440.svg`.
2. Create `pages/<name>.js`. The minimum is four fields:

   ```js
   module.exports = { name: 'about', title: 'About', path: '/about', svg: 'about-1440.svg' };
   ```

3. Add it to `pages/index.js`:

   ```js
   module.exports = [
     require('./home'),
     require('./partner-opportunity'),
     require('./about'),
   ].map(definePage);
   ```

That runs audit **E (text)** straight away, and the page gets its own folder in `reports/`. Audits A–D are skipped,
with the reason shown in the Playwright report, until you add step 4.

4. For audits A–D, copy `pages/home.js` and `pages/home.checks.js` and change:
   - `elements`: each named element with its Figma layer selector (`figma`) and its live-page selector (`ui`)
   - `sections`, `textRoles`, `containers`, `components`, `report`: the lists the audit reports use
   - `checks`: in `<name>.checks.js`, one line per comparison (see below)

   Keep the element names `navButton`, `heroButton`, `ctaButton`, `footer` and `footerPlainLink`: the contrast tables in audit D use them.

## Add a check

One line in the right list (`A`, `B`, `C` or `D`) of `pages/<page>.checks.js`:

```js
check('Color', 'Footer link', 'text color', 'color', (d) => d.footerPlainLink.color, (u) => seen(u.footerPlainLink)),
//     category  element       property     kind     Figma value                     live value
```

Kinds: `color`, `px`, `num`, `text`, `weight`, `family`, `radius`, `shadow`, `gradient`, `list`.
If the element is new, add it to `elements` in `pages/<page>.js` first. The helpers (`seen`, `from`, `rowCount`…) are in `lib/check-helpers.js`.

## Engine files (lib/)

| File | What it does |
|---|---|
| `page.js` | Fills in a page file: defaults, full URL, SVG path in `design/` |
| `base-url.js` | Site under test: `BASE_URL`, or production |
| `session.js`, `in-page.js` | Opens the SVG and the live page; measures elements in the browser |
| `rules.js`, `check-helpers.js` | Comparison rules, scoring and check helpers |
| `text-match.js`, `text-audit.js` | Audit E: matching texts by their words, building the text checks |
| `report.js` | Writes `reports/<page>/details/` (Markdown and JSON) |
| `html-report.js` | Writes `reports/index.html` and `reports/<page>/report.html` (`npm run report` rebuilds them) |

## Limits

- Chromium only, because forced states use the Chrome DevTools Protocol.
- Figma has only the 1440 frame. Other widths are measured and screenshotted in C, but their comparisons go to "Could not verify" until tablet and mobile frames exist.
- Text drawn inside images, and icons drawn as `<img>`, have no CSS text or colour, so they are not compared.
- A Figma text reworded by more than about 30% is reported as "Could not verify", because it cannot be matched with confidence.
- Hover and focus effects that come from a parent (`:focus-within`, group hover) are not forced.
- If the live markup changes, the affected A–D checks move to "Could not verify" and name the selector that stopped matching. They do not fail silently.
- It compares measurable values. Image quality, animation and overall feel still need a human eye.
