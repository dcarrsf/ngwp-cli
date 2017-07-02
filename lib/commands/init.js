const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Template path
const templ = 'ng';
const templ_routes = 'ng_routes';

// Installation path
let src_path = '';

// Callback for installation traversal
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log('folder: ', dirs, folder);
    // Create folder
    files.createFolder(files.paths.install, dirs, folder);
    // Traverse its contents
    files.traverseFolder(src_path, path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Create file
    files.copyFile(files.paths.install, dirs, file);
  }
}

export default function(name, options) {
  // Save path to routed or unrouted files
  src_path = options.routes === 'true' ? path.join(files.paths.base, templ_routes) : path.join(files.paths.base, templ);
  // Create folder
  files.createFolder(files.paths.install, name);
  // Update path
  files.paths.install = path.join(files.paths.install, name);
  // Clear
  files.clearFolder(files.paths.install);
  // Message
  console.log(chalk.yellow('\nInstalling files...\n'));
  // Copy files
  files.traverseFolder(src_path, '', processFile);
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
}