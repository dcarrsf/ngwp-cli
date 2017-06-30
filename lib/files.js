const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Config
const ignore = { '.DS_Store': true };

// Template path
const troot = '/Users/dancarr/Desktop/cli/'; // './'
const templ = '/blueprints/ngwp';

// Installation path
const ipath = process.cwd(); // current working directory
const ifldr = '';

// File Helpers
function checkFile(base, dirs, file) {
  return is(base, dirs, file, 'file');
}

function createFile(base, dirs, file) {
  const from = `${troot}/${dirs}/${file}`;
  const to = `${base}/${dirs}/${file}`;
  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}

function removeFile(base, dirs, file) {
  fs.unlink(path.join(...arguments));
}

// Folder Helpers
function checkFolder(base, dirs, folder) {
  return is(base, dirs, folder, 'folder');
}

function createFolder(base, dirs, folder) {
  fs.mkdirSync(path.join(...arguments));
  // fs.mkdirSync(`${ipath}/${ifldr}/${folder}`);
}

function removeFolder(base, dirs, folder) {
  fs.rmdirSync(path.join(...arguments));
}

// Check type
function is(base, dirs, fof, type) { // fof = file or folder
  if (ignore[fof] !== undefined) return false;
  const func = type === 'folder' ? 'isDirectory' : 'isFile';
  try {
    return fs.statSync(path.join(base, dirs, fof))[func]();
  } catch (err) {
    return false;
  }
}

// File Traversal
function traverseFolder(base, dirs, callback) {
  fs.readdirSync(path.join(base, dirs))
  .forEach((fof) => { // fof = file or folder
    if (is(base, dirs, fof, 'folder')) {
      callback.apply(this, [fof, null, dirs]);
    } else if (is(base, dirs, fof, 'file')) {
      callback.apply(this, [null, fof, dirs]);
    }
  });
}

// Callback for traversal method
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log('folder: ', dirs, folder);
    // Create folder
    createFolder(ipath, dirs, folder);
    // Traverse its contents
    traverseFolder(path.join(troot, templ), path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Create file
    createFile(ipath, dirs, file);
  }
}

module.exports = {
  // Copy files
  install: function() {
    // Message
    console.log(chalk.yellow('Installing files...\n'));
    // Copy files
    traverseFolder(path.join(troot, templ), ifldr, processFile);
    // Message
    console.log(chalk.yellow('\nThe installation was successful.\n'));
  }
};