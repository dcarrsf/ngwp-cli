const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app/shared/pipes';
const srcPath = './pipe';
const srcFiles = {
  ts: '__name__.pipe.ts',
  spec: '__name__.pipe.spec.ts',
};

// Cached config
const config = {
  pipename: 'default',
  pipeclassname: 'Default',
};

// Inject data
const filters = {
  '__name__.pipe.ts': [{ 
    name: 'pipename', value: config }, {
    name: 'pipeclassname', value: config 
  }],
  '__name__.pipe.spec.ts'  : [{ 
    name: 'pipename', value: config }, {
    name: 'pipeclassname', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: pipe
module.exports = function(name, options) {
  // Update config
  config.pipename = name;
  config.pipeclassname = `${name.replace(/(\b\w)/gi, (m) => m.toUpperCase())}Pipe`;
  // todo: remove .gitkeep if it exists
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