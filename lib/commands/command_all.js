const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Update keys with naming convention
const createProjectKeys = (command, options) => {
  // Update keys
  command.keys = options;
  // Save path to routed or unrouted files
  files.basePath = options.routing ? command.paths.templ_routes : command.paths.templ;
  // console.log(files.basePath);
};

// Create folder for new template files
const createProjectFolder = (command, options) => {
  if (!files.is(files.installPath, options.name, 'folder')) {
    // Create folder
    files.createFolder(files.installPath, options.name);
    // Update path
    files.installPath = options.name;
  } else {
    console.log(chalk.red('\nError: The project folder already exists!\n'));
    process.exit();
    // Clear
    // files.clearFolder(files.installPath);
  }
};

// Install template files
const installProjectFiles = (command, options) => {
  
  // Callback for installation traversal
  const processFile = (folder, file, dirs) => {
    if (folder) {
      // console.log('create: ', folder);
      // Create folder
      files.createFolder(files.installPath, dirs, folder);
      // Traverse its contents
      files.traverseFolder(files.basePath, path.join(dirs, folder), processFile);
    } else {
      console.log(chalk.cyan('create: '), file);
      // Build paths
      const from = path.join(files.basePath, dirs, file);
      const to = path.join(files.installPath, dirs, file);
      let filters = [], config;
      if (command.files[file]) {
        filters = command.files[file];
        config = command.keys;
      }
      // Create file
      files.copyFile(from, to, filters, config);
    }
  }
  // Message
  console.log(chalk.yellow('\nInstalling files...\n'));
  // Copy files
  files.traverseFolder(files.basePath, '', processFile);
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
};

// Command runner
module.exports = (command, options) => {
  // 1. Update keys
  createProjectKeys(command, options);
  // 2. Get installation folder
  createProjectFolder(command, options);
  // 3. Install template files
  installProjectFiles(command, options);
};
