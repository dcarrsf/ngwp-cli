const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');
const replace = require('replacestream')

// Config
const ignore = { '.DS_Store': true };

// Template path
const troot = '/Users/dancarr/Desktop/cli'; // './'
const templ = '/blueprints/ng';
const templ_routes = '/blueprints/ng_routes';

// Installation path
let ipath = process.cwd(); // current working directory
let ifldr = '';
let src_path = '';
let config = {};

// File Helpers
function createFile(base, dirs, file) {
  const from = `${src_path}/${dirs}/${file}`;
  const to = `${base}/${dirs}/${file}`;
  if (fs.existsSync(from)) {
    if (from.indexOf('package.json') > -1) {
      fs.createReadStream(from)
      .pipe(replace('<% projectname %>', config.name))
      .pipe(fs.createWriteStream(to));
    } else {
      fs.createReadStream(from).pipe(fs.createWriteStream(to));
    }
  }
}

function removeFile(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

// Folder Helpers
function createFolder(base, dirs, folder) {
  const newpath = path.join(...arguments);
  if (!fs.existsSync(newpath)) {
    fs.mkdirSync(newpath);
  }
}

function removeFolder(folder) {
  if (fs.existsSync(folder)) {
    rimraf.sync(folder);
  }
}

function clearFolder(base) {
  fs.readdirSync(base)
  .forEach((fof) => { 
    if (is(base, fof, 'folder')) {
      removeFolder(path.join(base, fof));
    } else if (is(base, fof, 'file')) {
      removeFile(path.join(base, fof));
    }
  });
}

// Check type
function is(base, fof, type) { 
  if (ignore[fof] !== undefined) return false;
  const func = type === 'folder' ? 'isDirectory' : 'isFile';
  try {
    return fs.statSync(path.join(base, fof))[func]();
  } catch (err) {
    return false;
  }
}

// File Traversal
function traverseFolder(base, dirs, callback) {
  const newbase = path.join(base, dirs);
  fs.readdirSync(newbase)
  .forEach((fof) => { // fof = file or folder
    if (is(newbase, fof, 'folder')) {
      callback.apply(this, [fof, null, dirs]);
    } else if (is(newbase, fof, 'file')) {
      callback.apply(this, [null, fof, dirs]);
    }
  });
}

// Callback for installation traversal
function processFile(folder, file, dirs) {
  if (folder) {
    // console.log('folder: ', dirs, folder);
    // Create folder
    createFolder(ipath, dirs, folder);
    // Traverse its contents
    traverseFolder(src_path, path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Create file
    createFile(ipath, dirs, file);
  }
}

module.exports = {
  // Create project folder
  new: function(name, routes) {
    // Update confignpm ins
    config.name = name;
    config.routes = routes;
    // Save config in json file
    // todo...
    src_path = routes ? path.join(troot, templ_routes) : path.join(troot, templ);
    // Create folder
    createFolder(ipath, '', name);
    // Update path
    ipath = path.join(ipath, name);
    // Install starter files
    this.install();
  },

  // Copy files
  install: function() {
    // Clear
    clearFolder(ipath);
    // Message
    console.log(chalk.yellow('\nInstalling files...\n'));
    // Copy files
    traverseFolder(src_path, ifldr, processFile);
    // Message
    console.log(chalk.yellow('\nThe installation was successful.\n'));
  }
};