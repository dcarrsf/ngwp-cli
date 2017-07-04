const chalk = require('chalk');
const doCommand = require('./command');

// Command metadata
const command = {
  // Type
  type: 'service',
  // Read write paths
  paths: {
    to: './src/app/shared/services',
    from: './service'
  }, 
  // Data injection keys
  keys: {
    'name': 'abc',
    'classname': 'ABC'
  },
  // Template files
  files: {
    '__name__.service.ts': ['name', 'classname'],
    '__name__.service.spec.ts': ['name', 'classname'],
  }
};

module.exports = function(name, options) {
  // Run command...
  doCommand(command, name);
  // Message
  console.log(chalk.cyan('Update app.module.ts to add the service...\n'));
};
