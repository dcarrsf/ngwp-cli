const files = require('../utils/files');

// Paths
const installPath = './shared/directives';
const srcPath = './blueprints/directive';
const srcFiles = {
  ts: '__name__.directive.ts',
  spec: '__name__.directive.spec.ts',
};

// Command
module.exports = function(name, options) {
  // todo: copy files with specified name
  // todo: place files in ./shared/directives
}