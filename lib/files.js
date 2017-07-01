const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

// Config
const ignore = { '.DS_Store': true };

// Template path
const troot = '/Users/dancarr/Desktop/cli'; // './'
const templ = '/blueprints/ng';
const templ_routes = '/blueprints/ng_routes';

// Installation path
let ipath = process.cwd(); // current working directory
let ifldr = '';

// File Helpers
function createFile(base, dirs, file) {
  const from = `${path.join(troot, templ)}/${dirs}/${file}`;
  const to = `${base}/${dirs}/${file}`;
  if (fs.existsSync(from)) {
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
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
    traverseFolder(path.join(troot, templ), path.join(dirs, folder), processFile);
  } else {
    console.log(chalk.cyan('file: '), file);
    // Create file
    createFile(ipath, dirs, file);
  }
}

module.exports = {
  // Save config to json
  // todo: move to separate file
  config: {
    name: 'Angular2+ and Webpack2',
    routes: false,
    app: {
      dependencies: [],
      providers: []
    }
  },

  // Create project folder
  new: function(name, useRoutes) {
    // Update config
    this.config.name = name;
    this.config.routes = useRoutes;
    // Save config in json file
    // todo...
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
    console.log(chalk.yellow('Installing files...\n'));
    // Copy files
    const src = this.config.routes === true ? path.join(troot, templ_routes) : path.join(troot, templ);
    console.log(src)
    traverseFolder(src, ifldr, processFile);
    // Message
    console.log(chalk.yellow('\nThe installation was successful.\n'));
  }
};
