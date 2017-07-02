const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Template path
const templ = 'ng';
const templ_routes = 'ng_routes';

// Cached config
const config = {};

// Inject data
const filters = {
  'package.json': [
    { name: 'projectname', value: config }
  ],
  'README.md': [
    { name: 'projectname', value: config }
  ],
  'index.html': [
    { name: 'projectname', value: config }
  ]
};

// Callback for installation traversal
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log(' --   ', folder);
    // Create folder
    files.createFolder(files.installPath, dirs, folder);
    // Traverse its contents
    files.traverseFolder(files.basePath, path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Build paths
    const from = path.join(files.basePath, dirs, file);
    const to = path.join(files.installPath, dirs, file);
    // Create file
    files.copyFile(from, to, file, filters);
  }
}

// Command
module.exports = function(name, options) {
  // Update config
  config.projectname = name;
  config.routes = options.routes !== 'true';
  // Save path to routed or unrouted files
  files.basePath = config.routes ? templ : templ_routes;
  // Create folder
  files.createFolder(files.installPath, name);
  // Update path
  files.installPath = name;
  // Clear
  files.clearFolder(files.installPath);
  // Message
  console.log(chalk.yellow('Installing files...\n'));
  // Copy files
  files.traverseFolder(files.basePath, '', processFile);
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
}
