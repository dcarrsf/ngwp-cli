const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app';
const srcPath = './route';
const srcFiles = {
  ts: '__name__.component.ts',
  css: '__name__.component.scss',
  html: '__name__.component.html',
  spec: '__name__.component.spec.ts',
};

// Cached config
const config = {
  routename: 'default',
  routeclassname: 'Default',
  routeselector: 'default-tag'
};

// Inject data
const filters = {
  '__name__.component.ts': [{ 
    name: 'routename', value: config }, {
    name: 'routeclassname', value: config  }, {
    name: 'routeselector', value: config  
  }],
  '__name__.component.spec.ts'  : [{ 
    name: 'routename', value: config }, {
    name: 'routeclassname', value: config
  }],
  '__name__.component.html'  : [{ 
    name: 'routename', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: route
module.exports = function(name, options) {
  // Update config
  config.routename = name;
  config.routeclassname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}Component`;
  config.routeselector = `${name}-tag`;
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
