// Pages the framework audits. To add a page: write pages/<name>.js and add it to this list.
// Minimum page file (runs audit E, text):
//   module.exports = { name: 'about', title: 'About', path: '/about', svg: 'about-1440.svg' };
// Full page file (runs audits A-E): see home.js and home.checks.js.

const { definePage } = require('../lib/page');

module.exports = [
  require('./home'),
  require('./partner-opportunity'),
].map(definePage);
