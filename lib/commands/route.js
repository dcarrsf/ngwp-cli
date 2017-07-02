const files = require('../utils/files');

// Paths
const installPath = './';
const srcPath = './blueprints/route';
const srcFiles = {
  ts: '__name__.component.ts',
  css: '__name__.component.scss',
  html: '__name__.component.html',
  spec: '__name__.component.spec.ts',
};

// Command
module.exports = function(name, options) {
  // todo: copy files with specified name
  // todo: place files in ./shared/components
}