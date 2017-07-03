const doCommand = require('./command');

// Command metadata
const Command = {
  // Type
  type: 'directives',
  // Read write paths
  paths: {
    to: './src/app/shared/directives',
    from: './directive'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC'
  },
  // Template files
  files: {
    '__name__.directive.ts': ['name', 'classname'],
    '__name__.directive.spec.ts': ['name', 'classname'],
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
};
