const chalk = require('chalk');
const doCommand = require('./command');

// Command metadata
const command = {
  // Type
  type: 'route',
  // Read write paths
  paths: {
    to: './src/app',
    from: './route'
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
  // Message
  console.log(chalk.cyan('Update app.routing.ts to add the route.../n'));
};
