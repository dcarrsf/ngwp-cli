const doCommand = require('./command');

// Command metadata
const command = {
  // Type
  type: 'module',
  // Read write paths
  paths: {
    to: './src/app',
    from: './route_module'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC'
  },
  // Template files
  files: {
    '__name__.module.ts': ['name', 'classname'],
    '__name__.module.spec.ts': ['name', 'classname'],
    '__name__-routing.module.ts': ['name', 'classname'],
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
};
