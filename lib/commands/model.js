const files = require('../utils/files');

// Paths
const installPath = './shared/models';
const srcPath = './blueprints/model';
const srcFiles = {
  ts: '__name__.model.ts',
  spec: '__name__.model.spec.ts',
};

// Command
module.exports = function(name, options) {
  // todo: copy files with specified name
  // todo: place files in ./shared/models
}