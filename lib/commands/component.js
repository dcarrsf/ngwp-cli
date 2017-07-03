const doCommand = require('./command');

// Command metadata
const Command = {
  // Type
  type: 'component',
  // Read write paths
  paths: {
    to: './src/app/shared/components',
    from: './component'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC',
    'selector': 'abc-tag'
  },
  // Template files
  files: {
    '__name__.component.ts': ['name', 'classname', 'selector'],
    '__name__.component.spec.ts': ['name', 'classname'],
    '__name__.component.html': ['name'],
    '__name__.component.scss': []
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
};