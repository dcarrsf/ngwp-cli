const doCommand = require('./command');

// Command metadata
const command = {
  // Type
  type: 'model',
  // Read write paths
  paths: {
    to: './src/app/shared/models',
    from: './model'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC'
  },
  // Template files
  files: {
    '__name__.model.ts': ['name', 'classname'],
    '__name__.model.spec.ts': ['name', 'classname'],
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
};
