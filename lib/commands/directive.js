const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app/shared/directives';
const srcPath = './directive';
const srcFiles = {
  ts: '__name__.directive.ts',
  spec: '__name__.directive.spec.ts',
};

// Cached config
const config = {
  directivename: 'default',
  directiveclassname: 'Default',
};

// Inject data
const filters = {
  '__name__.directive.ts': [{ 
    name: 'directivename', value: config }, {
    name: 'directiveclassname', value: config 
  }],
  '__name__.directive.spec.ts'  : [{ 
    name: 'directivename', value: config }, {
    name: 'directiveclassname', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: directives
module.exports = function(name, options) {
  // Update config
  config.directivename = name;
  config.directiveclassname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}Directive`;
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