const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app'; // installed into route folder
const srcPath = './model';
const srcFiles = {
  ts: '__name__.module.ts',
  spec: '__name__.module.spec.ts',
  route: '__name__-routing.module.spec.ts',
};

// Cached config
const config = {
  modulename: 'default',
  moduleclassname: 'Default',
};

// Inject data
const filters = {
  '__name__.module.ts': [{ 
    name: 'modulename', value: config }, {
    name: 'moduleclassname', value: config 
  }],
  '__name__.module.spec.ts'  : [{ 
    name: 'modulename', value: config }, {
    name: 'moduleclassname', value: config
  }],
  '__name__-routing.module.spec.ts'  : [{ 
    name: 'modulename', value: config }, {
    name: 'moduleclassname', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: model
module.exports = function(name, options) {
  // Update config
  config.modulename = name;
  config.moduleclassname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}`;
  // todo: remove .gitignore if it exists
  // Message
  console.log(chalk.yellow('Installing files...\n'));
  // Create folder
  files.createFolder(path.join(files.installPath, installFolder), name);
  // Copy files
  for (let file in srcFiles) {
    // Build paths
    const filename = srcFiles[file];
    const newname = installName(filename, name);
    const from = path.join(files.basePath, srcPath, filename);
    const to = path.join(files.installPath, installFolder, name, newname);
    // Print
    console.log(chalk.cyan('create: '), newname);
    // Create file
    files.copyFile(from, to, newname, filters);
  }
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
}