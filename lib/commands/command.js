const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Update keys with naming convention
const createTemplateKeys = (command, name) => {
  // Update keys
  for (let key in command.keys) {
    if (key === 'name') {
      command.keys[key].name = name;
    }else if (key === 'classname') {
      command.keys[key].classname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}`;
    } else if (key === 'selector'){
      command.keys[key].selector = `${name}-tag`;
    }
  }
};

// Create folder for new template files
const createTemplateFolder = (command, name) => {
  const folder = path.join(files.installPath, command.paths.to);
  // Remove .gitkeep file if it exists
  if (files.is(folder, '.gitkeep', 'file')) {
    files.removeFile(path.join(folder, '.gitkeep'));
  }
  // Create folder
  files.createFolder(path.join(files.installPath, command.paths.to), name);
};

// Install template files
const installTemplateFiles = (command, name) => {
  // Message
  console.log(chalk.yellow('Installing files...\n'));
  // Copy files
  for (let file in command.files) {
    // Build paths
    const filename = file;
    const newname = getNewName(filename, name);
    const from = path.join(files.basePath, command.paths.from, filename);
    const to = path.join(files.installPath, command.paths.to, name, newname);
    console.log(chalk.cyan('create: '), newname);
    // Create file
    const filters = command.files[file];
    const config = command.keys;
    files.copyFile(from, to, filters, config);
  }
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
};

// Get new name
const getNewName = (file, name) => file.replace('__name__', name);

// Command runner
module.exports = (command, name) => {
  // 1. Update keys
  createTemplateKeys(command, name);
  // 2. Get installation folder
  createTemplateFolder(command, name);
  // 3. Install template files
  installTemplateFiles(command, name);
};
