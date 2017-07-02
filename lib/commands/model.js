const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app/shared/models';
const srcPath = './model';
const srcFiles = {
  ts: '__name__.model.ts',
  spec: '__name__.model.spec.ts',
};

// Cached config
const config = {
  modelname: 'default',
  modelclassname: 'Default',
};

// Inject data
const filters = {
  '__name__.model.ts': [{ 
    name: 'modelname', value: config }, {
    name: 'modelclassname', value: config 
  }],
  '__name__.model.spec.ts'  : [{ 
    name: 'modelname', value: config }, {
    name: 'modelclassname', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: model
module.exports = function(name, options) {
  // Update config
  config.modelname = name;
  config.modelclassname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}Model`;
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
    console.log(chalk.cyan('file: '), newname);
    // Create file
    files.copyFile(from, to, newname, filters);
  }
  // Message
  console.log(chalk.yellow('\nThe installation was successful.\n'));
}