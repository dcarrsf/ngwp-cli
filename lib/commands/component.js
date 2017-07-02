const path = require('path');
const chalk = require('chalk');
const files = require('../utils/fs');

// Paths
const installFolder = './src/app/shared/components';
const srcPath = './component';
const srcFiles = {
  ts: '__name__.component.ts',
  css: '__name__.component.scss',
  html: '__name__.component.html',
  spec: '__name__.component.spec.ts',
};

// Cached config
const config = {
  componentname: 'default',
  componentclassname: 'Default',
  componentselector: 'default-tag'
};

// Inject data
const filters = {
  '__name__.component.ts': [{ 
    name: 'componentname', value: config }, {
    name: 'componentclassname', value: config  }, {
    name: 'componentselector', value: config  
  }],
  '__name__.component.spec.ts'  : [{ 
    name: 'componentname', value: config }, {
    name: 'componentclassname', value: config
  }],
  '__name__.component.html'  : [{ 
    name: 'componentname', value: config
  }]
};

// Helpers
const installName = (file, name) => file.replace('__name__', name);

// Command: Component
module.exports = function(name, options) {
  // Update config
  config.componentname = name;
  config.componentclassname = name.replace(/(\b\w)/gi, (m) => m.toUpperCase());
  config.componentselector = `${name}-tag`;
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
    // todo: remove .gitignore if it exists
  }
  console.log('');
}
