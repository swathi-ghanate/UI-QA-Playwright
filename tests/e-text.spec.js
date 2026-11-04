// UI Fidelity QA framework, audit E: text.
//   E1  every text layer in the Figma SVG export
//   E2  every visible text element on the live page (computed CSS)
//   E3  each Figma text found on the live page by its words (lib/text-match.js), then wording,
//       font family, size, weight, colour and number of lines compared (lib/text-audit.js)
//   Needs no element map, so it runs on any page that has a path and a Figma SVG.
// Outputs: reports/<page>/details/E.md, E-result.json, E-texts.json

const { test } = require('@playwright/test');
const PAGES = require('../pages');
const { openDesign, openLive } = require('../lib/session');
const { runChecks } = require('../lib/rules');
const { table, bullets, save, comparisonMarkdown, saveComparison } = require('../lib/report');
const { matchTexts } = require('../lib/text-match');
const { readFigmaTexts, readUiTexts, sectionOf, sectionBoxes, textChecks, short } = require('../lib/text-audit');

const VIEWPORT = 1440;

for (const pageDef of PAGES) {
  test(`${pageDef.name} - E: text (every text block)`, async ({ browser }, testInfo) => {
    test.setTimeout(5 * 60 * 1000);
    const labels = pageDef.sections.map(([label]) => label);

    const figmaTexts = await test.step('E1 Figma text layers (SVG export)', async () => {
      const { context, page } = await openDesign(browser, pageDef);
      const boxes = await sectionBoxes(page, pageDef, 'figma');
      const texts = (await readFigmaTexts(page)).map((t) => ({ ...t, section: sectionOf(t.box, boxes) }));
      await context.close();
      return texts;
    });

    const uiTexts = await test.step('E2 Live page text (computed CSS)', async () => {
      const { context, page } = await openLive(browser, pageDef, VIEWPORT);
      const boxes = await sectionBoxes(page, pageDef, 'ui');
      const texts = (await readUiTexts(page)).map((t) => ({ ...t, section: sectionOf(t.box, boxes) }));
      await context.close();
      return texts;
    });

    await test.step('E3 Figma vs UI (text)', async () => {
      const pairs = matchTexts(figmaTexts, uiTexts);
      const { checks, d, u, defs } = textChecks(figmaTexts, pairs, labels);
      const results = runChecks('E', checks, d, u, defs);

      const byQuality = new Map();
      for (const p of pairs) byQuality.set(p.quality, (byQuality.get(p.quality) || 0) + 1);
      const found = pairs.filter((p) => p.ui).length;
      const md = comparisonMarkdown({
        code: 'E',
        title: 'Figma vs implemented UI (text)',
        pageDef,
        audit: 'E',
        results,
        headerLines: [
          `**Viewport:** ${VIEWPORT}px (the Figma frame width)`,
          `**Texts:** ${figmaTexts.length} Figma text layers, ${found} found on the live page, ${uiTexts.length} visible text elements on the live page`,
        ],
        intro:
          'Each Figma text layer is found on the live page by its words, then wording, font family, size, weight, colour and number of lines are compared. ' +
          'Rows matched by anything other than exact words have Med confidence and say how they were matched.\n',
        sections: [
          '## How each Figma text was found\n',
          table(['Matched by', 'Texts'], [...byQuality.entries()]),
          bullets(pairs.map((p, i) => (p.ui ? null : `Not found: "${short(figmaTexts[i].text, 90)}" (Figma layer ${figmaTexts[i].layer || '?'})`)).filter(Boolean)),
        ],
        devtools: ['Texts matched by similar wording: confirm the live element is the same text, reworded.'],
      });
      await save(testInfo, pageDef, 'E-texts.json', pairs.map((p, i) => ({
        figma: figmaTexts[i].text,
        figmaLayer: figmaTexts[i].layer,
        section: figmaTexts[i].section >= 0 ? labels[figmaTexts[i].section] : null,
        matchedBy: p.quality,
        ui: p.ui ? p.ui.text : null,
        uiSelector: p.ui ? p.ui.selector : null,
      })));
      await saveComparison(testInfo, pageDef, 'E', 'Figma vs implemented UI (text)', results, md);
    });
  });
}
