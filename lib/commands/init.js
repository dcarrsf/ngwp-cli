const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Template path
const troot = '/Users/dancarr/Desktop/cli'; // './'
const templ = '/blueprints/ng';
const templ_routes = '/blueprints/ng_routes';

// Installation path
let ipath = process.cwd(); // current working directory
let ifldr = '';
let src_path = '';
let config = {};

// Callback for installation traversal
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log('folder: ', dirs, folder);
    // Create folder
    files.createFolder(ipath, dirs, folder);
    // Traverse its contents
    files.traverseFolder(src_path, path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Create file
    files.copyFile(ipath, dirs, file);
  }
}

export default function(name, options) {
    // Update confignpm ins
    config.name = name;
    config.routes = options.routes === 'true';
    // Save config in json file
    // todo...
    src_path = config.routes ? path.join(troot, templ_routes) : path.join(troot, templ);
    // Create folder
    files.createFolder(ipath, name);
    // Update path
    ipath = path.join(ipath, name);
    // Clear
    files.clearFolder(ipath);
    // Message
    console.log(chalk.yellow('\nInstalling files...\n'));
    // Copy files
    files.traverseFolder(src_path, ifldr, processFile);
    // Message
    console.log(chalk.yellow('\nThe installation was successful.\n'));
}