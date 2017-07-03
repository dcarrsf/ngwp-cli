const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command runner
module.exports = (command, name) => {
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
  // Get installation folder
  const folder = path.join(files.installPath, command.paths.to);
  // Remove .gitkeep file if it exists
  if (files.is(folder, '.gitkeep', 'file')) {
    files.removeFile(path.join(folder, '.gitkeep'));
  }
  // Create folder
  files.createFolder(path.join(files.installPath, command.paths.to), name);
  // Message
  console.log(chalk.yellow('Installing files...\n'));
  // Copy files
  for (let file in command.files) {
    // Build paths
    const filename = file;
    const newname = installName(filename, name);
    const from = path.join(files.basePath, command.paths.from, filename);
    const to = path.join(files.installPath, command.paths.to, name, newname);
    console.log(chalk.cyan('file: '), newname);
    // Create file
    const filters = command.files[file];
    const config = command.keys;
    files.copyFile(from, to, filters, config);
  }
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
};
