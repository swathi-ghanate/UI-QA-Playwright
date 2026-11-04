// UI Fidelity QA framework: base URL of the live site.
//
// Every page in pages/ gives only its path ('/', '/oem-opportunity'). The site
// comes from the BASE_URL environment variable, or the production site if unset:
//
//   PowerShell:  $env:BASE_URL = 'https://staging.example.com'; npx playwright test
//   bash:        BASE_URL=https://staging.example.com npx playwright test
//
// A path in BASE_URL is kept: https://host/app + '/oem-opportunity' -> https://host/app/oem-opportunity

const DEFAULT_BASE_URL = 'https://bargertechenergy.com';

function baseUrl() {
  const raw = (process.env.BASE_URL || DEFAULT_BASE_URL).trim();
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`BASE_URL is not a valid URL: "${raw}". Example: https://staging.example.com`);
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`BASE_URL must start with http:// or https://, got "${raw}".`);
  }
  return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, '');
}

// Page path -> full URL on the site under test.
function pageUrl(pagePath) {
  return `${baseUrl()}/${String(pagePath).replace(/^\/+/, '')}`;
}

module.exports = { DEFAULT_BASE_URL, baseUrl, pageUrl };
