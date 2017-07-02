const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Template path
const templ = 'ng';
const templ_routes = 'ng_routes';

// Callback for installation traversal
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log('folder: ', files.basePath, '|', dirs, '|', folder);
    // Create folder
    files.createFolder(files.installPath, dirs, folder);
    // Traverse its contents
    // files.traverseFolder(files.basePath, path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), files.installPath, '|', dirs, '|', file);
    // Create file
    files.copyFile(files.installPath, dirs, file);
  }
}

// Command
module.exports = function(name, options) {
  // Save path to routed or unrouted files
  files.basePath = options.routes !== 'true' ? templ : templ_routes;
  // Create folder
  files.createFolder(files.installPath, name);
  // Update path
  files.installPath = name;
  // Clear
  files.clearFolder(files.installPath);
  // Message
  console.log(chalk.yellow('\nInstalling files...\n'));
  // Copy files
  files.traverseFolder(files.basePath, '', processFile);
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
}