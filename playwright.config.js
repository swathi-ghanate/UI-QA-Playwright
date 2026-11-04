// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * UI Fidelity QA framework: checks the live website against the Figma design.
 * Five audits per page: A style guide, B layout, C responsive, D component states, E text.
 *
 * Run from C:\UI-QA-Playwright:
 *   npx playwright test                   every audit, every page   (same as: npm test)
 *   npx playwright test -g home           one page
 *   npx playwright test e-text            one audit
 * Then open reports/index.html.
 *
 * Site under test: BASE_URL (see lib/base-url.js). Pages: pages/index.js.
 * Folders: design/ (Figma exports, input) · pages/ (what to check) · tests/ (audits A-E) · lib/ (engine) · reports/ (all output)
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Playwright's own files (error details of a failed run); cleared at the start of every run. */
  outputDir: './reports/playwright-artifacts',
  /* The audits are independent, so they run in parallel. */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* A retry would only re-measure the same page; differences are real results, not flakes. */
  retries: 0,
  /* Playwright's test report (every difference as a soft assertion). The audit reports are reports/index.html. */
  reporter: [['list'], ['html', { outputFolder: './reports/playwright-report', open: 'never' }]],
  /* Writes reports/index.html and reports/<page>/report.html from the audit results. */
  globalTeardown: './lib/html-report.js',
  use: {
    trace: 'off',
  },

  /* Chromium only: forced :hover/:focus/:active states use the Chrome DevTools Protocol. */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
