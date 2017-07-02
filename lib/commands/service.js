const files = require('../utils/fs');

// Paths
const installPath = './shared/services';
const srcPath = './blueprints/service';
const srcFiles = {
  ts: '__name__.service.ts',
  spec: '__name__.service.spec.ts',
};

// Command
module.exports = function(name, options) {
  // todo: copy files with specified name
  // todo: place files in ./shared/components
}