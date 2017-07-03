const doCommand = require('./command');

// Command metadata
const command = {
  // Type
  type: 'pipe',
  // Read write paths
  paths: {
    to: './src/app/shared/pipes',
    from: './pipe'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC'
  },
  // Template files
  files: {
    '__name__.pipe.ts': ['name', 'classname'],
    '__name__.pipe.spec.ts': ['name', 'classname'],
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
};
